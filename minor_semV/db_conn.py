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
# 	try:
# 		db=open('minor_01').read()
# 	except IOError:
# 		db='select * from games;'
# 	g.db=json.loads(db)


# @app.teardown_request
# def teardown_request(exception):
# 	if

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