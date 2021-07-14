# author:liuyang
# time:2021/7/13
from . import Model

class AdminSearchinfo(Model):
    def __init__(self):
        super(AdminSearchinfo, self).__init__()

    def search(self, word):
        data_list = []
        self.cursor.execute(f"SELECT * FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                { "name": item[1], "sex": item[2], "idCard":item[3], "phone": item[4], "identify":item[5]})
        return data_list
