#!/usr/bin/python
# -*- coding: UTF-8 -*-
import cv2
import select
import v4l2capture
import time
import threading
import json
import numpy as np
import os
from com.peterli.helmat.src._serial import SerialThread
from com.peterli.helmat.src.uitl import print_results
from com.peterli.helmat.src.uitl import draw_results
from com.visualdust.utils.logger import Logger

__all__ = ['video_process']


class VideoThread(threading.Thread):
    def __init__(self, video_device, video_w, video_h, buffer_size, name):
        threading.Thread.__init__(self)
        self.logger = Logger(self)
        self.name = name
        self.loop_flag = True
        self.daemon = True
        self.video_w = video_w
        self.video_h = video_h
        # if configs is None:
        #     self.configs = json.load(open('../../../../config/device/camera.config.json'))
        # else:
        #     self.configs = configs
        self.logger.log('Instantiating video thread...', '@')
        self.video = self.video_cap(video_device, video_w, video_h, buffer_size)
        # todo why is this blocking?
        # self.frame = self.read_frame()

    def run(self):
        # 把要执行的代码写到run函数里面 线程在创建后会直接运行run函数
        while self.loop_flag:
            self.frame = self.read_frame()

    def stop(self):
        self.loop_flag = False

    def video_cap(self, video_device, video_w, video_h, buffer_size):
        '''
        启动摄像头录像
        参数：设备路径
        返回：视频流
        '''
        video = v4l2capture.Video_device(video_device)
        video.set_format(video_w, video_h)
        video.create_buffers(buffer_size)
        video.queue_all_buffers()
        video.start()
        return video

    def get_image(self):
        return self.frame

    def read_frame(self):
        '''
        读取当前视频帧
        参数：无
        返回：当前帧图像
        '''
        select.select((self.video,), (), ())
        image_data = self.video.read_and_queue()
        array = np.array(np.frombuffer(image_data, dtype=np.uint8))
        print array.shape
        frame = array.reshape(self.video_h, self.video_w, 3)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        return frame


def video_process(video_path, helmet_model, save_video_flag, configs=None):
    capture_width = 1920
    capture_height = 1080
    if configs is None:
        capture_width = configs["capture_width"]
        capture_height = configs["capture_height"]
    video_thread = VideoThread(video_path, capture_width, capture_height, 1, '视频线程')
    video_thread.start()
    serial_thread = SerialThread('串口线程')
    serial_thread.start()
    init_flag = True

    while True:
        frame_read = video_thread.get_image()

        if frame_read is None:
            print('获取视频失败！')
            break

        # if init_flag and save_video_flag:
        #     # 视频模式输出检测视频
        #     save_name = 'save_video.avi'
        #     print('保存视频到' + save_name)
        #     out_video = cv2.VideoWriter(save_name, cv2.VideoWriter_fourcc(*"MJPG"), 10.0,
        #                                 (frame_read.shape[1], frame_read.shape[0]))
        #     init_flag = False
        if init_flag:
            init_flag = False
            continue
        # [类别编号, 置信度, 中点坐标, 左上坐标, 右下坐标]
        boxes = helmet_model.predict(frame_read)
        print_results(boxes, helmet_model.label_names, init_flag)
        draw_results(frame_read, boxes, helmet_model.colors, helmet_model.label_names, False)
        serial_thread.set_data(boxes)

        # if save_video_flag:
        #     out_video.write(frame_read)
