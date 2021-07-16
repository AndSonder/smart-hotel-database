import zhezismsclient as smsclient

# client = smsclient.ZhenziSmsClient(apiUrl, appId, appSecret);
# apiUrl为请求地址，个人开发者使用https://sms_developer.zhenzikj.com，企业开发者使用https://sms.zhenzikj.com
# appId：应用id，可通过用户中心，应用详情查看
# appSecret: 应用秘钥，可通过用户中心，应用详情查看
client = smsclient.ZhenziSmsClient('https://sms_developer.zhenzikj.com', '109546', '59db98a1-b917-4a8a-b972-c8cd35f5bf88')  # 需要修改appID, appSecret
print(client.send('13645643941', '今晚吃鸡'))
