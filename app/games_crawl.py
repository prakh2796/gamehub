import requests
from bs4 import BeautifulSoup
import MySQLdb
from settings import *

db = MySQLdb.connect(DB_CONN['HOST'], DB_CONN['USERNAME'], DB_CONN['PASSWORD'], DB_CONN['DATABASE'])
cursor=db.cursor()
url = "https://en.wikipedia.org/wiki/List_of_video_games_considered_the_best"
r = requests.get(url)
soup = BeautifulSoup(r.content,"html.parser")
div = soup.find("div",{"id":"mw-content-text"})
table = div.find("table",{"class":"wikitable sortable"})
tr = table.find_all("tr")
i=0
for each_row in tr:
    td = each_row.find_all("td")
    if i==0:
        i+=1
        continue
    else:
        game_text = td[0].text
        link = td[0].find("a")
        game_link = link.get("href")
        game_link = "https://en.wikipedia.org" + game_link
        year = td[1].text
        genre = td[2].text
        number_lists = td[3].text
        game_text = game_text.encode('latin-1','replace')
        game_link = game_link.encode('latin-1','replace')
        number_lists = number_lists.encode('latin-1','replace')
        genre = genre.encode('latin-1','replace')
        year = year.encode('latin-1','replace')
        print year,' ',genre,' ',game_text,' ',game_link,' ',number_lists
        # conn = MySQLdb.connect("127.0.0.1","Shashank","password","database_name")
        # cc = conn.cursor()
        # cc.execute("insert into game (genre,year) values (%s) ",([genre.encode('latin-1','replace')],[year.encode('latin-1','replace')]))
        # conn.commit()
        # cursor.execute("INSERT INTO games (genre,year) values (%s) ",([genre.encode('latin-1','replace')],[year.encode('latin-1','replace')]))
        cursor.execute('INSERT INTO genre VALUES (DEFAULT,"{0}")'.format(genre))
        db.commit()
        cursor.execute('SELECT genre_id FROM genre ORDER BY genre_id DESC')
        entries = cursor.fetchall()
        genre_id = entries[0][0]
        cursor.execute('INSERT INTO games(game_id,game_name,genre_id,release_date,rating,game_links) VALUES (DEFAULT,"{0}","{1}","{2}","{3}","{4}")'.format(game_text,genre_id,year,number_lists,game_link))
        db.commit()
        i+=1
    
print len(tr)
