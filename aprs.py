import aprslib

callsign = "VU2MZS" 
password = "19881"

# Use a reliable public APRS-IS server
ais = aprslib.IS(callsign, passwd=password, host="rotate.aprs2.net", port=14580)
ais.connect()

# Convert decimal coordinates to APRS format
lat_deg = int(28.749335)
lat_min = (28.749335 - lat_deg) * 60
lat_str = f"{lat_deg:02d}{lat_min:05.2f}N"

lon_deg = int(77.117010)
lon_min = (77.117010 - lon_deg) * 60
lon_str = f"{lon_deg:03d}{lon_min:05.2f}E"

# Position with symbol (- is for house)
position = f"{lat_str}/{lon_str}-"

# Send packet
packet = f"{callsign}>APRS,TCPIP*:={position}Test from Python script"
ais.sendall(packet)

print("📡 Location sent to APRS-IS!")