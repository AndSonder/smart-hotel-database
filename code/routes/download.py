from flask import Blueprint
from flask import request
from flask import send_from_directory
import os
from flask import abort
import requests
import json
import time

download = Blueprint('download', __name__)


@download.route("/download/<filename>", methods=['GET'])
def index(filename):
    if request.method == "GET":
        if os.path.isfile(os.path.join('static', filename)):
            return send_from_directory('static', filename, as_attachment=True)
        elif os.path.isfile(os.path.join('static', filename + '.jpg')):
            return send_from_directory('static', filename, as_attachment=True)
        elif os.path.isfile(os.path.join('static', filename + '.png')):
            return send_from_directory('static', filename, as_attachment=True)
    print(filename)
    abort(404)
