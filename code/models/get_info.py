from . import Model


class GetInfo(Model):
    def __init__(self):
        super(GetInfo, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT name, sex, phone, level FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchone()
        return data

    def search_order(self, page, limit, sort, id=None, name=None):
        start = (page - 1) * limit
        # 计算订单数量
        self.cursor.execute('SELECT count(*) FROM `order`;')
        total_num = self.cursor.fetchone()[0]
        if id != None:
            self.cursor.execute(
                f"SELECT id,pmoney,scid,sgo,cid,go,`order`.wecharid,room_id,id_status,name FROM `order`,user WHERE `order`.wecharid = user.wecharid AND `order`.id={id}")
        elif name != None:
            self.cursor.execute(
                f"SELECT id,pmoney,scid,sgo,cid,go,`order`.wecharid,room_id,id_status,name FROM `order`,user WHERE `order`.wecharid = user.wecharid AND user.name = {name}")
        elif sort == '+id':
            self.cursor.execute(
                f"SELECT id,pmoney,scid,sgo,cid,go,`order`.wecharid,room_id,id_status,name FROM `order`,user WHERE `order`.wecharid = user.wecharid ORDER BY id LIMIT {start},{limit};")
        else:
            self.cursor.execute(
                f"SELECT id,pmoney,scid,sgo,cid,go,`order`.wecharid,room_id,id_status,name FROM `order`,user WHERE `order`.wecharid = user.wecharid ORDER BY id DESC LIMIT {start},{limit};")
        data = self.cursor.fetchall()
        return data, total_num


if __name__ == '__main__':
    l = GetInfo()
    data = l.search_order(1, 2, '+id')
    print(data)
