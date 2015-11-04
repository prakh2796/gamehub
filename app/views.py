from flask import request, render_template
from app import app
import MySQLdb
import MySQLdb.cursors
import json

app.config.update(dict(
    DATABASE='minor_01',
    DEBUG=True,
    SECRET_KEY='development key',
    USERNAME='root',
    PASSWORD='12345'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    """Initializes the database."""
    db = MySQLdb.connect('localhost','root','12345','minor_01')
    return db, db.cursor()

@app.route('/login/', methods=['GET','POST'])
def login():
    import ipdb;ipdb.set_trace()
    db,cursor=get_db()
    if request.method == 'GET':
        # return render_template('login.html')
        return jsonify(status='error', msg='Login Failed')

    elif request.method == 'POST':
        #data = request.form
        
        email =request.data['email']
        password =request.data['password']
        cursor.execute('SELECT user_id,count(*) FROM user_login WHERE email="{0}" AND password="{1}"'.format(email,password))
        entries = cursor.fetchall()
        user_id=entries[0][0]
        # count=entries[0][1]
        # entries = cursor.fetchall()
        # if count > 0:
        #     return jsonify(status='error', error_msg='Email already')
        # print entries
        count=entries[0][1]
        # print count
        if count > 0:
            cursor.execute('SELECT * FROM user_descp WHERE user_id="{0}"'.format(user_id))
            entries = cursor.fetchall()
            # print entries
            cursor.execute('SELECT game_id FROM interest WHERE user_id="{0}"'.format(user_id))
            entries = cursor.fetchall()
            # print entries
            for a in entries:
                arr.append(a)
            count=len(arr)
            for i in range (0,count):
                a=arr[i]
                cursor.execute('SELECT game_name FROM games WHERE game_id="{0}"'.format(a[0]))
                entries = cursor.fetchall()
                arr1.append(entries[0][0])
            # print arr1
            cursor.execute('SELECT post_id,post_type FROM posts')
            entries = cursor.fetchall()
            # print entries2
            # print type(entries2)
            for a,b in entries:
                p_id.append(a)
                arr2.append(b)
            # print arr
            for i in range(0,len(arr2)):
                # print arr2[i]
                if(arr2[i] == 'QS'):
                    cursor.execute('SELECT title,content,likes FROM questions WHERE post_id="{0}"'.format(p_id[i]))
                    entries = cursor.fetchall()
                    arr3.append(entries)
                if(arr2[i] == 'AR'):
                    cursor.execute('SELECT title,content,likes FROM articles WHERE post_id="{0}"'.format(p_id[i]))
                    entries = cursor.fetchall()
                    arr4.append(entries)
            # return jsonify(status='success',error_msg='Login Successfull')
            # return jsonify(status='success', msg='Login Successfull')
            # return render_template('templates/login.html', questions=arr3,articles=arr4)
            print arr3
            print arr4
            return request.data
        else:
            # return jsonify(status='error', error_msg='Invalid Username or Password')
            return jsonify(status='error', msg='Invalid Username or Password')
        # return request.data
        # return render_template('abc.html')
        # return render_template('templates/login.html', entries=entries)
            # return jsonify({'a':'Hello World'})

        # return render_template('templates/login.html', entries=entries)


@app.route('/signup', methods=['POST'])
def signup():
    db,cursor=get_db()
    data=json.loads(request.data)
    username=data['username']
    password=data['password']
    email=data['email']
    fname=data['fname']
    lname=data['lname']
    age=data['age']
    descp=data['descp']
    sex=data['sex']
    addr=data['address']
    dob=data['dob']
    pro_pic=data['pro_pic']
    acc_date=data['acc_date']
    cursor.execute('INSERT INTO user_login VALUES (DEFAULT,"{0}","{1}","{2}")'.format(username,password,email))
    db.commit()
    cursor.execute('SELECT user_id FROM user_login WHERE email="{0}" AND password="{1}"'.format(email,password))
    entries=cursor.fetchall()
    user_id=entries[0][0]
    print user_id
    cursor.execute('SELECT count(*) FROM user_login WHERE user_id="{0}"'.format(user_id))
    entries=cursor.fetchall()
    print entries[0][0]
    count=0
    if count > 0:
        return jsonify(status='error', error_msg='Email already')
        return request.data
    else:
        cursor.execute('INSERT INTO user_descp VALUES ("{9}","{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}")'.format(fname,lname,age,descp,sex,addr,dob,pro_pic,acc_date,user_id))
        db.commit()
        db.close()
        # return jsonify(status='success', error_msg='Account Successfully Created')
        return request.data

