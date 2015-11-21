

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
import json
import MySQLdb
import MySQLdb.cursors
from settings import *

# create our little application :)
app = Flask(__name__)
app.secret_key = 'yghghghgfhfhgfbgfbgfbgfbgf'


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    """Initializes the database."""
    db = MySQLdb.connect(DB_CONN['HOST'], DB_CONN['USERNAME'], DB_CONN['PASSWORD'], DB_CONN['DATABASE'])
    return db, db.cursor()


# @app.route('/<name>', methods=['GET'])
# def show_entries(name):
#     db, cursor = get_db()
#     print name
#     name1=name[:-6]
#     # cur = db.execute('select title, text from entries order by id desc')
#     cursor.execute('SELECT `{0}_id`,age,descp FROM `{1}`'.format(name1,name))
#     print('DONE')
#     entries = cursor.fetchall()
#     print entries
#     print entries[0][0]
#     for row in entries:
#         id=row[0]
#         age=row[1]
#         desc=row[2]

#         arr.append({
#             'id':id,
#             'age':age,
#             'desc':desc
#             })
#     print arr
#     json.dumps(arr)
#     # import pdb;pdb.set_trace()
#     return render_template('abc.html', entries=entries)

# @app.route('/check/',methods=['GET','POST'])
# def check():
#     # import ipdb;ipdb.set_trace()
#     db,cursor=get_db()
#     url='https://www.youtube.com'
#     source_code=requests.get(url)
#     plain_text=source_code.text
#     soup=BeautifulSoup(plain_text)
#     for link in soup.findAll('a',{'class':'yt-uix-sessionlink  yt-ui-ellipsis yt-ui-ellipsis-2       spf-link '}):
#         href=link.get('href')
#         print(href)
#         cursor.execute('INSERT INTO links VALUES (DEFAULT,"{0}")'.format(href))
#         db.commit()
#     print 'hello'
#     return jsonify({'a':'Hello World'})


@app.route('/', methods=['GET','POST'])
def login():
    if session.get('logged_in'):
        return render_template('home.html')
    else:
        db,cursor=get_db()
        if request.method == 'GET':
            return render_template('signup.html')

        elif request.method == 'POST':
            f=0
            email = request.form['email']
            password = request.form['password']
            cursor.execute('SELECT user_id,count(*) FROM user_login WHERE email="{0}" AND password="{1}"'.format(email,password))
            entries = cursor.fetchall()
            user_id=entries[0][0]
            count=entries[0][1]
            if count > 0:
                f=1
                session['logged_in'] = True
                # return render_template('home.html',status='success', msg='Login Successfull')
                return jsonify(status='success', msg='Login Successfull',check=f,user_id=user_id)

            else:
                # return jsonify(status='error', error_msg='Invalid Username or Password')
                return jsonify(status='error', msg='Invalid Username or Password',check=f)
                # return render_template('templates/login.html', entries=entries)


# @app.route('/walkthroughs/')
# def walkthroughs():
#     db,cursor=get_db()
#     cursor.execute('SELECT href FROM links')
#     entries.fetchall()
#     abc=line.split('=', 1)[-1]



@app.route('/signup', methods=['POST'])
def signup():
    db,cursor = get_db()
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    username = request.form['username']
    email = request.form['email']
    password = request.form['pwd']
    day = request.form['day']
    month = request.form['month']
    year = request.form['year']
    sex = request.form['sex']
    descp = request.form['descp']
    country = request.form['country']
    age = 10
    # print firstname
    # pro_pic=data['pro_pic']
    # acc_date=data['acc_date']
    cursor.execute('SELECT count(*) FROM user_login WHERE email="{0}"'.format(email))
    entries = cursor.fetchall()
    count=entries[0][0]

    if count == 0:
        cursor.execute('INSERT INTO user_login VALUES (DEFAULT,"{0}","{1}","{2}")'.format(username,password,email))
        db.commit()
        cursor.execute('SELECT user_id FROM user_login WHERE email="{0}" AND password="{1}"'.format(email,password))
        entries=cursor.fetchall()
        user_id=entries[0][0]
        cursor.execute('INSERT INTO user_descp VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}")'.format(user_id,firstname,lastname,age,descp,sex,country,day,month,year))
        db.commit()
        db.close()
        return jsonify(status='success', msg='Account Successfully Created')
    else:
        return jsonify(status='error', msg='Email Already Exists !')

@app.route('/logout', methods=['POST'])
def logout():
    session['logged_in'] = False
    # return jsonify(status='success', msg='logout')
    return render_template('signup.html')

@app.route('/home<user_id>', methods=['GET','POST'])
def home(user_id):
    if session.get('logged_in'):
        if request.method == 'GET':
            return render_template('home.html')

        elif request.method == 'POST':
            db,cursor = get_db()
            arr = []
            arr2 = []
            p_id = []
            question = []
            articles = []
            game_name_user = []
            cursor.execute('SELECT username FROM user_login WHERE user_id="{0}"'.format(user_id))
            entries=cursor.fetchall()
            username=entries[0][0]
            # print username
            cursor.execute('SELECT fname,lname,age,descp,sex FROM user_descp WHERE user_id="{0}"'.format(user_id))
            for row in cursor.fetchall():
                user_desp_dict=dict({'fname':row[0],'lname':row[1],'age':row[2],'descp':row[3],'sex':row[4]})
            cursor.execute('SELECT game_id FROM interest WHERE user_id="{0}"'.format(user_id))
            entries = cursor.fetchall()
            for a in entries:
                arr.append(a)
            count=len(arr)
            for i in range (0,count):
                a=arr[i]
                cursor.execute('SELECT game_name FROM games WHERE game_id="{0}"'.format(a[0]))
                for row in cursor.fetchall():
                    game_name_user.append(dict({'game_name':row[0]}))
            cursor.execute('SELECT post_id,post_type FROM posts')
            entries = cursor.fetchall()
            for a,b in entries:
                p_id.append(a)
                arr2.append(b)
            for i in range(0,len(arr2)):
                if(arr2[i] == 'QS'):
                    cursor.execute('SELECT title,content,likes FROM questions WHERE post_id="{0}"'.format(p_id[i]))
                    for row in cursor.fetchall():
                        question.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
                if(arr2[i] == 'AR'):
                    cursor.execute('SELECT title,content,likes FROM articles WHERE post_id="{0}"'.format(p_id[i]))
                    for row in cursor.fetchall():
                        articles.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
            return jsonify(username=username,user_desp_dict=user_desp_dict,game_name_user=game_name_user,question=question,articles=articles)
    else:
        return jsonify(status='error', msg='Login to Continue')


@app.route('/all_games', methods=['POST'])
def all_games():
    game_name = []
    db,cursor = get_db()
    cursor.execute('SELECT game_name FROM games')
    entries = cursor.fetchall()
    for row in cursor.fetchall():
        game_name.append(dict({'name':row[0]}))
    # print all_games
    return jsonify(game_name=game_name)

@app.route('/add_interest<user_id>', methods=['POST'])
def add_interest(user_id):
    db,cursor = get_db()
    arr = []
    # print 'down'
    # print request.data
    # print 'up'
    # import pdb;pdb.set_trace()
    # data = json.loads(request.data)
    interest_list = json.loads(request.form['interest_list'])
    #import pdb;pdb.set_trace()
    print interest_list
    for i in range(0,len(interest_list)):
        print interest_list['x'][i]
        if interest_list['x'][i] != NULL:
            cursor.execute('SELECT game_id FROM games WHERE game_name="{0}"'.format(interest_list['x'][i]))
            entries = cursor.fetchall()
            #import pdb;pdb.set_trace()
            game_id = entries[0][0]
            print game_id
            cursor.execute('INSERT INTO interest VALUES ("{0}","{1}")'.format(user_id,game_id))
            db.commit()
    return jsonify(status='success', msg='Interests Successfully Added')


@app.route('/autocomplete_games<user_id>', methods=['POST'])
def autocomplete_games(user_id):
    arr = []
    arr2 = []
    arr3 = []
    game_name = []
    db,cursor = get_db()
    # print user_id
    cursor.execute('SELECT game_id FROM interest WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        arr.append(a)
    count=len(arr)
    cursor.execute('SELECT game_id,game_name FROM games')
    entries = cursor.fetchall()
    for a,b in entries:
        arr2.append(a)
        arr3.append(b)
    for i in range(0,len(arr2)):
        flag=0
        for j in range(0,len(arr)):
            if arr2[i] == arr[j][0]:
                flag=1
                break
        if flag == 0:
            game_name.append(arr3[i])
    # print game_name
    return jsonify(game_name=game_name)



@app.route('/ask', methods=['GET'])
def ask():
    # session.pop('logged_in', None)
    # flash('You were logged out')
    return render_template('ask.html')

@app.route('/article', methods=['GET'])
def article():
    # session.pop('logged_in', None)
    # flash('You were logged out')
    return render_template('article.html')
@app.route('/walkthroughs', methods=['GET'])
def walkthroughs():
    # session.pop('logged_in', None)
    # flash('You were logged out')
    return render_template('walkthroughs.html')
@app.route('/gallery', methods=['GET'])
def gallery():
    # session.pop('logged_in', None)
    # flash('You were logged out')
    return render_template('gallery.html')


if __name__=='__main__':
    app.run(debug=True)




