import json
import cv2
from time import sleep as delay
import os
import matplotlib.pyplot as plt
from com.visualdust.utils.logger import Logger

font = cv2.FONT_HERSHEY_SIMPLEX

# delegation for opencv face detection
class CV2Agent:
    def __init__(self, video_device=2, config=None):
        self.logger = Logger(self)
        self.config = config
        if config is None:
            self.logger.log('config arg is None. using default...')
            self.config = json.load(open('config/device/camera.config.json'))
            video_device_index = video_device
        else:
            video_device_index = self.config['device_index']
        self.device = cv2.VideoCapture(video_device_index)
        # self.device.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        # self.device.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.device.set(3, self.config['capture_width'])
        self.device.set(4, self.config['capture_height'])
        self.classifier = cv2.CascadeClassifier(self.config['face_cascade_file'])

    def detect_face(self):
        frame = None
        while frame is None:
            ret, frame = self.device.read()
            delay(1)
        # self.logger.log("size of frame: " + str(frame), "!")
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.classifier.detectMultiScale(frame, scaleFactor=1.3, minNeighbors=3)
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 3)
            roi_gray = gray[y:y + h, x:x + w]
            roi_color = frame[y:y + h, x:x + w]
            cv2.putText(frame, 'Face', (x, y), font, 2, (255, 0, 0), 5)
        cv2.putText(frame, 'Number of Faces : ' + str(len(faces)), (40, 40), font, 1, (255, 0, 0), 2)
        # Display the resulting frame
        # self.cv2_imshow(frame)
        return faces, frame

    def read_target_num(self):
        faces, frame = self.detect_face()
        return len(faces)

    def release_device(self):
        self.device.release()

    def cv2_imshow(self, frame):
        plt.imshow(frame)
        plt.pause(0.02)
        # plt.show()
