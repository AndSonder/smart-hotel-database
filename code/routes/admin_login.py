from flask import Blueprint
import json

admin_login = Blueprint('admin_login', __name__)


@admin_login.route('/user/login', methods=['POST'])
def index():
    data = {"code": 20001, "data": {"token": "admin-token"}}
    data = json.dumps(data)
    return data
