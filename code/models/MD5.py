# author:liuyang
# time:2021/7/12
import hashlib
from .SALT  import *
def md5sum(str):

    print(str)
    m = hashlib.md5()  # 创建一个hashlib.md5()对象
    m.update(str.encode("utf8"))  # 将参数转换为UTF8编码
    print('加密后的结果为: '+m.hexdigest())# 用十六进制输出加密后的数据
    return m.hexdigest()

# import time
# stamp_h = time.strftime("%Y-%m-% d%H:%M:%S", time.localtime())
# print(stamp_h)
# print(type(stamp_h))
#
# str2 = 'user' + stamp_h + salt

# print(str2)