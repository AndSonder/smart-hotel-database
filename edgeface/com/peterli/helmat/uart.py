# # uartdemo.py
# from serial import Serial
# import sys
# import time

# try:
# 	uartport = "/dev/ttyPS1"
# 	bps = 9600
# 	timeout = 10
	
# 	serial = Serial(uartport,bps,timeout=timeout)
# 	# result = serial.write(sys.argv[1])


# 	for i in range(10):
# 		result = serial.write("HelloWorld")
# 		time.sleep(0.5)
# 	print(result)                        
# 	serial.close()

# except Exception as e:
# 	print("----error-----",e)


# uartdemo.py
from serial import Serial

import sys
import time

try:
	uartport = "/dev/ttyPS1"
	bps = 9600
	timeout = 10
	
	uar_serial = Serial(uartport,bps,timeout=timeout)
	# result = serial.write(sys.argv[1])
	result = uar_serial.write("HelloWorld")

	# for i in range(10):
	# 	result = uar_serial.write("HelloWorld")
	# 	time.sleep(0.5)
	print(result)                        
	uar_serial.close()

except Exception as e:
	print("----error-----",e)
