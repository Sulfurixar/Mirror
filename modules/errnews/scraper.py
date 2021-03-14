from bs4 import BeautifulSoup
import requests
import datetime

i=0
headlines=[]
links=[]
summaries=[]
dates=[]
#Read the previous file to memory
f = open('newsdata.txt', 'r', encoding='utf8')
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
        dates.append(datetime.datetime.utcnow().isoformat())


#write all articles to file
f = open('newsdata.txt', 'w', encoding='utf8')
for i in range(len(links)):
    f.write(headlines[i] + "\n")
    f.write(links[i] + "\n")
    f.write(summaries[i] + "\n")
    f.write(str(dates[i]) + "\n")
    f.write("\n")
f.close()