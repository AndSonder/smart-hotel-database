from . import Model
from datetime import datetime


class UserOption(Model):
    def __init__(self):
        super(UserOption, self).__init__()

    def search_user(self, page, limit, level, name, phone, search_level):
        start = (page - 1) * limit
        # 获取用户数量
        self.cursor.execute('SELECT count(*) FROM room;')
        total_num = self.cursor.fetchone()[0]
        if phone != None:
            self.cursor.execute(
                f"SELECT * FROM user WHERE phone={phone} AND level>={level} LIMIT {start},{limit};")
        elif name != None:
            self.cursor.execute(
                f"SELECT * FROM user WHERE name='{name}' AND level>={level} LIMIT {start},{limit};")
        elif search_level != None:
            self.cursor.execute(
                f"SELECT * FROM user WHERE level={search_level} AND level>={level} LIMIT {start},{limit};")
        else:
            self.cursor.execute(
                f"SELECT * FROM user WHERE level>={level} LIMIT {start},{limit};")
        data = self.cursor.fetchall()
        return data, total_num

    # 更新用户数据表
    def update(self, wecharid, name, sex, id_card, phone, level):
        print(wecharid)
        try:
            self.cursor.execute(
                f"UPDATE user SET name='{name}',sex='{sex}',id_card='{id_card}',phone='{phone}',level={level} WHERE wecharid={wecharid};")
            self.db.commit()
        except Exception as e:
            print(e)
            self.db.rollback()
            self.cursor.close()
            self.db.close()
            return False
        self.cursor.close()
        self.db.close()
        return True

    def add(self, wecharid, name, sex, id_card, phone, level):
        self.cursor.execute("SELECT COUNT(*) FROM room;")
        data = (wecharid, name, sex, id_card, phone, level)
        self.cursor.execute(
            f"INSERT INTO user values {data};")
        try:
            self.db.commit()
        except:
            self.db.rollback()
            self.cursor.close()
            self.db.close()
            return False
        self.cursor.close()
        self.db.close()
        return True

    # 删除用户信息
    def delete(self, id):
        self.cursor.execute(
            f"DELETE FROM room WHERE wecharid='{id}';")
        try:
            self.db.commit()
        except:
            self.db.rollback()
            self.cursor.close()
            self.db.close()
            return False
        self.cursor.close()
        self.db.close()
        return True


if __name__ == '__main__':
    l = UserOption()
    # data = l.search_order(1, 2, '+id')
    # print(data)
