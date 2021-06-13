from .admin_login import admin_login


def init_app(app):
    app.register_blueprint(admin_login)