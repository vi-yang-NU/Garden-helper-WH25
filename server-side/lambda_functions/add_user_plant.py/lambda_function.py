"""
Lambda Function: add_user_plant
Adds a plant to a user's garden in the `user_plants` table.
Includes optional progress stage and setup completion flag.
"""

import json
import pymysql
import configparser
import os

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body['user_id']
        plant_id = body['plant_id']
        progress_stage = body.get('progress_stage', 'not started')
        setup_complete = body.get('setup_complete', False)

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
            sql = "INSERT INTO user_plants (user_id, plant_id, progress_stage, setup_complete) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (user_id, plant_id, progress_stage, setup_complete))
            connection.commit()

        return {"statusCode": 200, "body": json.dumps({"message": "User plant added successfully"})}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
