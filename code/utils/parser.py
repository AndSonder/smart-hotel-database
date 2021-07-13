import datetime
import time


def string2timestamp(str_value):
    """
    时间格式转化
    """
    if str_value is None:
        return 0
    str_value = str(str_value)
    d = datetime.datetime.strptime(str_value, "%Y-%m-%d %H:%M:%S")
    t = d.timetuple()
    timeStamp = int(time.mktime(t))
    timeStamp = float(str(timeStamp) + str("%06d" % d.microsecond)) / 1000
    return int(timeStamp)
