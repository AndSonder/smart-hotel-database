# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":1,
    "openTime":"2020-05-22 14:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"2ca41b85f1002f8202e85064e101c54c"
}
"""

class Userpostrecord(Model):
    def __init__(self):
        super(Userpostrecord, self).__init__()

    def insert(self, csv_file):

        count = self.search(csv_file)

        sql = f"INSERT INTO door_opening_record(id, wecharid, open_time, room_id) VALUES ({count},'{csv_file['wecharid']}','{csv_file['openTime']}','{csv_file['roomId']}')"
        print(sql)

        try:
            self.cursor.execute(sql)
            self.db.commit()
            return 0
        except:
            # 发生错误时回滚
            self.db.rollback()
            return 2

    def search(self, word):
        self.cursor.execute(f"SELECT max(id) FROM door_opening_record;")
        count = self.cursor.fetchone()
        count = count[0]
        return count + 1

