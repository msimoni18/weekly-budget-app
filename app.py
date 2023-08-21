import os
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from api.utilities import connect, get_transactions

# Set up and initialize database
DB_PATH = os.path.join(os.getenv('HOME'), 'weekly-budget-app')
DB_FILE ='budget.db'

if not os.path.isdir(DB_PATH):
    os.makedirs(DB_PATH)

conn = connect(os.path.join(DB_PATH, DB_FILE))
conn.close()

if os.environ['FLASK_DEBUG'] == '0':
    FLASK_ENV = 'production'
    app = Flask(__name__, static_folder='dist', static_url_path='')
else:
    FLASK_ENV = 'development'
    app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.route("/")
def home():
    """Access production build.

    This is needed in order to access the production build
    on the server.
    """
    if FLASK_ENV == 'production':
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/modify-transaction", methods=['GET', 'POST'])
def transactions():

    conn = connect(os.path.join(DB_PATH, DB_FILE))
    cursor = conn.cursor()

    if request.method == 'POST':

        update_type = request.json['type']
        id = request.json['transactionData']['id']
        date = request.json['transactionData']['date']
        amount = request.json['transactionData']['amount']
        description = request.json['transactionData']['description']

        if update_type == 'add':
            try:
                cursor.execute(
                    "INSERT INTO transactions(id,date,amount,description) VALUES(?,?,?,?)",
                    (id, date, amount, description)
                )
                conn.commit()
            except Exception as err:
                print(f'ERROR: {err}')
        elif update_type == 'delete':
            cursor.execute(f"DELETE FROM transactions WHERE id=\"{id}\"")
            conn.commit()
        else:
            print(f'{update_type!r} was provided. Only add and delete options are available for modifying the database.')
    
    transactions = get_transactions(cursor)

    # Sort by newest date first, then by highest amount
    transactions = sorted(transactions, key=lambda k: (k['date'], k['amount']), reverse=True)
    
    weekly_total = sum([row['amount'] for row in transactions])

    conn.close()

    return jsonify({
        'status': 200,
        'message': 'Successful request.',
        'transactions': transactions,
        'weekly_total': weekly_total
    })
