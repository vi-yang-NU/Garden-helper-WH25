"""
Lambda Function: get_user_plants
Returns all plants associated with a given user_id, including joined plant name info.
Useful for showing a user's garden on their dashboard.
"""

import json
import pymysql
import configparser
import os

def lambda_handler(event, context):
    try:
        user_id = event['queryStringParameters']['user_id']

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
            sql = """
                SELECT up.*, p.name AS plant_name
                FROM user_plants up
                JOIN plants p ON up.plant_id = p.plant_id
                WHERE up.user_id = %s
            """
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()

        return {"statusCode": 200, "body": json.dumps(results)}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
