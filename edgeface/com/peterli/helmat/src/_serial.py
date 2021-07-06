# #!/usr/bin/python
# # -*- coding: UTF-8 -*-
# # from serial import Serial

# import threading
# import time
# import os


# __all__ = ['SerialThread']


# class SerialThread(threading.Thread):
#     def __init__(self, name):
#         threading.Thread.__init__(self)
#         self.name = name
#         self.is_loop = True
#         print('初始化串口线程成功！')

#     def run(self):
#         # 把要执行的代码写到run函数里面 线程在创建后会直接运行run函数
#         while self.is_loop:
#             print('serial running')
#             time.sleep(0.5)


#     def set_data(self, data):
#         print('设置发送数据')

#     def stop(self):
#         """
#         结束线程
#         """
#         self.is_loop = False

from serial import Serial

import threading
import time
import os

__all__ = ['SerialThread']


class SerialThread(threading.Thread):
    def __init__(self, name):
        threading.Thread.__init__(self)
        self.name = name
        self.is_loop = True
        self.flag = False
        self.data = None
        # #
        # try:
        #     uartport = "/dev/ttyPS1"
        #     bps = 9600
        #     timeout = 10
        #     uar_serial = Serial(uartport, bps, timeout=timeout)
        # except Exception as e:
        #     print("----error-----", e)

        print('初始化串口线程成功！')

    def run(self):
        # 把要执行的代码写到run函数里面 线程在创建后会直接运行run函数
        # serial = Serial("/dev/ttyPS1",9600,timeout=10)
        # os.system("python ~/workspace/helmat_dup/uart.py")
        # time.sleep(1)
        # print('uart done')
        # result = serial.write(sys.argv[1])
        # try:
        #     # result = serial.write(sys.argv[1])
        #     uartport = "/dev/ttyPS1"
        #     bps = 9600
        #     timeout = 10
        #     uar_serial = Serial(uartport, bps, timeout=timeout)
        #     for i in range(10):
        #         result = uar_serial.write("HelloWorld")
        #         time.sleep(0.5)
        #         print(result)

        # except Exception as e:
        #     print("----error-----", e)
        # print(result)
        # serial.close()
        while self.is_loop:
            if self.flag:
                time.sleep(1)
                # send()
                self.flag = False

    def set_data(self, data):
        self.data = data
        self.flag = True
        print('设置发送数据')

    def stop(self):
        """
        结束线程
        """
        uar_serial.close()
        self.is_loop = False
