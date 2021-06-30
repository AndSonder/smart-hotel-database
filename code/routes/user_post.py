# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
from ..models.login_check import LoginCheck
import json

#https://www.supremeproger.com/user_post
user_post = Blueprint('user_post', __name__)

@user_post.route('/user_post', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)