from . import Model


class GetInfo(Model):
    def __init__(self):
        super(GetInfo, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT name, sex, phone, level FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchone()
        return data

    def search_order(self, page, limit, sort):
        start = (page - 1) * limit
        if sort == '+id':
            self.cursor.execute(
                f"SELECT id,pmoney,scid,sgo,cid,go,wecharid,room_id FROM `order` ORDER BY id LIMIT {start},{limit};")
        else:
            self.cursor.execute(
                f"SELECT id,pmoney,scid,sgo,cid,go,wecharid,room_id FROM `order` ORDER BY id DESC LIMIT {start},{limit};")
        data = self.cursor.fetchall()
        return data


if __name__ == '__main__':
    l = GetInfo()
    data = l.search_order(1, 2, '+id')
    print(data)
