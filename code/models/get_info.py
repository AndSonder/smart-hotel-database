from . import Model


class GetInfo(Model):
    def __init__(self):
        super(GetInfo, self).__init__()

    def search(self, token):
        self.cursor.execute(f"select name,sex,phone,level from user where wecharid='{token}';")
        data = self.cursor.fetchone()
        print(data)
        return data


class GetHotelInfo(GetInfo):
    def __init__(self):
        super(GetHotelInfo, self).__init__()

    def search_order_money(self):
        self.cursor.execute(f"select COUNT(")


if __name__ == '__main__':
    l = GetInfo()
    l.search('admin')
