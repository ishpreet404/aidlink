# AidLink: Radio Location Beacon with Live Map Display

**AidLink** is an innovative communication beacon designed for emergency and disaster scenarios, where traditional communication networks often fail. It uses LoRa technology and Morse code transmission to reliably send GPS coordinates and personal details of individuals in distress, ensuring their visibility to rescue teams. The live web interface enhances rescue coordination by displaying real-time data on a dynamic map.

---

## 🌐 Website Overview

The AidLink web interface displays **live GPS data** transmitted from the Arduino-based beacon device. Data is updated every 2 seconds and presented both as raw JSON and on a **real-time map** (e.g., using Leaflet or Google Maps).

### Features:
- Real-time updates from `arduino_data.json`
- Complete log of all received data
- Integration-ready for map visualization of location data

---

## 📡 Device Overview

### Key Components:
- **Arduino Nano** – Core microcontroller
- **NEO-6M GPS Module** – Retrieves current coordinates
- **SX1278 LoRa Module** – Transmits data over long ranges
- **Morse Encoder** – Converts GPS data to Morse code for redundancy
- **SOS Button** – Activates continuous emergency transmission
- **Rechargeable Battery** – Ensures long-lasting power supply
- **Durable Enclosure** – Weather-resistant casing for field use

---

## 🧠 How It Works

1. **SOS Activation**: User presses the SOS button.
2. **Data Gathering**: Location and personal info is collected.
3. **LoRa Transmission**: Data is broadcast via the LoRa module.
4. **Morse Encoding**: Simultaneously sent via handy radio in Morse code.
5. **Live Web Display**: GPS data received and visualized on the website.

---

## 🔥 Advantages

- Works **without cellular networks**
- **Dual-channel transmission** (LoRa + Morse code)
- **Energy-efficient** for extended use
- Lightweight and **portable**
- Easily **triggered by one button**
- Customizable personal data transmission

---

## 📈 Future Enhancements

- Add two-way communication
- Integrate waterproof/rugged casing
- Include environmental sensors
- Expand with satellite-based communication
- Mobile app for monitoring & control

---

## 🧪 How to Run Locally

1. Place `index.html` and `arduino_data.json` in the same folder.
2. Start a simple web server (e.g. using Python):
   ```bash
   python -m http.server
