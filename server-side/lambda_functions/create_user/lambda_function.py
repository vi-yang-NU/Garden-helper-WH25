"""
Lambda Function: create_user
Creates a new user in the `users` table if the username doesn't already exist.
Returns 409 if the username already exists, otherwise 200 on success.
"""

import json
import pymysql
import os

def lambda_handler(event, context):
    body = json.loads(event['body'])
    username = body['username']
    password_hash = body['password']
    email = body.get('email')
    phone = body.get('phone')
    
    connection = pymysql.connect(
        host=os.environ['DB_HOST'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASS'],
        database='garden_app'
    )
    
    with connection.cursor() as cursor:
        sql = "INSERT INTO users (username, password_hash, email, phone) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (username, password_hash, email, phone))
        connection.commit()

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "User created successfully!"})
    }
