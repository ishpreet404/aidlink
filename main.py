import serial
import json
import time
from datetime import datetime

arduino = serial.Serial('COM3', 9600, timeout=1)
data_list = []

try:
    while True:
        line = arduino.readline().decode().strip()
        if line:
            print("Received:", line)

            # Create a dictionary with timestamp + data
            data = {
                "timestamp": datetime.now().isoformat(),
                "value": line
            }
            data_list.append(data)

            # Write to JSON file
            with open("arduino_data.json", "w") as json_file:
                json.dump(data_list, json_file, indent=4)

        time.sleep(1)  # Delay to prevent overloading
except KeyboardInterrupt:
    print("Stopped by user")
    arduino.close()
