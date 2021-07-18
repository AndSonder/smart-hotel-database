# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "message":"浴室需要改进",
    "message_time":"2020-05-22 14:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"2ca41b85f1002f8202e85064e101c54c"
}
"""

class UserPostfeedback(Model):
    def __init__(self):
        super(UserPostfeedback, self).__init__()

    def insert(self, csv_file):

        count = self.search(csv_file)

        sql = f"INSERT INTO feedback(id, wecharid, message, message_time) VALUES ({count},'{csv_file['wecharid']}','{csv_file['message']}','{csv_file['message_time']}')"
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
        self.cursor.execute(f"SELECT max(id) FROM feedback;")
        count = self.cursor.fetchone()
        count = count[0]
        return count + 1

