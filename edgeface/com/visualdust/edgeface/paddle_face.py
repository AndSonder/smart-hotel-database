# -*- coding: UTF-8 -*
import cv2
import paddlehub as hub
import os
import dlib
import numpy as np
import paddle

print(paddle.fluid.install_check.run_check() ,hub.server_check())

class FaceController:
    """
    人脸识别控制类
    """

    def __init__(self):
        self.module = hub.Module(name="pyramidbox_lite_mobile")
        self.tools = Tools()
        self.current_path = os.getcwd()
        self.predictor_path = self.current_path + "\\model\\shape_predictor_68_face_landmarks.dat"
        self.face_rec_model_path = self.current_path + "\\model\\dlib_face_recognition_resnet_model_v1.dat"
        self.shape_predictor = dlib.shape_predictor(self.predictor_path)
        self.face_rec_model = dlib.face_recognition_model_v1(self.face_rec_model_path)

    # 人脸坐标检测
    def face_recognition(self, img):
        # img: cv2从视频流读取到的图片
        input_dict = {"data": [img]}
        results = self.module.face_detection(data=input_dict)[0]
        return results

    # 获取人脸数量
    def get_face_nums(self, result):
        # result: 人脸框信息
        return len(result['data'])

    # 提取人脸特征
    def extract_face_info(self, img, result):
        # img: cv2从视频流读取到的图片
        b, g, r = cv2.split(img)
        img = cv2.merge([r, g, b])
        bottom, left, right, top = self.tools.get_rectangle(result['data'][0])
        # left: int, top: int, right: int, bottom: int
        face = dlib.rectangle(int(left), int(top), int(right), int(bottom))
        # 提取人脸特征
        shape = self.shape_predictor(img, face)
        face_descriptor = self.face_rec_model.compute_face_descriptor(img, shape)
        # 转化人脸信息格式
        vectors = self.__turn_feature(face_descriptor)
        return vectors

    def __turn_feature(self, face_descriptor):
        vectors = np.array([])
        for i, num in enumerate(face_descriptor):
            vectors = np.append(vectors, num)
        return vectors

    # 保存人脸特征信息
    def save_face_info(self, face_descriptor, path):
        """
        保存人脸特征信息
        :param face_descriptor:人脸特征信息
        :param path: 保存地址
        """
        np.save(path, face_descriptor)

    # 加载人脸特征信息
    def load_face_info(self, path):
        vectors = np.load(path)
        return vectors

    # 人脸特征比对
    def compare_face_info(self, x, y):
        return np.sqrt(np.sum(np.square(x - y)))


class Tools:

    # 绘制人脸框
    def draw_rectangle(self, img, result):
        for face in result['data']:
            # 获得上下左右的矩形框坐标
            bottom, left, right, top = self.get_rectangle(face)
            color = (0, 255, 0)
            # 绘制人脸框
            cv2.rectangle(img, (int(left), int(top)), (int(right), int(bottom)), color, 1)
        return img

    @staticmethod
    def get_rectangle(face):
        left = float(face['left'])
        right = float(face['right'])
        bottom = float(face['bottom'])
        top = float(face['top'])
        return bottom, left, right, top

    @staticmethod
    def minkowski_dis(x, y, p):
        sum_value = sum(pow(abs(a - b), p) for a, b in zip(x, y))
        cover = 1 / float(p)
        return round(sum_value ** cover, 3)

    @staticmethod
    def jaccard_similarity(x, y):
        intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
        union_cardinality = len(set.union(*[set(x), set(y)]))
        return intersection_cardinality / float(union_cardinality)


class FaceReconginitionContorl:
    def __init__(self):
        self.face_control = FaceController()
        self.tools = Tools()
        self.result = None
        self.message = 'No Person Here'

    # 更新人脸信息
    def __update_result(self, img):
        self.result = self.face_control.face_recognition(img)

    # 获取人脸数量
    def get_face_num(self, img):
        self.__update_result(img)
        return face_control.get_face_nums(self.result)

    # 注册人脸信息
    def register_face_information(self, img, filepath):
        """
        注册人脸信息
        :param img: cv2 图片流
        :param filepath: 保存路径
        :return: code
        """
        # 人脸数目判断
        face_number = self.get_face_num(img)
        if face_number != 1:
            print(face_number)
            return 102
        # 特征提取
        feature = self.face_control.extract_face_info(img, self.result)
        # 保存特征文件
        self.face_control.save_face_info(feature, filepath)
        return 101

    def open_the_door_by_face(self, img, filepath):
        """
        通过面部开门
        :param img:图片
        :param filepath:特征地址
        """
        # 人脸数目判断
        face_num = self.get_face_num(img)
        if face_num != 1:
            return 102
        # 分别从文件中和现在的图片信息中提取人脸特征
        feature1 = self.face_control.load_face_info(filepath)
        feature2 = self.face_control.extract_face_info(img, self.result)
        diff = self.face_control.compare_face_info(feature1, feature2)
        if diff < 0.4:
            return 105
        else:
            return 107


if __name__ == '__main__':
    # detct_video()
    face_control = FaceController()
    tools = Tools()
    # img = cv2.imread('a','faces/1.jpg')
    # data1 = face_control.load_face_info('data/jobs.npy')
    # data2 = face_control.load_face_info('data/temp.npy')
    # data3 = face_control.load_face_info('data/lc.npy')
    cap = cv2.VideoCapture(0)
    print(1)
    while 1:
        cat, frame = cap.read()
        cv2.imshow('a', frame)
        result = face_control.face_recognition(frame)
        print(result)
        if result['data'] is not None:
            # data = face_control.extract_face_info(frame, result)
            # drr = face_control.compare_face_info(data, data2)
            frame = tools.draw_rectangle(frame, result)
            # print(drr)
        cv2.imshow('a', frame)
        cv2.waitKey(1)
