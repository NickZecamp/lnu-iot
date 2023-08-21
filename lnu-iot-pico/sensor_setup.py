from machine import ADC, Pin
from dht import DHT11


def setup_sensors():
    dht_pin = Pin(26, Pin.OUT, Pin.PULL_DOWN)
    sensor = DHT11(dht_pin)
    led = Pin("LED", Pin.OUT)
    red_led = Pin(2, Pin.OUT)
    red_led.value(0)
    button_pin = Pin(15, Pin.IN, Pin.PULL_UP)
    photoRes = ADC(Pin(28))

    return sensor, led, red_led, button_pin, photoRes
