from bs4 import BeautifulSoup
import requests
import datetime
import os

path = os.path.dirname(os.path.abspath(__file__))
newsDataPath = os.path.join(path, 'newsdata.txt')
removingTime = 60 * 60 * 24 #one day in seconds
i=0
headlines=[]
links=[]
summaries=[]
dates=[]
#Read the previous file to memory
f = open(newsDataPath, 'r', encoding='utf8')
lines = f.readlines()
for line in lines:
    if i%5 == 0:
        headlines.append(line.strip())
    if i%5 == 1:
        links.append(line.strip())
    if i%5 == 2:
        summaries.append(line.strip())
    if i%5 == 3:
        dates.append(datetime.datetime.fromisoformat(line.strip()))
    i=i+1
f.close()


source = requests.get('https://www.err.ee/uudised').text

soup = BeautifulSoup(source, 'lxml')

#add new articles
for h2 in soup.find_all('h2', class_='news-article'):
    if h2.find('a')['href'] not in links:
        headlines.append(h2.a.text.strip())   #.a for anchor
        links.append(h2.find('a')['href'].strip())
        summaries.append(BeautifulSoup(requests.get(h2.find('a')['href']).text, 'lxml').find('div', class_='lead').text.strip())
        dates.append(datetime.datetime.utcnow())


#write all articles to file
f = open(newsDataPath, 'w', encoding='utf8')
print(datetime.datetime.utcnow().isoformat())
for i in range(len(links)):
    if (datetime.datetime.utcnow() - dates[i]).total_seconds() > removingTime:
        continue # skips writing and therefore does not write old news
    print((datetime.datetime.utcnow() - dates[i]).total_seconds())
    f.write(headlines[i] + "\n")
    f.write(links[i] + "\n")
    f.write(summaries[i] + "\n")
    f.write(str(dates[i].isoformat()) + "\n")
    f.write("\n")
f.close()