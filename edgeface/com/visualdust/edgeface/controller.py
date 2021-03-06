# -*- coding: UTF-8 -*
from com.peterli.ssdvgg_hm.src.uitl import print_results, draw_results
from com.visualdust.edgeface.baidu_facesearch import BaiduFaceSearch
from com.visualdust.edgeface.opencv_cap import CV2Agent
from com.visualdust.utils.logger import Logger
from time import sleep as delay
import time
from os import system as system_call
import cv2


class Controller:
    def __init__(self, terminal, video_thread=None, cv_auth=None, model=None, extra_config={}):
        self.logger = Logger(self)
        self.logger.log('Instantiating controller...', '@')
        self.terminal = None
        self.video_thread = video_thread
        self.cv_auth = cv_auth
        self.config = extra_config
        self.model = model
        self.face_search = BaiduFaceSearch()
        if video_thread is not None:
            video_thread.start()

    def do_online_auth(self, file_path=''):
        # taking shortcut
        # system_call(self.config['capture_api_command'])
        # delay(3)
        response_dict = self.face_search.request_face_search_path(file_path)
        print(response_dict)
        # resolving predicted result
        # self.logr.log('response : ' + str(response_dict['error_msg']), '!')
        result = response_dict['error_msg'] == 'SUCCESS'
        return result, response_dict

    def wait_for_auth(self, sleep=-1):
        self.logger.log('Started to wait for video thread auth')
        while not self.terminal.occupied:  # if the room was not occupied
            # doing sleep
            if sleep != -1:
                delay(sleep)
            frame_read = self.video_thread.get_image()
            if frame_read is None:
                print("Video capture failed")
                return False
            # predicting
            self.logger.log('Frame read. Predicting...')
            boxes = self.model.predict(frame_read)
            print_results(boxes, self.model.label_names, False)
            self.logger.log('predictor said : ' + str(boxes))
            for box in boxes:  # verification success, doing post process
                predicted_class = self.model.label_names[box[0]]
                # todo add cv.write to local
                if box == "person":
                    if self.do_online_auth('image_0.jpg'):
                        # occupied !
                        self.terminal.occupied = True
                        # stop the video capturing procedure
                        self.video_thread.stop()

            draw_results(frame_read, boxes, self.model.colors, self.model.label_names, False)
            # serial_thread.set_data(boxes)
        # occupied
        self.terminal.run_in_thread()
        # time delay ?

    def wait_for_auth_cv2(self, sleep=-1):
        self.logger.log('Started to wait for cv agent auth')
        delay(sleep)
        while True:  # if the room was not occupied
            # doing sleep
            if sleep != -1:
                delay(sleep)
            faces, frame = self.cv_auth.detect_face()
            target_num = len(faces)
            if target_num > 0:
                # self.cv_auth.release_device()
                cv2.imwrite("image_0.jpg", frame)
                result, response = self.do_online_auth('image_0.jpg')
                if result:
                    break
        print("jdfgjhkfsgudshfcgudshfcudsvcgdfs")

    def start(self):
        if self.video_thread is not None:
            self.wait_for_auth(1)
        elif self.cv_auth is not None:
            self.wait_for_auth_cv2(1)
        else:
            self.logger.log("Both video thread and cv_auth was missing. Passing procedure.")

    def run_here(self):
        if self.video_thread is not None:
            self.wait_for_auth(1)
        elif self.cv_auth is not None:
            self.wait_for_auth_cv2(1)
        else:
            self.logger.log("Both video thread and cv_auth was missing. Passing procedure.")