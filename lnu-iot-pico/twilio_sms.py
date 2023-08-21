import urequests
import ujson
import ubinascii

def send_sms(url, username, password, counter):
    credentials = ubinascii.b2a_base64('{0}:{1}'.format(username, password)).strip()
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic {0}'.format(credentials.decode('utf-8'))
    }
    data = {
        'Body': 'Warning! Temperature: ' + str(counter),
        'From': '+12178338076',
        'To': '+46760742820',
    }
    data = '&'.join('{0}={1}'.format(key, ujson.dumps(val)) for key, val in data.items())
    response = urequests.post(url, headers=headers, data=data)

    return response.text
