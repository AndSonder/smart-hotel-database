# author:liuyang
# time:2021/7/18
from . import Model
"""
传参举例：
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomType":"豪华大床房",
    "startTime":"2020-05-21 18:55:49",
    "endTime":"2020-05-21 18:55:49",
    "orderId":1,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class AdminSearchRoominfo(Model):
    def __init__(self):
        super(AdminSearchRoominfo, self).__init__()

    def search_live(self, word):

        if word['roomType'] == '全选':
            flag = self.search(word)
            if flag is None:
                return 2
            if flag == 0:
                data_list = []
                sql = f"SELECT `order`.id,room.id,room.temperature,room.humidity,rlock,air_conditioning.status,light.status,id_status FROM room,`order`,air_conditioning,light "\
                      f"WHERE (scid > '{word['endTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}') OR "\
                      f"(sgo < '{word['startTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                if data:
                    for item in data:
                        data_list.append(
                            {"orderId":item[0], "roomId": item[1], "roomTemp": item[2], "roomHum": item[3], "lockStatus": item[4] , "airStatus": item[5],
                             "lightStatus": item[6], "orderStatus": item[7] })
                    return data_list
                else:
                    return 2

            else:
                data_list = []
                sql = f"SELECT room.id,rlock,air_conditioning.status,light.status,id_status FROM room,`order`,air_conditioning,light "\
                      f"WHERE (scid > '{word['endTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}') OR "\
                      f"(sgo < '{word['startTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                if data:
                    for item in data:
                        data_list.append(
                            {"roomId": item[0], "lockStatus": item[1], "airStatus": item[2],
                             "lightStatus": item[3], "orderStatus": item[4]})
                    return data_list
                else:
                    return 2
        else:
            flag = self.search(word)
            if flag is None:
                return 2
            if flag == 0:
                data_list = []
                sql = f"SELECT `order`.id,room.id,room.temperature,room.humidity,rlock,air_conditioning.status,light.status,id_status FROM room,`order`,air_conditioning,light "\
                      f"WHERE (scid > '{word['endTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}' AND rtype = '{word['roomType']}') OR "\
                      f"(sgo < '{word['startTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}' AND rtype = '{word['roomType']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                if data:
                    for item in data:
                        data_list.append(
                            {"orderId":item[0], "roomId": item[1], "roomTemp": item[2], "roomHum": item[3], "lockStatus": item[4] , "airStatus": item[5],
                             "lightStatus": item[6], "orderStatus": item[7] })
                    return data_list
                else:
                    return 2
            else:
                data_list = []
                sql = f"SELECT room.id,rlock,air_conditioning.status,light.status,id_status FROM room,`order`,air_conditioning,light "\
                      f"WHERE (scid > '{word['endTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}' AND rtype = '{word['roomType']}') OR "\
                      f"(sgo < '{word['startTime']}'  AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND `order`.id = '{word['orderId']}' AND rtype = '{word['roomType']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                if data:
                    for item in data:
                        data_list.append(
                            {"roomId": item[0], "lockStatus": item[1], "airStatus": item[2],
                             "lightStatus": item[3], "orderStatus": item[4]})
                    return data_list
                else:
                    return 2

    def search(self, word):
        sql = f"select id_status from `order` where id = {word['orderId']};"
        self.cursor.execute(sql)
        status = self.cursor.fetchone()
        return status[0]


