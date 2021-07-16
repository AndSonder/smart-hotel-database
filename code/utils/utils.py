import json


def black2none(*args):
    result = []
    for item in args:
        if item == '':
            result.append(None)
        else:
            result.append(item)
    return result


def catch_except(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(e)
            return json.dumps({"code": 20007, "message": "非法操作!"})

    return wrapper
