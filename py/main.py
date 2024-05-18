import time
from DFRobot_PAJ7620U2 import *

paj = DFRobot_PAJ7620U2(bus=1);
time.sleep(0.1);

while(paj.begin() != 0):
    time.sleep(0.5);
	
paj.set_gesture_highrate(True);

def main():
  while True:
    gesture = paj.get_gesture()
    if gesture != paj.GESTURE_NONE:
      print(gesture, flush=True);

if __name__ == "__main__":
    main();
