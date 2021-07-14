# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId": 1,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class AdminSearchRoominfo(Model):
    def __init__(self):
        super(AdminSearchRoominfo, self).__init__()

    def search(self, data):
        data_list = []

        sql = f"SELECT * FROM room,`order` " \
              f"WHERE (room_id = {data['roomId']} AND id_status = 0 AND `order`.room_id = room.id);"
        print(sql)
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                {"roomId": item[0], "roomType": item[1], "bedType": item[2],
                 "roomArea": item[4], "maximum": item[3], "roomWindow": item[5],
                 "roomPrice": item[6], "roomTemp": item[7], "roomHum": item[8]})

        return data_list


