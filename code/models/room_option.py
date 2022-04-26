from . import Model
from datetime import datetime


class RoomOption(Model):
    def __init__(self):
        super(RoomOption, self).__init__()

    def search_room(self, page, limit, sort, id, rtype):
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
        self.cursor.execute("SELECT MAX(*) FROM room;")
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
        self.cursor.execute(f"SELECT * FROM `order` where room_id = {id} and id_status IN (0,3);")
        if len(self.cursor.fetchall()) != 0:
            return "该房间正在被用户使用中，无法删除！"
        self.cursor.execute(
            f"DELETE FROM room WHERE id={id};")
        try:
            self.db.commit()
        except:
            self.db.rollback()
            self.cursor.close()
            self.db.close()
            return "操作实在发生未知错误"
        self.cursor.close()
        self.db.close()
        return "房间信息删除成功"

    def search_guest(self, page, limit, bedtype, start_data, end_data):
        start = (page - 1) * limit
        print(start_data)
        print(end_data)
        # 查询在时间段内可以住的房间
        if start_data is not None and end_data is not None:
            if bedtype is not None:
                self.cursor.execute(
                    f"SELECT * FROM room WHERE bedtype = '{bedtype}' AND id NOT IN (SELECT room_id FROM `order` WHERE id_status IN (0,3) AND scid >= '{start_data}' AND scid <= '{end_data}' AND sgo >= '{start_data}' AND sgo <= '{end_data}') ORDER BY id LIMIT {start},{limit};")
            else:
                self.cursor.execute(
                    f"SELECT * FROM room WHERE id NOT IN (SELECT room_id FROM `order` WHERE id_status IN (0,3) AND scid >= '{start_data}' AND scid <= '{end_data}' AND sgo >= '{start_data}' AND sgo <= '{end_data}') ORDER BY id LIMIT {start},{limit};")
        else:
            if bedtype is not None:
                # 默认查询最近三天内可以住的房间
                self.cursor.execute(
                    f"SELECT * FROM room WHERE bedtype = '{bedtype}' AND id NOT IN (SELECT room_id FROM `order` WHERE id_status IN (0,3) AND scid > NOW() AND scid < DATE_ADD(NOW(),INTERVAL 3 DAY ) AND sgo > NOW() AND sgo < DATE_ADD(NOW(),INTERVAL 3 DAY )) ORDER BY id LIMIT {start},{limit};")
            else:
                self.cursor.execute(
                    f"SELECT * FROM room WHERE id NOT IN (SELECT room_id FROM `order` WHERE id_status IN (0,3) AND scid > NOW() AND scid < DATE_ADD(NOW(),INTERVAL 3 DAY ) AND sgo > NOW() AND sgo < DATE_ADD(NOW(),INTERVAL 3 DAY )) ORDER BY id LIMIT {start},{limit};")

        data = self.cursor.fetchall()
        return data


if __name__ == '__main__':
    l = RoomOption()
    # data = l.search_suggestion(1, 2, '+id')
    # print(data)
