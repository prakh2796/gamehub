# -*- coding: utf-8 -*-
"""
    Flaskr
    ~~~~~~
    A microblog example application written as Flask tutorial with
    Flask and sqlite3.
    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""

import os
#from sqlite3 import dbapi2 as sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import json
import MySQLdb
import MySQLdb.cursors

# create our little application :)
app = Flask(__name__)

arr=[]

# Load default config and override config from an environment variable
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

# @app.before_request
# def before_request():
#   try:
#       db=open('minor_01').read()
#   except IOError:
#       db='select * from games;'
#   g.db=json.loads(db)


# @app.teardown_request
# def teardown_request(exception):
#   if

# @app.cli.command('initdb')
# def initdb_command():
#     """Creates the database tables."""
#     init_db()
#     print('Initialized the database.')


# def get_db():
#     """Opens a new database connection if there is none yet for the
#     current application context.
#     """
#     if not hasattr(g, 'sqlite_db'):
#         g.sqlite_db = connect_db()
#     return g.sqlite_db


# @app.teardown_appcontext
# def close_db(error):
#     """Closes the database again at the end of the request."""
#     if hasattr(g, 'sqlite_db'):
#         g.sqlite_db.close()


@app.route('/<name>', methods=['GET'])
def show_entries(name):
    db, cursor = get_db()
    print name
    name1=name[:-6]
    # cur = db.execute('select title, text from entries order by id desc')
    cursor.execute('SELECT `{0}_id`,age,descp FROM `{1}`'.format(name1,name))
    print('DONE')
    entries = cursor.fetchall()
    print entries
    print entries[0][0]
    for row in entries:
        id=row[0]
        age=row[1]
        desc=row[2]

        arr.append({
            'id':id,
            'age':age,
            'desc':desc
            })
    print arr
    json.dumps(arr)
    # import pdb;pdb.set_trace()
    return render_template('abc.html', entries=entries)


@app.route('/login', methods=['POST'])
def login():
    db,cursor=get_db()
    # print request.name
    print request.data
    print type(request.data)
    #import pdb;pdb.set_trace()
    data = json.loads(request.data)
    # print request.args.name
    email = data['email']
    password = data['password'] 
    # print request.data
    # print email
    # print password
    # New User
    # cursor.execute('SELECT count(*) FROM user_login where user_id =`{0}` AND pass =`{1}`'.format(email,password))
    # cursor.execute('SELECT user_id,count(*) FROM user_login WHERE email=`{0}` AND password=`{1}`'.format(email,password))
    # print('DONE')
    cursor.execute('SELECT user_id,count(*) FROM user_login WHERE email="{0}" AND password="{1}"'.format(email,password))
    entries = cursor.fetchall()
    user_id=entries[0][0]
    cursor.execute('SELECT * FROM user_descp WHERE user_id="{0}"'.format(user_id))
    entries = cursor.fetchall()
    # # if count > 0:
    # #     return jsonify(status='error', error_msg='Email already')
    print entries
    # count=entries[0][1]
    # print count
    # if count > 0:
    #     return jsonify(status='success', error_msg='Successfully Logged In')
    return request.data
    # return render_template('login.html', entries=entries)


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
    # return request.data

# @app.route('/add', methods=['POST'])  
# def add_entry():
#     if not session.get('logged_in'):
#         abort(401)
#     db = get_db()
#     db.execute('insert into entries (title, text) values (?, ?)',
#                [request.form['title'], request.form['text']])
#     db.commit()
#     flash('New entry was successfully posted')
#     return redirect(url_for('show_entries'))


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     error = None
#     if request.method == 'POST':
#         if request.form['username'] != app.config['USERNAME']:
#             error = 'Invalid username'
#         elif request.form['password'] != app.config['PASSWORD']:
#             error = 'Invalid password'
#         else:
#             session['logged_in'] = True
#             flash('You were logged in')
#             return redirect(url_for('show_entries'))
#     return render_template('login.html', error=error)


# @app.route('/logout')
# def logout():
#     session.pop('logged_in', None)
#     flash('You were logged out')
#     return redirect(url_for('show_entries'))

if __name__=='__main__':
    app.run()