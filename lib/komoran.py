# -*- coding: utf-8 -*-

from konlpy.tag import Kkma
from konlpy.utils import pprint
kkma = Kkma()

import sys
import io

from konlpy.tag import Kkma
from konlpy.utils import pprint
kkma = Kkma()



reload(sys)
sys.setdefaultencoding('UTF8')
print 'Argument List:', str(sys.argv)
print sys.stdin.encoding, sys.stdout.encoding


while 1:
    try:
        line = sys.stdin.readline()
    except KeyboardInterrupt:
        break

    if not line:
        break

    print line
