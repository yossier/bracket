from flask import Flask
import controllers
from werkzeug import secure_filename

app = Flask(__name__)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
    
