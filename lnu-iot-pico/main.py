import utime
from machine import Timer
from network_setup import wifi_setup
from sensor_setup import setup_sensors
from twilio_sms import send_sms
import urequests

# Wifi
wifi = wifi_setup("xxx", "xxx")
sensor, led, red_led, button_pin, photoRes = setup_sensors()
# define the server URL and the headers (including the bearer token)
url_homedata = 'http://localhost/api/homedata/add'
headers_homedata = {
    'Content-Type': 'application/json',
    # 'Authorization': 'Bearer <your_token>'  # replace <your_token> with your actual token
}
# Twilio API endpoint
url = "https://api.twilio.com/2010-04-01/Accounts/xxx/Messages.json"

# Account SID and Auth Token
username = "xxx"
password = "xxx"
button_timer = Timer()

attention = False

def button(t):
    if button_pin.value() == 0:
        print("Button Pressed")
        red_led.value(1)
        print(send_sms(url, username, password, 'Test'))
        red_led.value(0)


button_timer.init(period=500, mode=Timer.PERIODIC, callback=button)

# main loop to read sensor and send data
while True:
    led.on()  # Set led turn on
    utime.sleep(0.5)
    led.off()  # Set led turn off
    utime.sleep(0.5)

    try:

        temp = sensor.temperature
        humidity = sensor.humidity
        print("Temperature: {}°C   Humidity: {:.0f}% ".format(temp, humidity))

        light = photoRes.read_u16()
        light = round(light / 65535 * 100, 2)
        print("Light: " + str(light) + "%")

        # define the data to send
        data_homedata = '{"temperature": ' + str(temp) + ', "humidity": ' + str(humidity) + ', "light": ' + str(
            light) + '}'

        if (temp > 30 or temp < 10) and temp < 90:
            if not attention:
                print(send_sms(url, username, password, temp))
                attention = True
        elif attention:
            print(send_sms(url, username, password, temp))
            attention = False

        # send the request
        response = urequests.post(url_homedata, headers=headers_homedata, data=data_homedata)

        # print the response
        print(response.text)
        response.close()


    except:
        pass

    utime.sleep(10)
