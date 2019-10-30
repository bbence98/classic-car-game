from flask import Flask, request, render_template, redirect, session, url_for


app = Flask(__name__)


@app.route('/')
def home_page():
    return render_template('index.html', row_num=26, col_num=18)


if __name__ == '__main__':
    app.run()
