import network
import utime

def wifi_setup(ssid, password):
    wifi = network.WLAN(network.STA_IF)
    wifi.active(True)
    wifi.connect(ssid, password)

    while not wifi.isconnected():
        utime.sleep(1)

    print('Connection successful')
    print(wifi.ifconfig())

    return wifi
