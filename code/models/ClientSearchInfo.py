# author:liuyang
# time:2021/7/13
from . import Model

class ClientSearchinfo(Model):
    def __init__(self):
        super(ClientSearchinfo, self).__init__()

    def search(self, word):
        data_list = []
        self.cursor.execute(f"SELECT * FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                { "name": item[1], "sex": item[2], "phone": item[4]})
        return data_list

