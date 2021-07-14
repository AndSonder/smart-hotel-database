# author:liuyang
# time:2021/7/14
from . import Model
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId": 1,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchLight(Model):
    def __init__(self):
        super(ClientSearchLight, self).__init__()

    def search(self, word):
        data_list = []
        self.cursor.execute(f"SELECT * FROM light WHERE room_id = {word['roomId']};")
        data = self.cursor.fetchall()
        print(data)
        for item in data:
            data_list.append(
                {"lightStatus": item[1], "lightMode": item[4], "lightValue": item[2]})
        return data_list