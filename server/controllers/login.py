from flask import *

login = Blueprint('login', __name__)

@login.route(BASE_URL_ROUTE + '/login', methods=['POST'])
def login_route():
    req_json = request.get_json()

    email = req_json.get('email')
    passHash = req_json.get('passHash')

    if email is None and passHash is None:
        response = json.jsonify(error='You did not provide an email and password parameter.', status=404)
        response.status_code = 404
        return response

    if email is None:
        #and so on
