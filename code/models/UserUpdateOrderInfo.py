# author:liuyang
# time:2021/7/13
from . import Model
import pymysql
class UserPush(Model):
    def __init__(self):
        super(UserPush, self).__init__()

    def update(self, csv_file):
        flag = self.search(csv_file['orderId'])
        if flag:

            sql = f"UPDATE `order` SET scid = '{csv_file['expLive']}', sgo = '{csv_file['expAway']}' , cid ='{csv_file['actLive']}', go ='{csv_file['actAway']}' WHERE id = {csv_file['orderId']}"
            print(sql)
            #传参
            """
            示例：
                {
                    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
                    "orderId":1,
                    "phone":"18178346924",
                    "expLive":"2020-05-16 18:55:49",
                    "expAway":"2020-05-25 18:55:49",
                    "actLive":"",
                    "actAway":"",
                    "phone":"18112346924",
                    "stamp":"2020-05-21 18:55:49",
                    "prove":"2ca41b85f1002f8202e85064e101c54c"
                }
            """
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
        self.cursor.execute(f"SELECT wecharid FROM `order` WHERE id={word}")
        data = self.cursor.fetchone()
        print(data)
        return data