def print_txt(file):
    str = ''
    for line in file.readlines():
        str += line
    print(str)