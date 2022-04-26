import pymysql
import time
from config import *
from qq import Reminder
from code.models.emergency_option import EmergencyOption
import datetime


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
    reminder = Reminder()
    reminder.register_()
    em = EmergencyOption()
    while True:
        print('检测中....')
        message = ''
        db = Detector()
        data = db.detecte()
        for item in data:
            if int(item[1]) > 50:
                room_message = f"{item[0]}号房间状态异常，房间温度过高：{item[1]}"
                message += room_message
                message += '\n'
                em.add(item[0], str(datetime.datetime.now()), room_message)
        if message != '':
            print(message)
            reminder.send('房间状态异常', message)
            print('发送成功！')
            break
        time.sleep(10)


if __name__ == '__main__':
    main()
