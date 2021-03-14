import requests
text = requests.get('https://www.err.ee/uudised').text

print(text)