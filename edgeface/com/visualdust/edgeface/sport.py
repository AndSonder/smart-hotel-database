# -*- coding: UTF-8 -*
from serial import Serial
from com.visualdust.utils.logger import Logger


class Sport:
    # command_suffix = '0'
    command_suffix = ''

    def __init__(self, configs):
        self.sport = Serial(configs['serial_port'],
                            baudrate=configs['baudrate'],
                            timeout=configs['serial_timeout'])
        self.logger = Logger(self)
        # self.sport.open()

    def readline(self):
        return self.sport.readline()

    def read_as_dict(self):
        val = {}
        for key, value in self.readline().split(','):
            val[key] = value
        return val

    def write(self, message):
        self.sport.write(str(message + self.command_suffix))
        self.logger.log('serial writes : ' + str(message))

    def write_dict(self, dict, equ='=', spliter=','):
        final_str = ""
        for key, value in dict:
            final_str += (key + equ + value + spliter)
        self.write(final_str)
