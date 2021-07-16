import pymysql
import time
from config import *
from SMS_sender import send_sms

class Model:
    def __init__(self):
        self.db = pymysql.connect(
            host=db_ip,
            port=3306,
            user=username,
            passwd=password,
            db=db_name,
            charset='utf8'
        )
        self.cursor = self.db.cursor()

    def insert(self, csv_file):
        pass

    def search(self, word):
        pass


class Detector(Model):
    def __init__(self):
        super(Detector, self).__init__()

    def detecte(self):
        self.cursor.execute(f"SELECT id,temperature,humidity FROM room;")
        data = self.cursor.fetchall()
        return data


def main():
    db = Detector()
    while True:
        message = ''
        data = db.detecte()
        for item in data:
            if int(item[1]) > 50:
                message += str(item[0])
                message += '号房间状态异常，房间温度过高：'
                message += str(item[1])
                message += '\n'
        if message != '':
            me = send_sms(message)
            print(me.status)
            break
        time.sleep(10)

if __name__ == '__main__':
    main()