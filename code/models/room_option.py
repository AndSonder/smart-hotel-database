from . import Model
from datetime import datetime


class RoomOption(Model):
    def __init__(self):
        super(RoomOption, self).__init__()

    def search_order(self, page, limit, sort, id, rtype):
        start = (page - 1) * limit
        # 计算订单数量
        self.cursor.execute('SELECT count(*) FROM room;')
        total_num = self.cursor.fetchone()[0]
        if id != None:
            self.cursor.execute(
                f"SELECT * FROM room WHERE id={id};")
        elif rtype != None:
            self.cursor.execute(
                f"SELECT * FROM room WHERE rtype='{rtype}';")
        elif sort == '+id':
            self.cursor.execute(
                f"SELECT * FROM room ORDER BY id DESC LIMIT {start},{limit};")
        else:
            self.cursor.execute(
                f"SELECT * FROM room ORDER BY id LIMIT {start},{limit};")
        data = self.cursor.fetchall()
        return data, total_num

    # 更新房间数据表
    def update(self, id, rtype, bedtype, maxnum, area, rwin, rlock, money, temperature, humidity):
        self.cursor.execute(
            f"UPDATE room SET id='{id}',rtype='{rtype}',bedtype='{bedtype}',maxnum='{maxnum}',area='{area}',rwin='{rwin}',rlock='{rlock}',money='{money}',temperature='{temperature}',humidity='{humidity}' WHERE id={id};")
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

    def add(self, rtype, bedtype, maxnum, area, rwin, rlock, money):
        self.cursor.execute("SELECT COUNT(*) FROM room;")
        id = int(self.cursor.fetchone()[0]) + 1
        data = (id, rtype, bedtype, maxnum, area, rwin, money, 20, 20, rlock)
        self.cursor.execute(
            f"INSERT INTO room values {data};")
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

    # 删除房间信息
    def delete(self, id):
        self.cursor.execute(
            f"DELETE FROM room WHERE id={id};")
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
    l = RoomOption()
    # data = l.search_order(1, 2, '+id')
    # print(data)
