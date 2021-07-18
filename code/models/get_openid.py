# author:liuyang
# time:2021/7/18
import json
import requests
appid = "wx718982cd8b3edaa7"
appsecret = "b1cb5c7c65ae67ac55981a0fe13561a1"
def get_wx_user_openid(code:str=None):
    infoList = {}
    try:
    	#code为传参   appid--小程序appid  secret--小程序密钥
        github_url = "https://api.weixin.qq.com/sns/jscode2session?appid="+ appid + "&secret="+ appsecret +"&js_code="+code+"&grant_type=authorization_code"
        r = requests.get(github_url)
        info = json.loads(r.text)
        if(info['openid']):
            infoList['info'] = info
            infoList['code'] = 0
            # print("成功")
        else:
            infoList['code'] = 101
            infoList['msg'] = info['errmsg']
            infoList['errcode'] = info['40163']
            # print("失败")
    except Exception as e:
        infoList["code"] = 200
        infoList['msg'] = e.args
        # print('接口失败')
    return infoList['info']['openid']

wecharid = get_wx_user_openid('093YGn0003BF4M1Ynp3009mrkN1YGn0C')
print(wecharid)
wecharid = wecharid['info']['openid']
print(wecharid)
