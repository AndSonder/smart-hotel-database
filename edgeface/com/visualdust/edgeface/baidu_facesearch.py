# -*- coding: UTF-8 -*
import requests
from com.visualdust.utils.logger import Logger
from com.baidu.sdk.aip import AipFace
import base64
import json


class BaiduFaceSearch:
    def __init__(self, configs=None):
        self.logger = Logger(self)
        self.logger.log('instantiating BaiduFaceSearch utils...', '@')
        # Loading config
        if configs is None:
            self.logger.log('config arg is null. using default...')
            self.configs = json.load(open('config/baidu/api.facesearch.config.json'))
        else:
            self.configs = configs
        # self.token_ref_api_loc_default = config["token_ref_api_loc_default"]
        # self.api_loc_face_search = config["api_loc_face_search"]
        api_key = self.configs["api_key"]
        api_sec = self.configs["api_secret"]
        app_id = self.configs["app_id"]
        # print("id = " + self.app_id + ", key = " + self.api_key + ", secret = " + self.api_sec)
        self.logger.log('instantiating BaiduAPI...', '@')
        self.client = AipFace(app_id, api_key, api_sec)

    # def request_baidu_api_token(self='', api_sec='', grand_type='client_credentials'):
    #     host = '%s?grant_type=%s&client_id=%s&client_secret=%s' % (
    #         self.token_ref_api_loc_default, grand_type, self, api_sec)
    #     response = requests.get(host)
    #     if response:
    #         return response.json()
    #     else:
    #         return "null"

    def request_face_search_path(self, image_path, image_type="BASE64", group_id_list="1", options={}):
        # options = Configure.read("../config/")
        # base64_data = bytes(('data: image/jpeg;base64,%s' % str(base64.b64encode(f.read()), "utf-8")), "utf-8")
        # 转换为bytes对象
        group_id_list = self.configs["group_id_list"]
        base64_data = str(base64.b64encode(open(image_path, 'rb').read())).encode('utf-8')
        # base64_data = str(urllib.parse.quote(base64_data))
        # if "prefix" in kwargs.keys():
        #     data = kwargs["prefix"] + data
        options["max_face_num"] = self.configs["options.max_face_num"]
        options["max_user_num"] = self.configs["options.max_user_num"]
        options["match_threshold"] = 70
        options["quality_control"] = "NORMAL"
        options["liveness_control"] = "NONE"
        # options["user_id"] = "233451"
        self.logger.log('requesting face search...', '$')
        result = self.client.search(base64_data, image_type, group_id_list, options)
        return result

    def request_face_search_img(self, image, group_id_list="", options={}):
        group_id_list = "creativeAI"
        base64_data = str(base64.b64encode(image), "utf-8")
        return self.client.search(base64_data, "BASE64", group_id_list, options)

    def face_token_of_path(self, image_path):
        return self.request_face_search_path(image_path)["face_token"]

    def face_token_of_img(self, image):
        return self.request_face_search_img(image)["face_token"]

# for test only
# face_search = BaiduFaceSearch()
# print(face_search.request_face_search_path("D:\Desktop\Snipaste_2020-11-05_21-15-43.png"))
