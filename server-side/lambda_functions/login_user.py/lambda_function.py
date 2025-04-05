"""
Lambda Function: login_user
Checks if the username and password match a user in the DB.
Returns 200 + user_id if successful, or 401 Unauthorized if not.
"""

import json
import pymysql
import configparser
import os

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        username = body['username']
        password = body['password']  # This should be hashed in production!

        config = configparser.ConfigParser()
        config.read(os.path.join(os.path.dirname(__file__), 'hacks-config.ini'))

        db_host = config['rds']['endpoint']
        db_user = config['rds']['user_name']
        db_pass = config['rds']['user_pwd']
        db_name = config['rds']['db_name']
        db_port = int(config['rds']['port_number'])

        connection = pymysql.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database=db_name,
            port=db_port,
            cursorclass=pymysql.cursors.DictCursor
        )

        with connection.cursor() as cursor:
            sql = "SELECT user_id, password_hash FROM users WHERE username = %s"
            cursor.execute(sql, (username,))
            user = cursor.fetchone()

            if user and user['password_hash'] == password:
                return {
                    "statusCode": 200,
                    "body": json.dumps({
                        "message": "Login successful",
                        "user_id": user['user_id']
                        # Add "token": "fake-token" here later when JWT added
                    })
                }
            else:
                return {
                    "statusCode": 401,
                    "body": json.dumps({"message": "Invalid username or password"})
                }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
