# author:liuyang
# time:2021/7/13
from flask import Blueprint
from flask import request
import requests
import json
from ..models.user_push_info import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/user/perinfo/resident/post
user_post = Blueprint('user_post', __name__)

@user_post.route('/user/perinfo/resident/post', methods=['POST'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)
    stamp_h = time.strftime("%Y-%m-%d%H:%M:%S", time.localtime())
    print(stamp_h)
    str = get_info['resCode'] + get_info['stamp'] + salt
    print(str)
    prove_h = md5sum(str)
    if prove_h == get_info['prove']:
        str2 = 'user' + stamp_h + salt
        table_prove = md5sum(str2)
        db = UserPush()
        flag1 = db.search(get_info['wecharid'])
        print(get_info['wecharid'])
        if flag1:
            datas = {"errcode": 1, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        else:
            flag2 = db.insert(get_info)
            datas = {"errcode": flag2, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
    else:
        return json.dumps({"errcode": 2,"message": "你不对劲！你是faker!"})