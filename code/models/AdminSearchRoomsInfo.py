# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "startTime":"2020-05-21 18:55:49",
    "endTime":"2020-05-21 18:55:49",
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class AdminSearchRoomsinfo(Model):
    def __init__(self):
        super(AdminSearchRoomsinfo, self).__init__()

    def search_live(self, word):

        if word['roomType'] == '全选':
            data_list = []
            if word['startTime'] is None and word['endTime'] is None:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light " \
                      f"WHERE (id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id ) OR " \
                      f"(id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id);"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9]})

                return data_list
            else:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light "\
                      f"WHERE (scid > '{word['endTime']}' AND id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id ) OR "\
                      f"(sgo < '{word['startTime']}' AND id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id);"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"orderId":item[10], "roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9] })

                return data_list
        else:
            data_list = []
            if word['startTime'] is None and word['endTime'] is None:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light " \
                      f"WHERE (id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND rtype = '{word['roomType']}') OR " \
                      f"(id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND rtype = '{word['roomType']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9]})

                return data_list
            else:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light " \
                      f"WHERE (scid > '{word['endTime']}' AND id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND rtype = '{word['roomType']}') OR " \
                      f"(sgo < '{word['startTime']}' AND id_status = 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND rtype = '{word['roomType']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"orderId": item[10], "roomId": item[0], "roomTemp": item[7], "roomHum": item[8],
                         "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9]})

                return data_list


    def search_notlive(self, word):
        data_list = []

        if word['roomType'] == '全选':
            if word['startTime'] is None and word['endTime'] is None:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light " \
                      f"WHERE (id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id ) OR " \
                      f"(id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id);"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9]})

                return data_list
            else:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light "\
                      f"WHERE (scid > '{word['endTime']}' AND id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.id AND room.id = light.id) OR "\
                      f"(sgo < '{word['startTime']}' AND id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.id AND room.id = light.id);"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22], "lightStatus": item[27], "lockStatus": item[9]})

                return data_list
        else:
            if word['startTime'] is None and word['endTime'] is None:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light " \
                      f"WHERE (id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND rtype = '{word['roomType']}') OR " \
                      f"(id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.room_id AND room.id = light.room_id AND rtype = '{word['roomType']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9]})

                return data_list
            else:
                sql = f"SELECT * FROM room,`order`,air_conditioning,light " \
                      f"WHERE (scid > '{word['endTime']}' AND id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.id AND room.id = light.id AND rtype = '{word['roomType']}') OR " \
                      f"(sgo < '{word['startTime']}' AND id_status != 0 AND `order`.room_id = room.id AND room.id = air_conditioning.id AND room.id = light.id AND rtype = '{word['roomType']}');"
                print(sql)
                self.cursor.execute(sql)
                data = self.cursor.fetchall()
                print(data)
                for item in data:
                    data_list.append(
                        {"roomId": item[0], "roomTemp": item[7], "roomHum": item[8], "airStatus": item[22],
                         "lightStatus": item[27], "lockStatus": item[9]})

                return data_list