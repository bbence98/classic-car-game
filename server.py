from flask import Flask, request, render_template, redirect, session, url_for


app = Flask(__name__)


@app.route('/')
def home_page():
    return render_template('index.html', row_num=28, col_num=14, win_size=3)

if __name__ == '__main__':
    app.run()