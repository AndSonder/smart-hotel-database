"""
created by coronaPolvo 6 17
"""
import json
from ..models.get_info import GetInfo
from flask import Blueprint
from flask import request
import datetime
import time

hotel_chart = Blueprint('hotel_chart', __name__)


@hotel_chart.route('/hotel/chart', methods=['GET'])
def index():
    """
    获取酒店盈利信息
    """
    token = request.args.get("token")
    num = request.args.get("num")
    if token is None or num is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    data = db.search(token)
    # 用户不存在
    if data is None:
        return json.dumps({"code": 20002, "message": "用户不存在"})
    level = int(data[-1])
    if level > 1:
        return json.dumps({"code": 20006, "message": "权限不足"})
    hotel_info, question_info = db.hotel_chart(num)
    question_num = []
    start_date = int(time.strftime("%Y%m%d"))
    question = {}
    for item in question_info:
        question[int(item[0])] = item[1]
    for i in range(int(num)):
        if (start_date - i) not in question:
            question_num.append(0)
        else:
            question_num.append(question[start_date - i])
    order_num = []
    order_money = []
    orderNum = {}
    orderMoney = {}
    for item in hotel_info:
        orderNum[int(item[0])] = item[2]
        orderMoney[int(item[0])] = item[1]
    for i in range(int(num)):
        if (start_date - i) not in orderNum:
            order_num.append(0)
            order_money.append(0)
        else:
            order_num.append(orderNum[start_date - i])
            order_money.append(int(orderMoney[start_date - i]))
    people_num = order_num
    people_num_all = sum(people_num)
    order_num_all = sum(order_num)
    order_money_all = sum(order_money)
    question_num_all = sum(question_num)
    people_num.reverse()
    order_num.reverse()
    question_num.reverse()
    order_money.reverse()
    data = {
        "code": 20000,
        "data": {
            "people_num_all": people_num_all,
            "order_num_all": order_num_all,
            "question_num_all": question_num_all,
            "order_money_all": order_money_all,
            "people_num": people_num,
            "order_num": order_num,
            "question_num": question_num,
            "order_money": order_money,
        }
    }
    return json.dumps(data)
