# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "adminCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId": 1,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class AdminSearchAir(Model):
    def __init__(self):
        super(AdminSearchAir, self).__init__()

    def search(self, word):
        data_list = []
        self.cursor.execute(f"SELECT * FROM air_conditioning WHERE room_id = {word['roomId']};")
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                {"airId": item[0], "airStatus": item[1], "airMode": item[4], "airValue": item[2]})
        return data_list