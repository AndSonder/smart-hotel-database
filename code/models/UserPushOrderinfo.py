# author:liuyang
# time:2021/7/13
from . import Model

class UserPushOrder(Model):
    def __init__(self):
        super(UserPushOrder, self).__init__()

    def insert(self, csv_file):
        self.cursor.execute(f"SELECT id FROM `order` WHERE wecharid = '{csv_file['wecharid']}'")
        flag = self.cursor.fetchone()
        if flag:
            return 1
        else:

            time = 0
            count = self.search_count()
            pmoney = 100
            #后面再写计算

            sql = f"INSERT INTO `order`( id, pmoney, scid, sgo, cid, go, wecharid, room_id, depoist) " \
                  f"VALUES ({count},{pmoney},'{csv_file['expLive']}','{csv_file['expAway']}','{csv_file['actLive']}','{csv_file['actAway']}','{csv_file['wecharid']}','{csv_file['room_id']}',null);"
            print(sql)
            #传参
            """
            示例：
                {
                    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
                    "room_id":1,
                    "expLive":"2020-05-16 18:55:49",
                    "expAway":"2020-05-25 18:55:49",
                    "actLive":"2020-05-17 18:55:49",
                    "actAway":"2020-05-26 18:55:49",
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

    def search_count(self):
        self.cursor.execute(f"SELECT max(ID) FROM `order`")
        count = self.cursor.fetchone()
        count = count[0]
        return count + 1