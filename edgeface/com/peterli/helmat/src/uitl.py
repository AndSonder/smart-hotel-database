#!/usr/bin/python
# -*- coding: UTF-8 -*-
import cv2
import argparse

__all__ = ['load_image', 'parse_args', 'draw_results', 'print_results']


def load_image(path):
    image = cv2.imread(path, cv2.IMREAD_COLOR)
    return image


def parse_args():
    parser = argparse.ArgumentParser(description='比赛模式读取摄像头视频；反之跑图片识别。')
    parser.add_argument('-g', '--game_mode',
                        help='比赛模式Flag',
                        action="store_true")
    parser.add_argument('-s', '--save_video',
                        help='保存视频Flag',
                        action="store_true")
    return parser.parse_args()


def draw_results(image, boxes, colors, class_names, image_mode=False):
    for box in boxes:
        predicted_class = class_names[box[0]]
        label = '{} {:.2f}'.format(predicted_class, box[1])
        cv2.putText(image, label, (box[3][0], box[3][1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, colors[box[0]], 1)
        cv2.rectangle(image, box[3], box[4], colors[box[0]], 3)
    if image_mode:
        cv2.imwrite('result.jpg', image)


def print_results(boxes, class_names, init_flag):
    if init_flag:
        print('类别\t置信度\t中点坐标\t左上坐标\t右下坐标\t')
    for box in boxes:
        print('{}\t{}\t{}\t{}\t{}'.format(class_names[box[0]], box[1], box[2], box[3], box[4]))
    print('\n')
