# author:liuyang
# time:2021/7/18
from . import Model
import pymysql
"""
传参示例：
    {
        "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "roomId":101,
        "airStatus":1,
        "airMode":1,
        "airValue":1,
        "stamp":"2020-05-21 18:55:49",
        "prove":"2ca41b85f1002f8202e85064e101c54c"
    }
"""
class UserUpdate(Model):
    def __init__(self):
        super(UserUpdate, self).__init__()

    def update(self, csv_file):
        flag = self.search(csv_file['roomId'])
        if flag:
            count = 0
            if csv_file['airStatus']:
                print(csv_file['airStatus'])
                sql = f"UPDATE air_conditioning SET status = '{csv_file['airStatus']}' WHERE room_id = {csv_file['roomId']}"
                print(sql)
                count += 1
                try:
                    self.cursor.execute(sql)
                    self.db.commit()
                except:
                    # 发生错误时回滚
                    self.db.rollback()
                    return 2

            if csv_file['airMode']:
                print(csv_file['airMode'])
                sql = f"UPDATE air_conditioning SET air_mode = '{csv_file['airMode']}' WHERE room_id = {csv_file['roomId']}"
                print(sql)
                count += 1
                try:
                    self.cursor.execute(sql)
                    self.db.commit()
                except:
                    # 发生错误时回滚
                    self.db.rollback()
                    return 2

            if csv_file['airValue']:
                print(csv_file['airValue'])
                sql = f"UPDATE air_conditioning SET air_tmp = '{csv_file['airValue']}' WHERE room_id = {csv_file['roomId']}"
                print(sql)
                count += 1
                try:
                    self.cursor.execute(sql)
                    self.db.commit()
                except:
                    # 发生错误时回滚
                    self.db.rollback()
                    return 2

            if count == 0:
                return 4
            else:
                return 0
        else:
            return 3

    def search(self, word):
        self.cursor.execute(f"SELECT rtype FROM room WHERE id={word}")
        data = self.cursor.fetchone()
        print(data)
        return data