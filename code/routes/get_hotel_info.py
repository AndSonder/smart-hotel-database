from flask import Blueprint
from flask import request
from ..models.get_info import GetInfo
import json

get_hotel_info = Blueprint('get_hotel_info', __name__)


@get_hotel_info.route('/hotel/info', methods=['GET'])
def index():
    """
    获取酒店盈利信息
    """
    token = request.args.get("token")
    if token is None:
        return json.dumps({"code": 20003})
    db = GetInfo()
    data = db.search(token)
    # 用户不存在
    if data is None:
        return json.dumps({"code": 20002})
    name, sex, phone, level = data
    # 构建所需数据
    roles = [role_dict[level]]
    introduction = f"我是{name}, 我的联系方式是{phone}"
    if name in avatars:
        avatar = avatars[name]
    else:
        avatar = 'https://blog.keter.top/img/touxiang.png'
    data = {
        "code": 20000,
        "data": {
            "roles": roles,
            "introduction": introduction,
            "avatar": avatar,
            "name": name
        }
    }
    return json.dumps(data)
