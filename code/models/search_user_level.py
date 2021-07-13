# author:liuyang
# time:2021/7/12
from . import Model

class SearchLevel(Model):
    def __init__(self):
        super(SearchLevel, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT level FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchone()
        return data