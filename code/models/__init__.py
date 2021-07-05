import pymysql

from . import *
from .db_config import *


class Model:
    def __init__(self):
        self.db = pymysql.connect(
            host=db_ip,
            port=3306,
            user=username,
            passwd=password,
            db=db_name,
            charset='utf8'
        )
        self.cursor = self.db.cursor()

    def insert(self, csv_file):
        pass

    def search(self, word):
        pass


db = Model()
