# author:liuyang
# time:2021/7/12
from . import Model

class UserCheck(Model):
    def __init__(self):
        super(UserCheck, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT name FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchone()
        return data


