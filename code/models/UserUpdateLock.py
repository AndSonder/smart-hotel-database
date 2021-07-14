# author:liuyang
# time:2021/7/14
from . import Model
import pymysql
"""
传参示例：
    {
        "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "roomId":1,
        "lockStatus":1,
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

            sql = f"UPDATE room SET rlock = '{csv_file['lockStatus']}' WHERE id = {csv_file['roomId']}"
            print(sql)

            try:
                self.cursor.execute(sql)
                self.db.commit()
                return 0
            except:
                # 发生错误时回滚
                self.db.rollback()
                return 2
        else:
            return 3

    def search(self, word):
        self.cursor.execute(f"SELECT rtype FROM room WHERE id={word}")
        data = self.cursor.fetchone()
        print(data)
        return data