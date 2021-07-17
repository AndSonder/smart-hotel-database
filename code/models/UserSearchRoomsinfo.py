# author:liuyang
# time:2021/7/13
from . import Model
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomType":"豪华大床房",
    "startTime":"2020-05-17 18:55:49",
    "endTime":"2020-05-26 18:55:49",
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchRoominfo(Model):
    def __init__(self):
        super(ClientSearchRoominfo, self).__init__()

    def search(self, word):
        data_list = []
        sql = f"SELECT * FROM room,`order`"\
              f"WHERE (scid > '{word['endTime']}' AND id_status = 3 AND `order`.room_id = room.id AND rtype = '{word['roomType']}') OR"\
              f"(sgo < '{word['startTime']}' AND id_status = 3 AND `order`.room_id = room.id AND rtype = '{word['roomType']}') OR"\
              f"(rtype = '{word['roomType']}' AND id_status = 2 AND `order`.room_id = room.id) OR"\
              f"(rtype = '{word['roomType']}' AND id_status = 1 AND `order`.room_id = room.id);"
        print(sql)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                {"rtype": item[1], "bedtype": item[2], "maxnum": item[3], "money": item[6], "roomWindow":item[5]})
        return data_list
