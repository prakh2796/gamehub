

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


#######################################      Login Verification    ##################################################
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


#######################################################     Signup   #######################################################
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

            ####### All games user has in his interest ########
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

            ####### All articles and questions in separate list #######
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


##############################################  All Games  ######################################################
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


##############################################  Add Interest  ######################################################
@app.route('/add_interest<user_id>', methods=['POST'])
def add_interest(user_id):
    db,cursor = get_db()
    arr = []
    # import pdb;pdb.set_trace()
    # data = json.loads(request.data)
    interest_list = json.loads(request.form['interest_list'])
    # print interest_list
    if interest_list:
        for i in range(0,len(interest_list)):
            print interest_list['x'][i]
            if interest_list['x'][i] != NULL:
                cursor.execute('SELECT game_id FROM games WHERE game_name="{0}"'.format(interest_list['x'][i]))
                entries = cursor.fetchall()
                game_id = entries[0][0]
                # print game_id
                cursor.execute('INSERT INTO interest VALUES ("{0}","{1}")'.format(user_id,game_id))
                db.commit()
        return jsonify(status='success', msg='Interests Successfully Added')
    else:
        return jsonify(status='error', msg='No Interest Added')


##########################################  Autocompelete for a user  #################################################
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


##################################################   Users Timiline  ########################################################
@app.route('/timeline<user_id>', methods=['GET','POST'])
def timeline(user_id):

    u_id = []
    p_id = []
    game_id = []
    tag_id= []
    arr = []
    arr2 = []
    arr3 = []
    post = []
    post_id = []
    post_date = []
    post_type = []
    username = []

    db,cursor = get_db()
    cursor.execute('SELECT following FROM user_following WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for row in entries:
        u_id.append(row)
    cursor.execute('SELECT user_id FROM user_login WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    u_id.append(entries[0])
    # print u_id
    for i in range(0,len(u_id)):
        cursor.execute('SELECT post_id FROM user_posts WHERE user_id="{0}"'.format(u_id[i][0]))
        entries=cursor.fetchall()
        for a in entries:
            p_id.append(a[0])
    # print p_id
    cursor.execute('SELECT game_id FROM interest WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        game_id.append(a)
    for i in range(0,len(game_id)):
        cursor.execute('SELECT tag_id FROM games_tags WHERE game_id="{0}"'.format(game_id[i][0]))
        entries = cursor.fetchall()
        for a in entries:
            tag_id.append(a)
        # print game_id[i]
        # print tag_id  
    for i in range(0,len(tag_id)):
        cursor.execute('SELECT post_id FROM posts_tags WHERE tag_id="{0}"'.format(tag_id[i][0]))
        entries = cursor.fetchall()
        for a in entries:
            p_id.append(a[0])
    p_id = remove_duplicates(p_id)
    # print p_id
    cursor.execute('SELECT post_id,post_date,post_type FROM posts ORDER BY post_date DESC')
    entries = cursor.fetchall()
    for a,b,c in entries:
        arr.append(a)
        arr2.append(b)
        arr3.append(c)
    # print arr
    # print arr2
    for i in range(0,len(arr)):
        for j in range(0,len(p_id)):
            if p_id[j] == arr[i]:
                post_id.append(arr[i])
                post_date.append(str(arr2[i]))
                post_type.append(arr3[i])
                break
    print post_id
    for i in range(0,len(post_type)):
        if(post_type[i] == 'QS'):
            cursor.execute('SELECT title,content,likes FROM questions WHERE post_id="{0}"'.format(post_id[i]))
            for row in cursor.fetchall():
                post.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
        if(post_type[i] == 'AR'):
            cursor.execute('SELECT title,content,likes FROM articles WHERE post_id="{0}"'.format(post_id[i]))
            for row in cursor.fetchall():
                post.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
        # print post
        cursor.execute('SELECT user_id FROM user_posts WHERE post_id="{0}"'.format(post_id[i]))
        entries = cursor.fetchall()
        temp = entries[0][0]
        # print p_id[i]
        # print temp
        cursor.execute('SELECT username FROM user_login WHERE user_id="{0}"'.format(temp))
        entries = cursor.fetchall()
        username.append(entries[0][0])
        # print username
    count = len(post)
    print username
    return jsonify(post=post, post_date=post_date, post_type=post_type, count=count)


###########################################    Remove duplicates form a list #####################################
def remove_duplicates(values):
    output = []
    seen = set()
    for value in values:
        # If value has not been encountered yet,
        # ... add it to both list and set.
        if value not in seen:
            output.append(value)
            seen.add(value)
    return output


#####################################    Profile Page  ##################################################
@app.route('/profile<user_id>', methods=['GET','POST'])
def profile(user_id):

    arr = []
    user_desp_dict = []
    following= []
    followers = []
    post_type = []
    post_id = []
    question = []
    answer = []
    article = []
    comment = []

    db,cursor = get_db()
    ######  Username  ######
    cursor.execute('SELECT username,email FROM user_login WHERE user_id="{0}"'.format(user_id))
    entries=cursor.fetchall()
    username = entries[0][0]
    email = entries[0][1]

    ######  Following  ######
    cursor.execute('SELECT fname,lname,age,descp,sex FROM user_descp WHERE user_id="{0}"'.format(user_id))
    for row in cursor.fetchall():
        user_desp_dict=dict({'fname':row[0],'lname':row[1],'age':row[2],'descp':row[3],'sex':row[4]})
    cursor.execute('SELECT following FROM user_following where user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        arr.append(a[0])
    for i in range(0,len(arr)):
        cursor.execute('SELECT fname,lname FROM user_descp WHERE user_id="{0}"'.format(arr[i]))
        entries = cursor.fetchall()
        for a,b in entries:
            # print a,b
            name = a + b
        following.append(name)
    # print following

    ######  Followers  ######
    arr = []
    cursor.execute('SELECT followers FROM user_followers where user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        arr.append(a[0])
    # print arr
    for i in range(0,len(arr)):
        cursor.execute('SELECT fname,lname FROM user_descp WHERE user_id="{0}"'.format(arr[i]))
        entries = cursor.fetchall()
        for a,b in entries:
            # print a,b
            name = a + b
        followers.append(name)
    # print followers

    ######  User's Questions and Articles along with Answers and Comments  ######
    cursor.execute('SELECT post_id FROM user_posts WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        post_id.append(a[0])
    for i in range(0,len(post_id)):
        cursor.execute('SELECT post_type FROM posts WHERE post_id="{0}"'.format(post_id[i]))
        entries = cursor.fetchall()
        for a in entries:
            post_type.append(a[0])
    for i in range(0,len(post_type)):
        if(post_type[i] == 'QS'):
            cursor.execute('SELECT title,content,likes FROM questions WHERE post_id="{0}"'.format(post_id[i]))
            for row in cursor.fetchall():
                question.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
        if(post_type[i] == 'AR'):
            cursor.execute('SELECT title,content,likes FROM articles WHERE post_id="{0}"'.format(post_id[i]))
            for row in cursor.fetchall():
                article.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
    return jsonify(username=username, email=email, followers=followers, following=following, question=question, article=article)



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




