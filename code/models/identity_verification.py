# author:liuyang
# time:2021/6/18
from . import Model

class Db_link(Model):
    def __init__(self):
        super(Db_link, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT wecharid FROM user WHERE token='{word}'")
        data = self.cursor.fetchone()
        if data is not None:
            return data
        else:
            #data = 666表示不是管理员
            data = 666
            return data