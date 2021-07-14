# author:liuyang
# time:2021/6/18
from . import Model

class UserPush(Model):
    def __init__(self):
        super(UserPush, self).__init__()

    def insert(self, csv_file):
        sql = f"INSERT INTO user (wecharid, name, sex, id_card, phone, level) VALUES ('{csv_file['wecharid']}','{csv_file['name']}','{csv_file['sex']}',{csv_file['idCard']},'{csv_file['phone']}',{1})"
        print(sql)
        #传参
        """
        示例：
            {
                "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
                "name":"李大壮",
                "sex":"男",
                "idCard":"230109812334435654",
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

    def search(self, word):
        self.cursor.execute(f"SELECT name FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchone()
        return data

