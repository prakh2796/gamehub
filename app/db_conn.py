"""
if inspect.getouterframes(inspect.currentframe(), 2)[1][3] == 'xxx':
    return aaa
"""

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
import json
import MySQLdb
import inspect
import time
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



###########################################   Login Verification    #############################################
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
            print email
            cursor.execute('SELECT user_id,count(*),username FROM user_login WHERE email="{0}" AND password="{1}"'.format(email,password))
            entries = cursor.fetchall()
            user_id=entries[0][0]
            count=entries[0][1]
            username=entries[0][2]
            if count > 0:
                f=1
                session['logged_in'] = True
                # return render_template('home.html',status='success', msg='Login Successfull')
                return jsonify(status='success', msg='Login Successfull', check=f, user_id=user_id, username=username)

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


###################################################     Signup   ##############################################
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


##############################################  Logout  ###################################################
@app.route('/logout', methods=['POST'])
def logout():
    session['logged_in'] = False
    # return jsonify(status='success', msg='logout')
    return render_template('signup.html')

##############################################  Home Request  ##################################################
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
            user_id = get_user_id(username)
            # print username
            return jsonify(user_id = user_id, username=username)
    else:
        return jsonify(status='error', msg='Login to Continue')

##############################################  Get UserID  ###################################################
@app.route('/get_user_id<username>', methods=['GET','POST'])
def get_user_id(username):
    db,cursor = get_db()
    # print username
    cursor.execute('SELECT user_id FROM user_login WHERE username="{0}"'.format(username))
    entries = cursor.fetchall()
    user_id = entries[0][0]
    return user_id


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


##############################################  Add Interest  ###################################################
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
            # print interest_list['x'][i]
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
    count = len(game_name)
    return jsonify(game_name=game_name, count=count)
    


###########################################   Users Timiline  #################################################
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
    users = []
    fun = []

    db,cursor = get_db()
    print user_id
    # user_id=get_user_id(username)
    cursor.execute('SELECT following FROM user_following WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for row in entries:
        u_id.append(row)
    cursor.execute('SELECT user_id FROM user_login WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    temp2 = entries[0][0]
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
    # print post_id
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
        users.append(entries[0][0])
        # print username
    count = len(post)
    # print username
    for i in range(0,len(post_id)):
        cursor.execute('SELECT user_id FROM user_posts WHERE post_id="{0}"'.format(post_id[i]))
        entries = cursor.fetchall()
        cursor.execute('SELECT count(*) FROM user_following WHERE user_id="{0}" AND following="{1}"'.format(user_id,entries[0][0]))
        entries2 = cursor.fetchall()
        # print temp2
        # print entries[0][0]
        if(temp2 == entries[0][0]):
            fun.append(2)
        elif(entries2[0][0] > 0):
            fun.append(1)
        else:
            fun.append(0)
    return jsonify(post=post, post_date=post_date, post_type=post_type, count=count, fun=fun, users=users)



###########################################   Answer/Comment  #################################################
@app.route('/expand', methods=['GET','POST'])
def expand():

    ans_id = []
    display = []
    comm_id = []
    users = []

    db,cursor=get_db()
    # request.form = json.loads(request.data)
    post_type = request.form['type']
    title = request.form['title']
    if post_type == 'QS':
        cursor.execute('SELECT post_id FROM questions WHERE title="{0}"'.format(title))
        entries = cursor.fetchall()
        post_id = entries[0][0]
        cursor.execute('SELECT ans_id FROM questions_answers WHERE post_id="{0}"'.format(post_id))
        for a in cursor.fetchall():
            ans_id.append(a[0])
        for i in range(0,len(ans_id)):
            cursor.execute('SELECT ans_date,content,user_id FROM answers WHERE ans_id="{0}" ORDER BY ans_date DESC'.format(ans_id[i]))
            for row in cursor.fetchall():
                display.append(dict({'date':str(row[0]),'content':row[1]}))
                user_id = row[2]
                cursor.execute('SELECT username FROM user_login WHERE user_id="{0}"'.format(user_id))
                entries2 = cursor.fetchall()
                users.append(entries2[0][0])
    elif post_type == 'AR':
        cursor.execute('SELECT post_id FROM articles WHERE title="{0}"'.format(title))
        entries = cursor.fetchall()
        post_id = entries[0][0]
        cursor.execute('SELECT comm_id FROM articles_comments WHERE post_id="{0}"'.format(post_id))
        for a in cursor.fetchall():
            comm_id.append(a[0])
        for i in range(0,len(comm_id)):
            cursor.execute('SELECT comm_date,content,user_id FROM comments WHERE comm_id="{0}" ORDER BY comm_date DESC'.format(comm_id[i]))
            for row in cursor.fetchall():
                display.append(dict({'date':str(row[0]),'content':row[1]}))
                user_id = row[2]
                cursor.execute('SELECT username FROM user_login WHERE user_id="{0}"'.format(user_id))
                entries2 = cursor.fetchall()
                users.append(entries2[0][0])
    # print users
    # print display
    count = len(display)
    return jsonify(display=display, users=users, count=count)


####################################################  Add Reply ###############################################
@app.route('/add_reply<user_id>', methods=['GET','POST'])
def add_reply(user_id):
    db,cursor = get_db()
    # request.form = json.loads(request.data)
    post_type = request.form['type']
    title = request.form['title']
    content = request.form['content']
    if post_type == 'QS':
        cursor.execute('SELECT post_id FROM questions WHERE title="{0}"'.format(title))
        entries = cursor.fetchall()
        post_id = entries[0][0]
        cursor.execute('INSERT INTO answers VALUES (DEFAULT,CURRENT_TIMESTAMP,"{1}","{2}",0)'.format(user_id,content))
        db.commit()
        cursor.execute('SELECT ans_id FROM answers WHERE content= "{0}"'.format(content))
        entries = cursor.fetchall()
        ans_id = entries[0][0]
        cursor.execute('INSERT INTO questions_answers VALUES ("{0}","{1}")'.format(post_id,ans_id))
        db.commit()
        return jsonify(status="success", msg="Answer added")
    elif post_type == 'AR':
        cursor.execute('SELECT post_id FROM articles WHERE title="{0}"'.format(title))
        entries = cursor.fetchall()
        post_id = entries[0][0]
        cursor.execute('INSERT INTO comments VALUES (DEFAULT,"{0}","{1}","{2}",0)'.format(date,user_id,content))
        db.commit()
        cursor.execute('SELECT comm_id FROM comments WHERE content= "{0}"'.format(content))
        entries = cursor.fetchall()
        comm_id = entries[0][0]
        cursor.execute('INSERT INTO articles_comments VALUES ("{0}","{1}")'.format(post_id,comm_id))
        db.commit()
        return jsonify(status="success", msg="Comments added")


##################################################  Like Increament ###########################################
@app.route('/like_inc', methods=['GET','POST'])
def like_inc():
    db,cursor = get_db()
    request.form = json.loads(request.data)
    post_type = request.form['type']
    title = request.form['title']
    if post_type == 'QS':
        cursor.execute('SELECT likes FROM questions WHERE title="{0}"'.format(title))
        entries = cursor.fetchall()
        likes = entries[0][0]
        likes = likes + 1
        cursor.execute('INSERT INTO questions(likes) VALUES ("{0}")'.format(likes))
        db.commit()
    elif post_type == 'AR':
        cursor.execute('SELECT likes FROM articles WHERE title="{0}"'.format(title))
        entries = cursor.fetchall()
        likes = entries[0][0]
        likes = likes + 1
        cursor.execute('INSERT INTO articles(likes) VALUES ("{0}")'.format(likes))
        db.commit()
    return jsonify(status="success", msg="Like +1")




###########################################  Remove duplicates form a list #####################################
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

#########################################    Return Tags  ####################################################
@app.route('/tags', methods=['GET','POST'])
def tags():
    db,cursor = get_db()
    tags_name = []
    cursor.execute('SELECT tag_name FROM tags')
    entries = cursor.fetchall()
    for a in entries:
        tags_name.append(a[0])
    return jsonify(tags_name=tags_name)


#########################################    Add Post  #######################################################
@app.route('/add_post<user_id>', methods=['GET','POST'])
def add_post(user_id):
    db,cursor = get_db()
    # request.form = json.loads(request.data)
    tag_list = json.loads(request.form['tag_list'])
    post_type = request.form['type']
    title = request.form['title']
    content = request.form['content']
    # date = time.strftime("%x")
    # print content
    # print type(date)
    cursor.execute('INSERT INTO posts VALUES (DEFAULT,"{0}",CURRENT_TIMESTAMP)'.format(post_type))
    db.commit()
    cursor.execute('SELECT post_id FROM posts ORDER BY post_id DESC')
    entries = cursor.fetchall()
    post_id = entries[0][0]
    print post_id
    for i in range(0,len(tag_list['x'])):
        cursor.execute('SELECT tag_id FROM tags WHERE tag_name="{0}"'.format(tag_list['x'][i]))
        entries = cursor.fetchall()
        tag_id = entries[0][0]
        cursor.execute('INSERT INTO posts_tags VALUES ("{0}","{1}")'.format(post_id,tag_id))
        db.commit()
    cursor.execute('INSERT INTO user_posts VALUES ("{0}","{1}")'.format(user_id,post_id))
    db.commit()
    if post_type == 'QS':
        cursor.execute('INSERT INTO questions VALUES ("{0}","{1}","{2}","{3}",0)'.format(post_id,user_id,title,content))
        db.commit()
    elif post_type == 'AR':
        cursor.execute('INSERT INTO articles VALUES ("{0}","{1}","{2}","{3}",0)'.format(post_id,user_id,title,content))
        db.commit()
    return jsonify(status="success", msg="Post Added")



#####################################    Profile Page  ##################################################
@app.route('/profile<username>', methods=['GET','POST'])
def profile(username):

    if request.method == 'GET':
            return render_template('profile_new.html')

    elif request.method == 'POST':
        arr = []
        user_desp_dict = []
        following= []
        followers = []
        post_type = []
        post_id = []
        post = []
        post_date = []
        arr2 = []

        db,cursor = get_db()
        user_id = get_user_id(username)
        # print user_id

        ######  Username  ######
        cursor.execute('SELECT username,email FROM user_login WHERE user_id="{0}"'.format(user_id))
        entries=cursor.fetchall()
        username = entries[0][0]
        email = entries[0][1]
        # print username

        ###### User Description  ######
        cursor.execute('SELECT fname,lname,DOB,descp,sex,address FROM user_descp WHERE user_id="{0}"'.format(user_id))
        for row in cursor.fetchall():
            user_desp_dict=dict({'fname':row[0],'lname':row[1],'dob':str(row[2]),'descp':row[3],'sex':row[4],'address':str(row[5])})

        ######  Following  ######
        cursor.execute('SELECT following FROM user_following where user_id="{0}"'.format(user_id))
        entries = cursor.fetchall()
        for a in entries:
            arr.append(a[0])
        for i in range(0,len(arr)):
            cursor.execute('SELECT username FROM user_login WHERE user_id="{0}"'.format(arr[i]))
            entries = cursor.fetchall()
            following.append(entries[0][0])
        fing_count = len(following)
        # print following

        ######  Followers  ######
        arr = []
        cursor.execute('SELECT followers FROM user_followers where user_id="{0}"'.format(user_id))
        entries = cursor.fetchall()
        for a in entries:
            arr.append(a[0])
        # print arr
        for i in range(0,len(arr)):
            # cursor.execute('SELECT fname,lname FROM user_descp WHERE user_id="{0}"'.format(arr[i]))
            cursor.execute('SELECT username FROM user_login WHERE user_id="{0}"'.format(arr[i]))
            entries = cursor.fetchall()
            followers.append(entries[0][0])
        fer_count = len(followers)
        # print followers

        ######  User's Questions and Articles along  ######
        cursor.execute('SELECT post_id FROM user_posts WHERE user_id="{0}"'.format(user_id))
        entries = cursor.fetchall()
        for a in entries:
            post_id.append(a[0])
        for i in range(0,len(post_id)):
            cursor.execute('SELECT post_type,post_date FROM posts WHERE post_id="{0}" ORDER BY post_date DESC'.format(post_id[i]))
            entries = cursor.fetchall()
            for a,b in entries:
                post_type.append(str(a))
                post_date.append(str(b))
        for i in range(0,len(post_type)):
            if(post_type[i] == 'QS'):
                cursor.execute('SELECT title,content,likes FROM questions WHERE post_id="{0}"'.format(post_id[i]))
                for row in cursor.fetchall():
                    post.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
            if(post_type[i] == 'AR'):
                cursor.execute('SELECT title,content,likes FROM articles WHERE post_id="{0}"'.format(post_id[i]))
                for row in cursor.fetchall():
                    post.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))

        post_count = len(post)
        print post_count
        print post
        return jsonify(username=username, email=email, user_desp_dict=user_desp_dict, fer_count=fer_count, followers=followers, fing_count=fing_count, following=following, post=post, post_count=18, post_type=post_type, post_date=post_date)




##########################################  Users Questions  #################################################
@app.route('/users_questions<username>', methods=['GET','POST'])
def users_questions(username):
    post_id = []
    post_type = []
    question = []
    post_date = []
    db,cursor = get_db()
    user_id = get_user_id(username)
    cursor.execute('SELECT post_id FROM user_posts WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        post_id.append(a[0])
    for i in range(0,len(post_id)):
        cursor.execute('SELECT post_type,post_date FROM posts WHERE post_id="{0}" ORDER BY post_date DESC'.format(post_id[i]))
        entries = cursor.fetchall()
        for a,b in entries:
            post_type.append(str(a))
            post_date.append(str(b))
    for i in range(0,len(post_type)):
        if(post_type[i] == 'QS'):
            cursor.execute('SELECT title,content,likes FROM questions WHERE post_id="{0}"'.format(post_id[i]))
            for row in cursor.fetchall():
                question.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
    count = len(question)
    return jsonify(question=question, post_date=post_date, count=count)



##########################################  Users Articles  #################################################
@app.route('/users_articles<username>', methods=['GET','POST'])
def users_articles(username):
    post_id = []
    post_type = []
    articles = []
    post_date = []
    db,cursor = get_db()
    user_id = get_user_id(username)
    cursor.execute('SELECT post_id FROM user_posts WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    for a in entries:
        post_id.append(a[0])
    for i in range(0,len(post_id)):
        cursor.execute('SELECT post_type,post_date FROM posts WHERE post_id="{0}" ORDER BY post_date DESC'.format(post_id[i]))
        entries = cursor.fetchall()
        for a,b in entries:
            post_type.append(str(a))
            post_date.append(str(b))
    for i in range(0,len(post_type)):
        if(post_type[i] == 'AR'):
            cursor.execute('SELECT title,content,likes FROM articles WHERE post_id="{0}"'.format(post_id[i]))
            for row in cursor.fetchall():
                articles.append(dict({'title':row[0],'content':row[1],'likes':row[2]}))
    count = len(articles)
    return jsonify(articles=articles, post_date=post_date, count=count)



##########################################  Users Interest  #################################################
@app.route('/users_interest<user_id>', methods=['GET','POST'])
def users_interest(user_id):
    arr = []
    game_name_user = []
    db,cursor = get_db()
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
    return jsonify(game_name_user=game_name_user)



##########################################  Channels  #################################################
@app.route('/videos', methods=['POST'])
def videos():
    channel = []
    db,cursor = get_db()
    # print user_id
    cursor.execute('SELECT channel_name FROM user_channels')
    entries = cursor.fetchall()
    for a in entries:
        channel.append(a[0])
    channel=remove_duplicates(channel)
    count=len(channel)
    # print channel
    return jsonify(channel=channel, count=count)

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
@app.route('/new_videos', methods=['GET'])
def new_videos():
    # session.pop('logged_in', None)
    # flash('You were logged out')
    return render_template('new_videos.html')

if __name__=='__main__':
    app.run(debug=True)




