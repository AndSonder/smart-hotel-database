from . import Model
from datetime import datetime


class OrderOption(Model):
    def __init__(self):
        super(OrderOption, self).__init__()

    # 更新订单数据表状态，记录入住时间与离开时间
    def check(self, id, status):
        now = datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S')
        if status == 'published':
            self.cursor.execute(f"UPDATE `order` SET cid='{now}' WHERE id={id};")
        elif status == 'ended':
            self.cursor.execute(f"UPDATE `order` SET go='{now}' WHERE id={id};")
            self.cursor.execute(f"UPDATE `order` SET id_status=1 WHERE id={id};")
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

    # 更新订单数据表
    def update(self, id, cid, id_status, pmoney, scid, sgo, go):
        self.cursor.execute(
            f"UPDATE `order` SET go='{go}',cid='{cid}',id_status='{id_status}',pmoney='{pmoney}',scid='{scid}',sgo='{sgo}' WHERE id={id};")
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

    def delete(self, id):
        self.cursor.execute(
            f"UPDATE `order` SET id_status=2 WHERE id={id};")
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
    l = OrderOption()
    # data = l.search_order(1, 2, '+id')
    # print(data)
