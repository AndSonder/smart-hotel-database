import os

# auto import route
routes = os.listdir('./routes')[2:]
for route in routes:
    route = route[:-3]
    exec(f'from .{route} import {route}')


def init_app(app):
    for route in routes:
        route = route[:-3]
        eval(f'app.register_blueprint({route})')
