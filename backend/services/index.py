import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для управления услугами
    GET / - получить все активные услуги
    GET /?all=true - получить все услуги (для админки)
    PUT /{id} - обновить услугу
    POST / - создать новую услугу
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
            params = event.get('queryStringParameters', {})
            show_all = params.get('all') == 'true'
            
            if show_all:
                cursor.execute("""
                    SELECT id, title, description, price, icon, category, is_active
                    FROM services
                    ORDER BY id
                """)
            else:
                cursor.execute("""
                    SELECT id, title, description, price, icon, category, is_active
                    FROM services
                    WHERE is_active = true
                    ORDER BY id
                """)
            
            services = []
            for row in cursor.fetchall():
                services.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'price': float(row[3]) if row[3] else 0,
                    'icon': row[4],
                    'category': row[5],
                    'is_active': row[6]
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'services': services}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                UPDATE services 
                SET title = %s, description = %s, price = %s, 
                    icon = %s, category = %s, is_active = %s
                WHERE id = %s
            """, (
                body.get('title'),
                body.get('description'),
                body.get('price'),
                body.get('icon'),
                body.get('category'),
                body.get('is_active'),
                body.get('id')
            ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Услуга обновлена'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO services (title, description, price, icon, category, is_active)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body.get('title'),
                body.get('description'),
                body.get('price'),
                body.get('icon'),
                body.get('category'),
                body.get('is_active', True)
            ))
            
            service_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'service_id': service_id,
                    'message': 'Услуга создана'
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
