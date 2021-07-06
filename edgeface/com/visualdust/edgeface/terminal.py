# -*- coding: UTF-8 -*
import json
from uuid import uuid1 as uuid
from threading import Thread
from paho.mqtt.client import Client as MqttClient
from com.visualdust.edgeface.sport import Sport
from com.visualdust.utils.logger import Logger


class Terminal:

    def __init__(self, configs=None):
        self.logger = Logger(self)
        self.logger.log('Instantiating Terminal...', '@')
        self.command = {}
        self.occupied = False
        if configs is None:
            self.logger.log('config arg is null. using default...')
            self.configs = json.load(open('config/terminal/terminal.config.all.json'))
        else:
            self.configs = configs
        self.update_command_index(configs)
        self.serial = Sport(configs)
        # initializing mqtt
        self.mqtt = MqttClient(client_id=self.configs["mqtt_client_name"])
        self.logger.log('connecting to mqtt server...')
        self.mqtt.connect(self.configs["mqtt_server_addr"], port=self.configs["mqtt_server_port"],
                          keepalive=self.configs["mqtt_keepalive"])
        # todo doing mqtt topic subscribes
        self.mqtt.subscribe('_smarthome_command_')
        self.mqttThread = Terminal.MqttThread(self.configs, terminal=self)
        self.serialThread = Terminal.SerialThread(self.configs, terminal=self)

    class MqttThread(Thread):
        def __init__(self, config, terminal, name='mqtt_thread', delay=1, configs=None):
            super(Terminal.MqttThread, self).__init__()
            self.logger = Logger(self)
            self.logger.log('Instantiating mqtt thread', '@')
            self.stopFlag = True
            self.delay = delay
            self.name = name
            self.mqtt = terminal.mqtt
            self.mqtt.on_message = self.default_on_message
            if terminal is not None:
                self.bind(terminal)

        def bind(self, terminal):
            self.logger.log('mqtt thread bind to ' + str(terminal))
            self.terminal = terminal

        def stop(self):
            self.mqtt.loop_stop()

        def default_on_message(self, client, data, message):
            if str(message.payload).startswith('command') and message.topic == self.terminal.config['command_topic']:
                self.terminal.serial_commanding(str(message.payload))

        def run(self, terminal=None):
            if terminal is not None:
                self.bind(terminal)
            # while self.terminal.occupied:
            # todo
            # pass

    class SerialThread(Thread):
        def __init__(self, config, name='serial_thread', delay=1, terminal=None, configs=None):
            super(Terminal.SerialThread, self).__init__()
            self.logger = Logger(self)
            self.logger.log('Instantiating serial thread', '@')
            self.delay = delay
            self.name = name
            self.serial = Sport(config)
            if terminal is not None:
                self.bind(terminal)

        def bind(self, terminal):
            self.logger.log('serial thread bind to ' + str(terminal))
            self.terminal = terminal

        def run(self, terminal=None):
            if terminal is not None:
                self.bind(terminal)
            # todo finish this threading
            serial = self.terminal.serial
            mqtt = self.terminal.mqtt
            while self.terminal.occupied:
                line = serial.readline()
                # todo split values
                variables = line.split(',')
                for var in variables:
                    key = var.split('=')[0]
                    value = var.split('=')[1]
                    mqtt.publish(topic=key, payload=value)
                    # check if it works

    def run_in_thread(self):
        if self.mqttThread is None or self.serialThread is None:
            raise Exception('mqtt thread or serial thread not initialized.')
            pass
        self.logger.gap().banner().log("Terminal started to work.", '$')
        self.occupied = True
        self.mqttThread.setDaemon(True)
        self.mqttThread.start()
        self.serialThread.setDaemon(True)
        self.serialThread.start()

    def update_command_index(self, configs):
        # do not clean, force update
        for key, value in configs.items():
            if key.startswith("command"):
                self.command[key] = value
        self.logger.log("Terminal command line index updated.", '$')

    def write_to_serial_anyway(self, command='?'):
        self.serial.write(command)
        self.logger.log('serial command called: ' + command, '$')

    def serial_commanding(self, command='?'):
        if self.command.get(command, default=None) is not None:
            self.serial.write(self.command[command])
            self.logger.log('serial command called: ' + command, '$')
        else:
            self.logger.log('serial command \"' + command + '\" not found.', '×')

    def open_the_door(self):
        self.serial.write(self.command["command_open_door"])

    def open_the_willow(self):
        self.serial.write(self.command['command_open_willow'])

    def light_up(self):
        self.serial.write(self.command["command_light_up"])

    # def light_off(self):
    #     self.serial.write(self.command["command_light_off"])
