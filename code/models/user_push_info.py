# author:liuyang
# time:2021/6/18
from . import Model


class UserPush(Model):
    def __init__(self):
        super(UserPush, self).__init__()

    def insert(self, csv_file):
        sql = """INSERT INTO user (wecharid, name, sex, id_card, phone, level) \
        VALUES ('%s', '%s',  '%s',  '%s',  '%s',  '%s') """ % \
              (csv_file['wecharid'], csv_file['name'], csv_file['sex'], csv_file['id_card'], csv_file['phone'],
               csv_file['level'])
        # 传参
        try:
            self.cursor.execute(sql)
            self.db.commit()
            return 1
        except:
            # 发生错误时回滚
            self.db.rollback()
            return 0
