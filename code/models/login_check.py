from . import Model


class LoginCheck(Model):
    def __init__(self):
        super(LoginCheck, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT password,token FROM admin WHERE username='{word}'")
        data = self.cursor.fetchone()
        return data


if __name__ == '__main__':
    l = LoginCheck()
    l.search('admin')


from . import Model


class LoginCheck(Model):
    def __init__(self):
        super(LoginCheck, self).__init__()

    def search(self, word):
        self.cursor.execute(f"SELECT password,token FROM admin WHERE username='{word}'")
        data = self.cursor.fetchone()
        return data


if __name__ == '__main__':
    l = LoginCheck()
    l.search('admin')


