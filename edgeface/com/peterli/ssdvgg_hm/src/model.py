#!/usr/bin/python
# -*- coding: UTF-8 -*-
import cv2
import numpy as np
import paddlemobile as pm
from com.visualdust.utils.logger import Logger

__all__ = ['PaddleMobile']


class PaddleMobile:
    def __init__(self, configs):
        self.logger = Logger(self)
        self.logger.log('Instantiating ssd-vgg model using existing config...', '@')
        """
        Loading model: initializing input tensor
        """
        self.image_width = configs['input_width']
        self.image_height = configs['input_height']
        # self.mean = np.array(configs['mean'])[np.newaxis, np.newaxis, :]
        self.mean = np.array(configs['mean']).reshape((3, 1, 1))
        # self.std = np.array(configs['std'])[np.newaxis, np.newaxis, :]
        self.std = np.array(configs['std']).reshape((3, 1, 1))
        self.threshold = configs['threshold']
        self.label_names = configs['label']
        self.colors = self.get_colors(self.label_names)

        self.predictor = self.load_model(configs['model_dir'], configs['param_dir'], configs['thread_num'])
        self.tensor = self.init_tensor((1, 3, self.image_width, self.image_height))
        self.logger.log('Model successfully loaded.', '√')

    def load_model(self, model_dir, param_dir, thread_num):
        """
        Loading paddlePaddle model
        """
        self.logger.log('Loading PaddlePaddle model...', '@')
        pm_config = pm.PaddleMobileConfig()
        pm_config.precision = pm.PaddleMobileConfig.Precision.FP32
        pm_config.device = pm.PaddleMobileConfig.Device.kFPGA

        pm_config.prog_file = model_dir
        pm_config.param_file = param_dir
        pm_config.thread_num = thread_num
        predictor = pm.CreatePaddlePredictor(pm_config)
        """
        returns predictor
        """
        return predictor

    def init_tensor(self, data_shape):
        """
        Initializing paddle model input tensor
        """
        self.logger.log('Loading PaddleTensor model...', '@')
        tensor = pm.PaddleTensor()
        tensor.dtype = pm.PaddleDType.FLOAT32
        tensor.shape = data_shape
        return tensor

    def preprocess_image(self, image):
        """
        image preprocessing of cv2 captures
        """
        # resizing
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (self.image_width, self.image_height), cv2.INTER_CUBIC)
        # to float32
        image = np.array(image).astype(np.float32)
        image = np.transpose(image, (2, 0, 1))
        image -= self.mean
        image *= self.std
        image = np.transpose(image, (1, 2, 0))
        return image

    def predict(self, image):
        """
        PaddleMobile model prediction
        """
        self.logger.log("calling up predictor...")
        image = self.preprocess_image(image)

        self.tensor.data = pm.PaddleBuf(image)
        paddle_data_feeds = [self.tensor]
        outputs = self.predictor.Run(paddle_data_feeds)
        result = np.array(outputs[0])
        height, width, _ = image.shape
        boxes = self.convert_predict_result(result, height, width)
        return boxes

    def convert_predict_result(self, result, height, width):
        """
        Converting model prediction result of the target data
        returns the list of the prediction data (converted): [index, conferences, mid-coordination left-up, right-down]
        """
        boxes = []
        for box in result:
            if box[1] > self.threshold:
                x_min = int(box[2] * width)
                y_min = int(box[3] * height)
                x_max = int(box[4] * width)
                y_max = int(box[5] * height)
                x_min = (x_min if (x_min > 0) else 0)
                y_min = (y_min if (y_min > 0) else 0)
                x_max = (x_max if (x_max > 0) else 0)
                y_max = (y_max if (y_max > 0) else 0)
                center = (int((x_min + x_max) / 2), int((y_min + y_max) / 2))
                boxes.append([int(box[0]), float(format(box[1], '.2f')), center, (x_min, y_min), (x_max, y_max)])
        return boxes

    def get_colors(self, class_names):
        # import colorsys
        # Generate colors for drawing bounding boxes.
        # hsv_tuples = [(x / len(class_names), 1., 1.)
        #               for x in range(len(class_names))]
        # colors = list(map(lambda x: colorsys.hsv_to_rgb(*x), hsv_tuples))
        # colors = list(
        # map(lambda x: (int(x[0] * 255), int(x[1] * 255), int(x[2] * 255)),
        #     colors))
        colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]]
        return colors
