# encoding=utf-8\

"""
        !!! Attention !!!
        as you can see, @VisualDust is a pure stupid java developer
        His useless code looks just like java
"""

# and obviously he thought the package name of "json" is not long enough (doge)
import json as Id_like_to_make_the_package_name_of_json_long_enough
from com.visualdust.edgeface.terminal import Terminal
from com.visualdust.edgeface.controller import Controller
from com.visualdust.edgeface.opencv_cap import CV2Agent 
from com.visualdust.utils.logger import Logger
from com.visualdust.utils import util

if __name__ == '__main__':
    logger = Logger('Launcher')
    logger.print_os_info().banner()
    util.print_txt(open('com/visualdust/res/banner.txt'))
    logger.banner().log('loading configuration...')
    # load configuration
    global_config = Id_like_to_make_the_package_name_of_json_long_enough.load(open('./config/global/config.json'))
    logger.log('parsing arguments...')
    # args = parse_args()
    logger.log('loading mqtt and serial configuration...')
    terminal_config = Id_like_to_make_the_package_name_of_json_long_enough.load(open('./config/terminal/terminal.config.all.json'))
    # initializing terminal
    terminal = None
    # using paddle mobile
    # Attention: use ssd-vgg and cv2 do not work together. Activate only one of them at one time.
    video_path = global_config['camera']

    """
    !!! Attention !!!!
    PaddlePaddle and paddle mobile model and prediction works below:
    """
    # hm_model = PaddleMobile(global_config)
    # video_thread = VideoThread(global_config["camera"], global_config["input_width"], global_config["input_height"],
    #                           buffer_size=global_config['camera_buffer_size'], name=global_config["camera"])
    # Here is an example using cv2
    cv_agent = CV2Agent(video_device=0)
    # controller = Controller(terminal=terminal, video_thread=video_thread, model=hm_model, extra_config=global_config)
    controller = Controller(terminal=terminal, cv_auth=cv_agent, model=None, extra_config=global_config)
    controller.run_here()
    logger.log('Launching procedure succeed.', '√').banner().gap()

