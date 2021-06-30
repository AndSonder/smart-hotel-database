<<<<<<< HEAD
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



=======
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



>>>>>>> ae1d36bd60697f5aa89d4186f1bd8170cd10dcda
