# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "currentTime":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchPersonRoominfo(Model):
    def __init__(self):
        super(ClientSearchPersonRoominfo, self).__init__()

    def search(self, word):
        data_list = []

        sql = f"SELECT * FROM room,`order`" \
              f"WHERE (wecharid = '{word['wecharid']}' AND id_status = 0 AND `order`.room_id = room.id);"
        print(sql)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append({"id": item[0], "rtype": item[1], "temperature": item[7], "humidity": item[8], "lockStatus": item[9]})

        sql = f"SELECT * FROM room,`order`" \
              f"WHERE wecharid = '{word['wecharid']}' AND id_status = 3 AND `order`.room_id = room.id;"
        print(sql)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append({"id": item[0], "rtype": item[1]})

        return data_list
