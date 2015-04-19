#!/usr/bin/env python

import os
import sys
from PIL import Image

def resize(folder, fileName, factor, count):
    filePath = os.path.join(folder, fileName)
    im = Image.open(filePath)
    w, h  = im.size
    newIm = im.resize((int(w*factor), int(h*factor)))
    # i am saving a copy, you can overrider orginal, or save to other folder
    newIm.save(folder+str(count)+".jpg")

def bulkResize(imageFolder, factor):
    imgExts = ["png", "bmp", "jpg"]
    count = 0
    for path, dirs, files in os.walk(imageFolder):
        for fileName in files:
            ext = fileName[-3:].lower()
            if ext not in imgExts:
                continue
            count = count+1
            resize(path, fileName, factor, count)

if __name__ == "__main__":
    imageFolder=sys.argv[1] # first arg is path to image folder
    resizeFactor=float(sys.argv[2])/100.0# 2nd is resize in %
    bulkResize(imageFolder, resizeFactor)
