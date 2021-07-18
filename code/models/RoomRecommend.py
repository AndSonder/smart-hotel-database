# author:liuyang
# time:2021/7/18
from . import Model
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId": 1,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class Roomrecommend(Model):
    def __init__(self):
        super(Roomrecommend, self).__init__()

    def search(self, word):
        try:
            data_list = []
            self.cursor.execute(
                f"select room.rtype,bedtype,maxnum,money,rwin,count(*) num from `order`,room where `order`.room_id = room.id group by room.rtype order by num DESC ;")
            data = self.cursor.fetchall()
            print(data)
            count = 0
            for item in data:
                if count == 2:
                    return data_list
                count += 1
                data_list.append(
                    {"roomType": item[0], "bedType": item[1], "maximum": item[2], "roomPrice": item[3],
                     "roomWindow": item[4]})
        except:
            self.db.rollback()
            print("出现了未知错误！可能是没有该订单！")
            return 2