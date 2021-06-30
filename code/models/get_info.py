from . import Model


class GetInfo(Model):
    def __init__(self):
        super(GetInfo, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT name, sex, phone, level FROM user WHERE wecharid='{word}'")
        data = self.cursor.fetchone()
        return data


if __name__ == '__main__':
    l = GetInfo()
    l.search('admin')
