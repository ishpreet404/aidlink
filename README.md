# AidLink: Radio Location Beacon with Live Map & APRS Integration

**AidLink** is a smart, portable communication beacon designed for emergency and disaster scenarios where traditional communication networks are unavailable. It uses LoRa technology and Morse code to transmit GPS coordinates and personal details of individuals in distress. Now integrated with **APRS.fi**, AidLink offers global tracking capabilities, ensuring maximum visibility during rescue missions.

---

## ❗ Problem

In disaster-hit or remote areas, reliable communication infrastructure is often unavailable. This severely hinders search-and-rescue efforts, as conventional tools like mobile phones and radios suffer from limited range, power inefficiency, and dependency on networks. Delayed location tracking increases risk and reduces the survival chances of individuals in distress.

---

## ✅ Solution

**AidLink** bridges this critical communication gap by offering:
- **Network-independent communication** using LoRa and Morse code
- **Real-time GPS data transmission**
- **Live map tracking** via a web interface
- **Global availability** by uploading coordinates to [APRS.fi](https://aprs.fi)
- **Energy-efficient, compact hardware** for extended emergency use

This dual-channel, redundant system ensures that distress signals are received—even in the harshest conditions—dramatically increasing the likelihood of a successful and timely rescue.

---

## 🌐 Website Overview

The AidLink web interface displays **live GPS data** transmitted from the Arduino-based beacon. Data updates every 2 seconds and is visualized on a live map.

### Features:
- Real-time updates from `arduino_data.json`
- Full log of incoming data
- Live map with marker visualization
- **APRS.fi integration** for global tracking visibility

---

## 📡 Device Overview

### Hardware Components:
- **Arduino Nano** – Core controller
- **NEO-6M GPS Module** – Provides GPS data
- **SX1278 LoRa Module** – Long-range data transmission
- **Morse Encoder** – Sends GPS as Morse code
- **SOS Button** – Activates emergency signal
- **Rechargeable Battery** – Long-lasting power source
- **Weatherproof Case** – Protects hardware in the field

---

## 🧠 How It Works

1. **Activation**: User presses the SOS button.
2. **Data Collection**: GPS coordinates and personal data are retrieved.
3. **LoRa Transmission**: Broadcast to local receivers.
4. **Morse Code Signal**: Transmitted via handy radio for redundancy.
5. **Live Display**: Host computer updates the website every 2 seconds.
6. **APRS Upload**: Location is pushed to APRS.fi for worldwide visibility.

---

## 🌍 APRS Integration

**APRS.fi** is an internet-based tracking system used by amateur radio operators to publish location data in real time.

### Steps to Integrate:
1. Register a callsign (e.g., `AID123`) at [https://aprs.fi](https://aprs.fi).
2. On your host computer, use a Python script or APRS client (e.g., `YAAC`, `Xastir`) to upload GPS data:
   - Example APRS packet:
     ```
     AID123>APRS,TCPIP*:!4859.30N/12345.00W>Emergency SOS from AidLink
     ```
3. The beacon will appear on the APRS map globally.

---

## 🔥 Advantages

- No need for cellular networks
- Long-range, energy-efficient LoRa communication
- Morse code fallback for enhanced reliability
- Easy SOS activation
- Customizable transmitted data (Name, Age, Team, Address)
- Global availability through APRS

---

## 📈 Future Enhancements

- Two-way response communication
- Waterproof & rugged design upgrades
- Integration of environmental sensors
- Satellite fallback for APRS
- Mobile app support

---


## 🧪 How to Run Locally

1. Place `main.py` and `arduino_data.json` in the same folder.
2. Start a python script and vite server:
   ```bash
   npm i 
   py main.py
   npm run dev


## Screenshots (Dashboard)
<img width="1420" alt="Screenshot 2025-04-17 at 3 05 40 PM" src="https://github.com/user-attachments/assets/7b66cd8a-3c7c-41ca-960f-5a9b47e59558" />
![image](https://github.com/user-attachments/assets/a8688906-9d3d-415b-8faa-5511233eada7)

![image](https://github.com/user-attachments/assets/7f53f7b4-4303-41bc-b77b-a7f7def3a3a5)

![image](https://github.com/user-attachments/assets/4fdaf5b0-61e9-4410-aae2-171eafeee35c)

![WhatsApp Image 2025-04-18 at 09 29 48_a5750604](https://github.com/user-attachments/assets/02bc2833-00b3-4607-8668-0d147cb7affa)

![WhatsApp Image 2025-04-18 at 09 31 46_f479fc74](https://github.com/user-attachments/assets/5e85fa98-e548-487b-92ca-d1c66abf16a3)

