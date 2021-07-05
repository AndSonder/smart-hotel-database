# author:liuyang
# time:2021/6/18
from . import Model

class UserPush(Model):
    def __init__(self):
        super(UserPush, self).__init__()

    def insert(self, csv_file):
        sql = f"INSERT INTO user (wecharid, name, sex, id_card, phone, level) VALUES ({csv_file['wecharid']},'{csv_file['name']}','{csv_file['sex']}',{csv_file['id_card']},{csv_file['phone']},{csv_file['level']})"
        print(sql)
        #传参
        """
        示例：
        {
            "wecharid": "1123455",
            "name": "刘博阁",
            "sex": "男",
            "id_card": "340000000000001234",
            "phone": "11111119987",
            "level": "2"
        }
        """

        try:
            self.cursor.execute(sql)
            self.db.commit()
            return 1
        except:
            # 发生错误时回滚
            self.db.rollback()
            return 0



