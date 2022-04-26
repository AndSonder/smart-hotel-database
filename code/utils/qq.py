#!/usr/bin/env python
# vim: set fileencoding=<encoding name>
import smtplib
from email.mime.text import MIMEText
from email.header import Header


class Reminder:
    def __init__(self, qq=None, register=None):
        """
        :param qq: 发送的qq账号
        :param register: qq邮箱授权吧
        """
        self.qq = qq
        self.register = register
        self.server = smtplib.SMTP_SSL("smtp.qq.com", 465)

    def send(self, title, detail, receivers=None):
        """
        send message
        :param title: the title of the message
        :param detail: the detail of the message
        """
        sender = self.qq
        if receivers is None:
            receivers = self.qq
        else:
            receivers = str(receivers) + '@qq.com'
        message = MIMEText(detail, 'plain', 'utf-8')
        message['Subject'] = Header(title, 'utf-8')
        message['From'] = sender
        message['To'] = receivers
        try:
            self.server = smtplib.SMTP_SSL("smtp.qq.com", 465)
            self.server.login(sender, self.register)
            self.server.sendmail(sender, receivers, message.as_string())
            self.server.quit()
        except smtplib.SMTPException as e:
            print(e)

    def register_(self):
        self.qq = '285116040@qq.com'
        self.register = 'sgpxovmlwhjrbjii'


if __name__ == '__main__':
    reminder = Reminder()
    reminder.register_()
    title = 'info test'
    subject = '测试成功\naaa'
    reminder.send(title, subject, 285116040)
