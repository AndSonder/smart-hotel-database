# author:liuyang
# time:2021/7/13
from . import Model
"""
传参举例：
{
    "adminCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":3,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class AdminSearchinfo(Model):
    def __init__(self):
        super(AdminSearchinfo, self).__init__()

    def search(self, orderid):
        data_list = []
        self.cursor.execute(f"SELECT * FROM `order` WHERE `order`.id='{orderid}' and id_status = 0 ")
        data = self.cursor.fetchall()
        print(data)
        if data:
            for item in data:
                print(item)
                data_list.append(
                    {"orderId": item[0], "amountsPay": item[1], "expLive": item[2],"expAway": item[3], "actLive": item[4], "actAway": item[5], "roomId": item[8], "orderStatus": item[9], "depoist": item[10]})
                return data_list
        else:
            return 2

