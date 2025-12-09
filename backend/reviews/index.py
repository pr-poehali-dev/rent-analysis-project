import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для управления отзывами клиентов
    GET / - получить все опубликованные отзывы
    POST / - создать новый отзыв
    PUT /{id} - модерация отзыва (админ)
    DELETE /{id} - удалить отзыв (админ)
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
                    SELECT id, customer_name, rating, comment, phone_model, 
                           is_published, created_at
                    FROM reviews
                    ORDER BY created_at DESC
                """)
            else:
                cursor.execute("""
                    SELECT id, customer_name, rating, comment, phone_model, 
                           is_published, created_at
                    FROM reviews
                    WHERE is_published = true
                    ORDER BY created_at DESC
                    LIMIT 20
                """)
            
            reviews = []
            for row in cursor.fetchall():
                reviews.append({
                    'id': row[0],
                    'customer_name': row[1],
                    'rating': row[2],
                    'comment': row[3],
                    'phone_model': row[4],
                    'is_published': row[5],
                    'created_at': row[6].isoformat() if row[6] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'reviews': reviews}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO reviews (customer_name, rating, comment, phone_model, is_published)
                VALUES (%s, %s, %s, %s, false)
                RETURNING id
            """, (
                body.get('customer_name'),
                body.get('rating'),
                body.get('comment'),
                body.get('phone_model')
            ))
            
            review_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'review_id': review_id,
                    'message': 'Отзыв отправлен на модерацию'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            review_id = body.get('id')
            is_published = body.get('is_published')
            
            cursor.execute("""
                UPDATE reviews 
                SET is_published = %s
                WHERE id = %s
            """, (is_published, review_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Статус отзыва обновлён'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            review_id = params.get('id')
            
            cursor.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Отзыв удалён'
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
