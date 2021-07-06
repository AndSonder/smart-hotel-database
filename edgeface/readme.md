# are U reading me?  
@Author `VisualDust aka MiyaAkasaki`  
@Email `Miya@Akasaki.space`  

---

## Hello

Im a team member of this project.  
My work is to make sure that the code deployed on edgeboard and server works well.  
Before python, Im a java/kotlin/c# dev and my code style in python looks pretty bad.  
Hope you can endure my ugly jython(x)...  

---

## Introduction
Watch the video named 作品介绍视频.mp4 at [Bilibili](https://www.bilibili.com/video/BV1fC4y1b7Xq?from=search&seid=5402229910812676074) and roughly have a overview.  

---

Four parts in this folder:  

* Code running on the edgeboard and server  
* Model trained by BAIDU ai studio (x, removed, too big)  
* Environment necessaries for the edgeboard  
* Project introduction video and slideshows  

## Structure

```none
./
├── com
│   ├── __init__.py
│   ├── __pycache__
│   │   └── __init__.cpython-37.pyc
│   ├── baidu
│   │   ├── __init__.py
│   │   ├── bin
│   │   │   ├── __init__.py
│   │   │   └── v4l2demo
│   │   └── sdk
│   │       ├── LICENSE
│   │       ├── __init__.py
│   │       ├── aip
│   │       │   ├── __init__.py
│   │       │   ├── base.py
│   │       │   ├── bodyanalysis.py
│   │       │   ├── easydl.py
│   │       │   ├── face.py
│   │       │   ├── imagecensor.py
│   │       │   ├── imageclassify.py
│   │       │   ├── imageprocess.py
│   │       │   ├── imagesearch.py
│   │       │   ├── kg.py
│   │       │   ├── nlp.py
│   │       │   ├── ocr.py
│   │       │   └── speech.py
│   │       ├── bin
│   │       │   └── aip_client
│   │       └── setup.py
│   ├── peterli
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   └── __init__.cpython-37.pyc
│   │   └── ssdvgg_hm
│   │       ├── __init__.py
│   │       ├── __pycache__
│   │       │   └── __init__.cpython-37.pyc
│   │       ├── data
│   │       │   ├── model
│   │       │   ├── params
│   │       │   ├── person.jpg
│   │       │   ├── ssd-vgg
│   │       │   │   └── model
│   │       │   └── test.png
│   │       ├── result.jpg
│   │       ├── save_video.avi
│   │       ├── src
│   │       │   ├── __init__.py
│   │       │   ├── __pycache__
│   │       │   │   ├── __init__.cpython-37.pyc
│   │       │   │   └── model.cpython-37.pyc
│   │       │   ├── _serial.py
│   │       │   ├── model.py
│   │       │   ├── uitl.py
│   │       │   └── video.py
│   │       ├── test.py
│   │       └── uart.py
│   └── visualdust
│       ├── __init__.py
│       ├── edgeface
│       │   ├── __init__.py
│       │   ├── baidu_facesearch.py
│       │   ├── controller.py
│       │   ├── opencv_cap.py
│       │   ├── paddle_face.py
│       │   ├── sport.py
│       │   └── terminal.py
│       ├── facelib_local
│       │   └── __init__.py
│       ├── res
│       │   ├── __init__.py
│       │   ├── banner.txt
│       │   └── test.py
│       └── utils
│           ├── __init__.py
│           ├── logger.py
│           └── util.py
├── config
│   ├── __init__.py
│   ├── baidu
│   │   └── api.facesearch.config.json
│   ├── cvlib
│   │   ├── cv2.config.json
│   │   ├── front_face_default.xml
│   │   ├── haarcascade_eye.xml
│   │   ├── haarcascade_fullbody.xml
│   │   └── haarcascade_smile.xml
│   ├── device
│   │   └── camera.config.json
│   ├── global
│   │   └── config.json
│   └── terminal
│       └── terminal.config.all.json
├── main.py
└── readme.md

```

---

## Discription

> IT IS NOT EASY to immediately run those code. Better not to run them. Or spend a lot of time to
configure and after they are properly configured, you can run them.

`Running specific code on the edgeboard` is not an easy task. The technical documentation of edgeboard is not designed very well, I spent a lot of time referencing each other between different documents. If you want to run those code, you need to:  

* Set up the specific environment on edgeboared
* Make sure there is a wireless network availiable for edgeboard
* Send me an email asking for the password to access the server api
* You may have abundant problems and run into many issues when first running the code. Have a good trip.
* After your first run, the code works well after that.

`Running specific code on the server side` immediately is impossible since we could not provide you our backend database username and password, nor those other api and secrets on the public network. Just check them. Many thanks.

---

## ~~Model~~

~~In the Model folder you can find all the model alias used in the project. Using paddlepaddle, via BAIDU ai studio.~~

---

## ~~edgeboard_environment~~

~~In the edgeboard_environment folder there is some necessaries dependencies for edgeboard runtime.~~
