# author:liuyang
# time:2021/7/13
from . import Model
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchinfo(Model):
    def __init__(self):
        super(ClientSearchinfo, self).__init__()

    def search(self, word):
        data_list = []
        self.cursor.execute(f"SELECT * FROM `order` WHERE wecharid='{word}'")
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                {"orderId": item[0], "roomId": item[7], "actLive": item[3], "actAway": item[4], "orderStatus": item[8]})
        return data_list

# a = ((3, 250, datetime.datetime(2021, 7, 1, 8, 30), datetime.datetime(2021, 7, 4, 8, 30), datetime.datetime(2021, 7, 2, 8, 30), datetime.datetime(1970, 1, 1, 8, 0), 'wxid_ux57m1gafdh523', 3, 1, None),
#      (9, 260, datetime.datetime(2021, 7, 14, 11, 42), datetime.datetime(2021, 7, 15, 19, 49), datetime.datetime(2021, 7, 15, 11, 42), None, 'wxid_ux57m1gafdh523', 2, 0, None),
#      (10, 300, datetime.datetime(2021, 7, 21, 11, 10), datetime.datetime(2021, 7, 23, 11, 10), datetime.datetime(2021, 7, 21, 22, 49), None, 'wxid_ux57m1gafdh523', 3, 0, None),
#      (11, 430, datetime.datetime(2021, 7, 7, 11, 1), datetime.datetime(2021, 7, 7, 11, 1), datetime.datetime(2021, 7, 10, 21, 34, 5), None, 'wxid_ux57m1gafdh523', 6, 0, None))
