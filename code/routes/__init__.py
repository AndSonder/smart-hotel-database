import os
import glob

# auto import route
routes = glob.glob(r"./routes/*.py")
routes = [i.split('/')[-1] for i in routes]
routes.remove('__init__.py')

for route in routes:
    route = route[:-3]
    exec(f'from .{route} import {route}')


def init_app(app):
    for route in routes:
        route = route[:-3]
        eval(f'app.register_blueprint({route})')
