# author:liuyang
# time:2021/7/18
from . import Model
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId": 9,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchCost(Model):
    def __init__(self):
        super(ClientSearchCost, self).__init__()

    def search(self, word):
        try:
            data_list = []
            self.cursor.execute(f"SELECT pmoney FROM `order` WHERE id = {word['orderId']} AND wecharid = '{word['wecharid']}';")
            data = self.cursor.fetchone()
            print(data)
            print(data[0])
            if data:
                data_list.append({"amountsPay": data[0]})
                print(data_list)
                return data_list
            else:
                return 2
        except:
            self.db.rollback()
            print("出现了未知错误！")
            return 2