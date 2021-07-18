# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchIdentity(Model):
    def __init__(self):
        super(ClientSearchIdentity, self).__init__()

    def search(self, word):
        data_list = []
        self.cursor.execute(f"SELECT level FROM user WHERE wecharid = '{word['wecharid']}';")
        data = self.cursor.fetchall()
        print(data)
        if data:
            for item in data:
                data_list.append(
                    {"identity": item[0]})
            return data_list
        else:
            return 2