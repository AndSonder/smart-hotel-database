from . import Model


class GetInfo(Model):
    def __init__(self):
        super(GetInfo, self).__init__()

    def search(self, token):
        self.cursor.execute(f"select name,sex,phone,level from user where wecharid='{token}';")
        data = self.cursor.fetchone()
        print(data)
        return data


if __name__ == '__main__':
    l = GetInfo()
    l.search('admin')
