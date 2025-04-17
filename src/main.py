import serial
import json
import time
from datetime import datetime
import aprslib
import threading

# Load credentials from JSON file
with open("pvt.json", "r") as file:
    credentials = json.load(file)
    callsign = credentials["callsign"]
    password = credentials["password"]

# Function to handle Arduino data
def handle_arduino():
    arduino = serial.Serial('COM3', 9600, timeout=1)
    data_list = []
    try:
        while True:
            line = arduino.readline().decode(errors='ignore').strip()  # Handle decoding errors
            if line:
                print("Received:", line)

                # Create a dictionary with timestamp + data
                data = {
                    "timestamp": datetime.now().isoformat(),
                    "value": line
                }
                data_list.append(data)

                # Write to JSON file
                with open("data.json", "w") as json_file:
                    json.dump(data_list, json_file, indent=4)

            time.sleep(1)  # Delay to prevent overloading
    except KeyboardInterrupt:
        print("Arduino thread stopped by user")
        arduino.close()

# Function to handle APRS
def handle_aprs():
    # Use a reliable public APRS-IS server
    ais = aprslib.IS(callsign, passwd=password, host="rotate.aprs2.net", port=14580)
    ais.connect()

    while True:
        try:
            # Read the latest data from data.json
            with open("data.json", "r") as json_file:
                data_list = json.load(json_file)

            # Find the latest entry with coordinates
            latitude = None
            longitude = None
            for entry in reversed(data_list):  # Iterate in reverse to get the latest data
                if "Latitude" in entry["value"]:
                    coords = entry["value"].split(", ")
                    latitude = float(coords[0].split(": ")[1])
                    longitude = float(coords[1].split(": ")[1])
                    break

            if latitude is not None and longitude is not None:
                # Convert decimal coordinates to APRS format
                lat_deg = int(latitude)
                lat_min = (latitude - lat_deg) * 60
                lat_str = f"{lat_deg:02d}{lat_min:05.2f}N"

                lon_deg = int(longitude)
                lon_min = (longitude - lon_deg) * 60
                lon_str = f"{lon_deg:03d}{lon_min:05.2f}E"

                # Position with symbol (- is for house)
                position = f"{lat_str}/{lon_str}-"

                # Send packet
                packet = f"{callsign}>APRS,TCPIP*:={position}Test from Python script"
                ais.sendall(packet)

                print(f"📡 Location sent to APRS-IS! {latitude}, {longitude}")
            else:
                print("No valid coordinates found in data.json.")

        except Exception as e:
            print(f"Error in APRS thread: {e}")

        time.sleep(60)  # Send location every 60 seconds

# Create threads for Arduino and APRS
arduino_thread = threading.Thread(target=handle_arduino, daemon=True)
aprs_thread = threading.Thread(target=handle_aprs, daemon=True)

# Start the threads
arduino_thread.start()
aprs_thread.start()

# Keep the main thread alive
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Main thread stopped by user")