# author:liuyang
# time:2021/7/12
from . import Model

class SearchRoomInfo(Model):
    def __init__(self):
        super(SearchRoomInfo, self).__init__()

    def search_room_info(self, wecharid,room_id):
        data_list = []
        self.cursor.execute(f"SELECT * FROM `order` WHERE wecharid = {wecharid} and room_id ={room_id}")
        data = self.cursor.fetchall()
        for item in data:
            data_list.append(
                {"id": item[0], "pmoney": item[1], "scid": item[2], "sgo": item[3], "cid": item[4], "go": item[5],
                 "wecharid": item[6], "room_id": item[7], "id_status": item[8], "depoist": item[9]})
        return data_list