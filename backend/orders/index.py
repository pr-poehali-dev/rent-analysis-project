import json
import os
import psycopg2
import requests
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для управления заказами клиентов
    GET / - получить все заказы
    POST / - создать новый заказ
    PUT /{id} - обновить статус заказа
    DELETE /{id} - удалить заказ
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            cursor.execute("""
                SELECT o.id, o.customer_name, o.customer_phone, o.customer_email,
                       o.phone_model, o.imei, o.message, o.status, o.created_at,
                       s.title as service_title
                FROM orders o
                LEFT JOIN services s ON o.service_id = s.id
                ORDER BY o.created_at DESC
            """)
            
            orders = []
            for row in cursor.fetchall():
                orders.append({
                    'id': row[0],
                    'customer_name': row[1],
                    'customer_phone': row[2],
                    'customer_email': row[3],
                    'phone_model': row[4],
                    'imei': row[5],
                    'message': row[6],
                    'status': row[7],
                    'created_at': row[8].isoformat() if row[8] else None,
                    'service_title': row[9]
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'orders': orders}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO orders (customer_name, customer_phone, customer_email, 
                                  service_id, phone_model, imei, message, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, 'new')
                RETURNING id, customer_name, customer_phone, phone_model, created_at
            """, (
                body.get('customer_name'),
                body.get('customer_phone'),
                body.get('customer_email'),
                body.get('service_id'),
                body.get('phone_model'),
                body.get('imei'),
                body.get('message')
            ))
            
            order = cursor.fetchone()
            conn.commit()
            
            send_telegram_notification(
                order_id=order[0],
                customer_name=order[1],
                customer_phone=order[2],
                phone_model=order[3]
            )
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'order_id': order[0],
                    'message': 'Заказ создан успешно'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            order_id = body.get('id')
            new_status = body.get('status')
            
            cursor.execute("""
                UPDATE orders 
                SET status = %s
                WHERE id = %s
            """, (new_status, order_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Статус обновлён'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            order_id = params.get('id')
            
            cursor.execute("DELETE FROM orders WHERE id = %s", (order_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заказ удалён'
                }),
                'isBase64Encoded': False
            }
    
    finally:
        cursor.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }


def send_telegram_notification(order_id: int, customer_name: str, customer_phone: str, phone_model: str):
    """Отправка уведомления в Telegram"""
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
        
        if not bot_token or not chat_id:
            return
        
        message = f"""
🔔 <b>Новый заказ #{order_id}</b>

👤 Клиент: {customer_name}
📱 Телефон: {customer_phone}
📲 Модель: {phone_model}
📅 Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}

Проверьте админ-панель для деталей!
        """.strip()
        
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        requests.post(url, json={
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }, timeout=5)
    except Exception:
        pass
