import pymysql
from pymysql import OperationalError
import pandas
import time


class Model:
    def __init__(self):
        self.db = pymysql.connect(
            host='106.52.105.247',
            port=3306,
            user='root',
            passwd='332638qaz',
            db='mayuan',
            charset='utf8'
        )
        self.cursor = self.db.cursor()

    def insert(self, csv_file):
        pass

    def search(self, word):
        pass


if __name__ == '__main__':
    m = Model()
    # m.insert('/Users/keter/Library/Mobile Documents/com~apple~CloudDocs/大二课程学习/马原/答题/19-20-2非标准.csv')
    while True:
        inpu = input('In:')
        m.search(inpu)
