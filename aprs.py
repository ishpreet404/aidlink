import aprslib
import os
from dotenv import load_dotenv

load_dotenv(".env")

callsign = os.getenv("CALLSIGN") 
password = os.getenv("PASSWORD")

# Use a reliable public APRS-IS server
ais = aprslib.IS(callsign, passwd=password, host="rotate.aprs2.net", port=14580)
ais.connect()

# Convert decimal coordinates to APRS format
lat_str = f"{int(28.749335):02d}{(28.749335 % 1) * 60:05.2f}N"
lon_str = f"{int(77.117010):03d}{(77.117010 % 1) * 60:05.2f}E"

# Position with symbol (- is for house)
position = f"{lat_str}/{lon_str}-"

# Send packet
packet = f"{callsign}>APRS,TCPIP*:={position}Test from Python script"
ais.sendall(packet)

print("📡 Location sent to APRS-IS!")