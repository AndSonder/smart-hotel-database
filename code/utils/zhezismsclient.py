import requests
import json
from requests.packages.urllib3.exceptions import InsecureRequestWarning


class ZhenziSmsClient(object):
    def __init__(self, apiUrl, appId, appSecret):
        self.apiUrl = apiUrl
        self.appId = appId
        self.appSecret = appSecret

    def send(self, params):
        data = params
        data['appId'] = self.appId
        data['appSecret'] = self.appSecret
        if ('templateParams' in data):
            data['templateParams'] = json.dumps(data['templateParams'])
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(self.apiUrl + '/sms/v2/send.do', data=data, verify=False)
        result = str(response.content, 'utf-8')
        return result

    def balance(self):
        data = {
            'appId': self.appId,
            'appSecret': self.appSecret
        }
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(self.apiUrl + '/account/balance.do', data=data, verify=False)
        result = str(response.content, 'utf-8')
        return result

    def findSmsByMessageId(self, messageId):
        data = {
            'appId': self.appId,
            'appSecret': self.appSecret,
            'messageId': messageId
        }
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(self.apiUrl + '/smslog/findSmsByMessageId.do', data=data, verify=False)
        result = str(response.content, 'utf-8')
        return result
