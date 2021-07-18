# author:liuyang
# time:2021/7/13
from . import Model
import pymysql

"""
示例：
    {
        "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "orderId":1,
        "phone":"18178346924",
        "expLive":"2020-05-16 18:55:49",
        "expAway":"2020-05-25 18:55:49",
        "actLive":"",
        "actAway":"",
        "phone":"18112346924",
        "stamp":"2020-05-21 18:55:49",
        "prove":"2ca41b85f1002f8202e85064e101c54c"
    }
"""
class UserPush(Model):
    def __init__(self):
        super(UserPush, self).__init__()

    def update(self, csv_file):
        flag = self.search(csv_file['orderId'])
        if flag:
            Flag = self.search_flag(csv_file)
            print(Flag)
            if Flag == 1:
                sql = f"UPDATE `order` SET id_status ={csv_file['orderStatus']} ,scid = '{csv_file['expLive']}', sgo = '{csv_file['expAway']}' WHERE id = {csv_file['orderId']}"
                print(sql)
                #传参
                try:
                    self.cursor.execute(sql)
                    self.db.commit()
                    return 0
                except:
                    # 发生错误时回滚
                    self.db.rollback()
                    return 2
            elif Flag == 2:
                sql = f"UPDATE `order` SET id_status ={csv_file['orderStatus']} , cid ='{csv_file['actLive']}' WHERE id = {csv_file['orderId']}"
                print(sql)
                # 传参
                try:
                    self.cursor.execute(sql)
                    self.db.commit()
                    return 0
                except:
                    # 发生错误时回滚
                    self.db.rollback()
                    return 2

            elif Flag == 3:
                sql = f"UPDATE `order` SET id_status ={csv_file['orderStatus']} , go = '{csv_file['actAway']}' WHERE id = {csv_file['orderId']}"
                print(sql)
                # 传参
                try:
                    self.cursor.execute(sql)
                    self.db.commit()
                    return 0
                except:
                    # 发生错误时回滚
                    self.db.rollback()
                    return 2

            else:
                return 4

        else:
            return 3

    def search(self, word):
        self.cursor.execute(f"SELECT wecharid FROM `order` WHERE id={word}")
        data = self.cursor.fetchone()
        print(data)
        return data

    def search_flag(self, data):
        print(data['expLive'])
        if data['expLive'] is None:
            print(data['expLive'])

        if data['expLive'] and data['expAway']:
            if data['actLive'] and data['actLive']:
                pass
            else:
                flag = 1
                # 修改和退订
                return flag

        elif data['actLive'] :
            if int(data['expAway']):
                pass
            else:
                flag = 2
                #入住
                return flag

        elif data['actAway'] :
            if int(data['actLive']):
                pass
            else:
                flag = 3
                #入住
                return flag

        else:
            flag = 4
            return flag