from . import Model


class GetInfo(Model):
    def __init__(self):
        super(GetInfo, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT password,token FROM admin WHERE username='{word}'")
        data = self.cursor.fetchone()
        print(data)
        return data


if __name__ == '__main__':
    l = GetInfo()
    l.search('admin')
