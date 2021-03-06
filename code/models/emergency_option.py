from . import Model
from datetime import datetime


class EmergencyOption(Model):
    def __init__(self):
        super(EmergencyOption, self).__init__()

    def search_emergency(self, page, limit, room_id):
        start = (page - 1) * limit
        # 获取用户数量
        self.cursor.execute('SELECT count(*) FROM accident_record;')
        total_num = self.cursor.fetchone()[0]
        if room_id is not None:
            self.cursor.execute(
                f"SELECT * FROM accident_record WHERE room_id = {room_id} ORDER BY id DESC ;")
        else:
            self.cursor.execute(
                f"SELECT * FROM accident_record ORDER BY id DESC LIMIT {start},{limit};")
        data = self.cursor.fetchall()
        return data, total_num

    # 更新应急事件表
    def update(self, id, room_id, abnormal_time, accident):
        self.cursor.execute(f"SELECT * FROM room WHERE id = {room_id};")
        data = self.cursor.fetchone()
        if data is None:
            return "操作失败，房间不存在"
        try:
            self.cursor.execute(
                f"UPDATE accident_record SET room_id='{room_id}',abnormal_time='{abnormal_time}',accident='{accident}' WHERE id={id};")
            self.db.commit()
        except Exception as e:
            print(e)
            self.db.rollback()
            self.cursor.close()
            self.db.close()
            return "操作失败，发生未知错误"
        self.cursor.close()
        self.db.close()
        return "意外事件更新成功"

    def add(self, room_id, abnormal_time, accident):
        self.cursor.execute(f"SELECT * FROM room WHERE id = {room_id};")
        data = self.cursor.fetchone()
        if data is None:
            return "操作失败，房间不存在"
        self.cursor.execute("SELECT MAX(id) FROM accident_record;")
        id = int(self.cursor.fetchone()[0]) + 1
        data = (id, room_id, str(abnormal_time), accident)
        try:
            self.cursor.execute(
                f"INSERT INTO accident_record values {data};")
            self.db.commit()
        except Exception as e:
            print(e)
            self.db.rollback()
            self.cursor.close()
            self.db.close()
            return "操作失败，发生未知错误"
        self.cursor.close()
        self.db.close()
        return "意外事件添加成功"

    # 删除信息
    def delete(self, id):
        self.cursor.execute(
            f"DELETE FROM accident_record WHERE id='{id}';")
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
    l = EmergencyOption()
    # data = l.search_suggestion(1, 2, '+id')
    # print(data)
