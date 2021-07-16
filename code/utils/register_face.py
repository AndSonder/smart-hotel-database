import requests
import json

data = requests.post(url='http://127.0.0.1:6667/face/add', data=json.dumps({"user_id": 'luchang',
                                                                            'image_path': '/home/ubuntu/smart-hotel/code/static/Xnip2021-07-15_17-06-40.jpg'}))
print(data.text)
print(data.status_code)
print(data)
