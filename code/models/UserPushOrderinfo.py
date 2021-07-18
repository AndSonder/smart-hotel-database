# author:liuyang
# time:2021/7/13
from . import Model
import time

class UserPushOrder(Model):
    def __init__(self):
        super(UserPushOrder, self).__init__()

    def insert(self, csv_file):
        # self.cursor.execute(f"SELECT id FROM `order` WHERE wecharid = '{csv_file['wecharid']}'")
        # flag = self.cursor.fetchone()
        # if flag:
        #     return 1
        # else:

        time = 0
        count = self.search_count()
        #后面再写计算
        #pmoney根据房间类型来算
        hourmoney = self.search_tmoney(csv_file['roomType'])
        time = (int(csv_file['expAway'][5:7]) - int(csv_file['expLive'][5:7])) * 30 * 24 + (int(csv_file['expAway'][8:10]) - int(csv_file['expLive'][8:10])) * 24 + (int(csv_file['expAway'][11:13]) - int(csv_file['expLive'][11:13]))

        depoist = 131 * time
        pmoney = hourmoney * time + depoist

        roomlist = self.search_roomid(csv_file)
        roomid = roomlist[0]
        print(roomid)
        print(roomlist)
        sql = f"INSERT INTO `order`( id, pmoney, scid, sgo, cid, go, otime, wecharid, room_id, depoist) " \
              f"VALUES ({count},{pmoney},'{csv_file['expLive']}','{csv_file['expAway']}',null,null,'{csv_file['stamp_h']}','{csv_file['wecharid']}',{roomid},{depoist});"
        print(sql)
        #传参
        """
        示例：
            {
                "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
                "roomType":"豪华大床房",
                "expLive":"2020-05-16 18:55:49",
                "expAway":"2020-05-25 18:55:49",
                "stamp":"2020-05-21 18:55:49",
                "prove":"2ca41b85f1002f8202e85064e101c54c"
            }
        """
        try:
            self.cursor.execute(sql)
            self.db.commit()
            return 0
        except:
            # 发生错误时回滚
            self.db.rollback()
            return 1

    def search_count(self):
        self.cursor.execute(f"SELECT max(ID) FROM `order`")
        count = self.cursor.fetchone()
        count = count[0]
        return count + 1

    def search_tmoney(self,rtype):
        sql = f"SELECT money FROM room WHERE rtype = '{rtype}';"
        self.cursor.execute(sql)
        pmoney = self.cursor.fetchone()
        pmoney = pmoney[0]
        print(pmoney)
        return pmoney

    def search_roomid(self, data):
        roomid_list_ill = []
        sql = f"SELECT room_id FROM room,`order` " \
              f"WHERE (scid > '{data['expLive']}' AND scid < '{data['expAway']}' AND id_status = 0 AND `order`.room_id = room.id AND rtype = '{data['roomType']}') OR " \
              f"(sgo > '{data['expLive']}' AND sgo < '{data['expAway']}' AND id_status = 0 AND `order`.room_id = room.id AND rtype = '{data['roomType']}')  OR " \
              f"(scid > '{data['expAway']}'  AND id_status = 0 AND `order`.room_id = room.id AND rtype != '{data['roomType']}') OR " \
              f"(sgo < '{data['expLive']}' AND id_status = 0 AND `order`.room_id = room.id AND rtype != '{data['roomType']}')  OR " \
              f"(scid > '{data['expLive']}' AND scid < '{data['expAway']}' AND id_status = 0 AND `order`.room_id != room.id AND rtype = '{data['roomType']}') OR " \
              f"(sgo > '{data['expLive']}' AND sgo < '{data['expAway']}' AND id_status = 0 AND `order`.room_id != room.id AND rtype = '{data['roomType']}') ;"

        print(sql)
        self.cursor.execute(sql)
        roomid = self.cursor.fetchall()
        for item in roomid:
            roomid_list_ill.append(item)

        roomid_list = []
        sql = f"SELECT id FROM room WHERE rtype = '{data['roomType']}';"
        self.cursor.execute(sql)
        room_id = self.cursor.fetchall()
        for item in room_id:
            roomid_list.append(item)

        data_list = []
        for item in roomid_list:
            if item not in roomid_list_ill:
                data_list.append(item[0])

        print(data_list)
        return data_list