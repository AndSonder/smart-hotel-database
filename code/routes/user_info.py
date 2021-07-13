from flask import Blueprint
from flask import request
from ..models.get_info import GetInfo
import json

user_info = Blueprint('user_info', __name__)

role_dict = {
    0: 'admin',
    1: '经理',
    2: '前台',
    3: '安保',
    4: '清洁'
}

# 自定义一些头像地址
avatars = {
    '卢畅': 'https://blog.keter.top/img/touxiang.png'
}

@user_info.route('/user/info', methods=['GET'])
def index():
    """
    获取管理员信息
    e.g. {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator", "avatar":"https://xxxx","name":"Super Admin"}}
    """
    token = request.args.get("token")
    if token is None:
        return json.dumps({"code": 20003, "message": "token为空"})
    db = GetInfo()
    data = db.search(token)
    # 用户不存在
    if data is None:
        return json.dumps({"code": 20002, "message": "用户名或密码错误"})
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


