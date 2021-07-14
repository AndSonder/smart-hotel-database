from . import Model
from datetime import datetime


class SuggestionOption(Model):
    def __init__(self):
        super(SuggestionOption, self).__init__()

    def search_suggestion(self, page, limit, message, start_date, end_date):
        start = (page - 1) * limit
        # 计算建议数量
        self.cursor.execute('SELECT count(*) FROM feedback;')
        total_num = self.cursor.fetchone()[0]
        if message == '':
            message = None
        if message is not None:
            if start_date is not None and end_date is not None:
                self.cursor.execute(
                    f"SELECT feedback.id,name,feedback.wecharid,phone,message,message_time FROM feedback,user WHERE feedback.wecharid = user.wecharid AND feedback.message LIKE '%{message}%' AND feedback.message_time > '{start_date}' AND feedback.message_time < '{end_date}' LIMIT {start},{limit};")
            else:
                self.cursor.execute(
                    f"SELECT feedback.id,name,feedback.wecharid,phone,message,message_time FROM feedback,user WHERE feedback.wecharid = user.wecharid AND feedback.message LIKE '%{message}%' LIMIT {start},{limit};")

        elif start_date is not None and end_date is not None:
            if message is not None:
                self.cursor.execute(
                    f"SELECT feedback.id,name,feedback.wecharid,phone,message,message_time FROM feedback,user WHERE feedback.wecharid = user.wecharid AND feedback.message LIKE '%{message}%' AND feedback.message_time > '{start_date}' AND feedback.message_time < '{end_date}' LIMIT {start},{limit};")
            else:
                self.cursor.execute(
                    f"SELECT feedback.id,name,feedback.wecharid,phone,message,message_time FROM feedback,user WHERE feedback.wecharid = user.wecharid AND feedback.message_time > '{start_date}' AND feedback.message_time < '{end_date}' LIMIT {start},{limit};")
        else:
            self.cursor.execute(
                f"SELECT feedback.id,name,feedback.wecharid,phone,message,message_time FROM feedback,user WHERE feedback.wecharid = user.wecharid LIMIT {start},{limit};")
        data = self.cursor.fetchall()
        return data, total_num

    # 更新房间数据表
    def update(self, id, message):
        self.cursor.execute(
            f"UPDATE feedback SET message = '{message}' WHERE id = {id};")
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
            f"DELETE FROM feedback WHERE id={id};")
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
    l = SuggestionOption()
    # data = l.search_suggestion(1, 2, '+id')
    # print(data)
