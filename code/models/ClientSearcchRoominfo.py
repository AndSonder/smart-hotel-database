# author:liuyang
# time:2021/7/18
from . import Model
"""
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":9,
    "stamp":"2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchroominfo(Model):
    def __init__(self):
        super(ClientSearchroominfo, self).__init__()

    def search(self, word):
        # try:
            data_list = []

            if word['roomId']:
                print(word['roomId'])
                sql = f"select room.id,rtype,bedtype,area,maxnum,rwin,pmoney,temperature,humidity from room,`order` " \
                      f"where room_id = room.id and room_id = {word['roomId']};"
                self.cursor.execute()
                print(sql)
                data = self.cursor.fetchone()
                print(data)
                data_list.append(
                    {"roomId": data[0], "roomType": data[1], "bedType": data[2], "roomArea": data[3],
                     "maximum": data[4], "roomWindow": data[5], "roomPrice": data[6], "roomTemp": data[7],
                     "roomHum": data[8]})
                print('成功！')
                return data_list
            elif word['roomType']:
                print(word['roomType'])
                sql = f"select room.id,rtype,bedtype,area,maxnum,rwin,pmoney,temperature,humidity from room,`order` " \
                      f"where room_id = room.id and rtype = '{word['roomType']}';"
                self.cursor.execute(sql)
                print(sql)
                data = self.cursor.fetchone()
                print(data)
                data_list.append(
                    {"roomId": data[0], "roomType": data[1], "bedType": data[2], "roomArea": data[3],
                     "maximum": data[4], "roomWindow": data[5], "roomPrice": data[6], "roomTemp": data[7],
                     "roomHum": data[8]})
                return data_list
            else:
                return 2
        # except:
        #     self.db.rollback()
        #     print("出现了未知错误！可能是没有该订单！")
        #     return 2

    def search_status(self,data):
        sql = f"select id_status from `order`where room_id = {data['roomId']} and wecharid = '{data['wecharid']}';"
        self.cursor.execute(sql)
        status = self.cursor.fetchall()
        return status[0]