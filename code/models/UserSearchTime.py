# author:liuyang
# time:2021/7/18
from . import Model
import time
import datetime
"""
传参举例：
{
    "resCode": "083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":1,
    "stamp": "2020-05-21 18:55:49",
    "prove": "2ca41b85f1002f8202e85064e101c54c"
}
"""
class ClientSearchTime(Model):
    def __init__(self):
        super(ClientSearchTime, self).__init__()

    def search(self, word):
        try:
            time_list = []
            roomid = self.search_roomid(word)[0]
            scid = self.search_scid(word)[0]
            print(f"scid:  {scid}")
            sql = f"SELECT MAX(sgo) from `order` WHERE (sgo < '{scid}' AND id_status = 0 AND room_id = {roomid}) OR" \
                  f"(sgo < '{scid}' AND id_status = 3 AND room_id = {roomid});"
            print(sql)
            #  AND id = '{word['orderId']}'
            self.cursor.execute(sql)

            data = self.cursor.fetchone()
            print(data)
            print(data[0])
            if data[0]:
                for item in data:
                    print(item)
                    time_list.append({"startTime": item})

            else:
                stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                time_list.append({"startTime": stamp_h})
            print(time_list)

            sgo = self.search_sgo(word)[0]
            print(f"scid:  {sgo}")
            sql = f"SELECT MIN(scid) from `order` WHERE ('{sgo}'< scid AND id_status = 0 AND room_id = {roomid}) OR " \
                  f"('{sgo}' < scid AND id_status = 3 AND room_id = {roomid});"
            print(sql)
            self.cursor.execute(sql)

            data = self.cursor.fetchone()
            print(data)
            print(data[0])
            if data[0]:
                for item in data:
                    print(item)
                    time_list.append({"endTime": item})
            else:
                stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                print("stamp_h:\n")
                print(stamp_h)
                dt = datetime.datetime.strptime(stamp_h, "%Y-%m-%d %H:%M:%S")
                print("dt:\n")
                print(dt)
                dt = dt + datetime.timedelta(days=60)
                print("f-dt:\n")
                print(dt)
                time_list.append({"endTime": dt})
            return time_list
        except:
            # 发生错误时回滚
            self.db.rollback()
            return 2



    def search_sgo(self, word):
        time_list = []
        sql = f"SELECT sgo  from `order` WHERE  id = '{word['orderId']}' AND wecharid = '{word['wecharid']}' AND id_status = 3;"
        print(sql)
        self.cursor.execute(sql)
        data = self.cursor.fetchone()
        print(data)
        for item in data:
            print(item)
            time_list.append(item)
        print(time_list)
        return time_list

    def search_scid(self, word):
        time_list = []
        print(word)
        print(word['orderId'])
        sql = f"SELECT scid  from `order` WHERE  id = '{word['orderId']}' AND wecharid = '{word['wecharid']}' AND id_status = 3;"
        print(sql)
        self.cursor.execute(sql)
        data = self.cursor.fetchone()
        print(data)
        for item in data:
            print(item)
            time_list.append(item)
        print(time_list)
        return time_list

    def search_roomid(self,word):
        room = []
        print(word)
        print(word['orderId'])
        sql = f"SELECT room_id  from `order` WHERE  id = '{word['orderId']}'"
        print(sql)
        self.cursor.execute(sql)
        data = self.cursor.fetchone()
        print(data)
        for item in data:
            print(item)
            room.append(item)
        print(room)
        return room