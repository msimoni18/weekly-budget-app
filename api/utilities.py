import sqlite3


def connect(filename):
    """Connect to database."""

    conn = None

    try:
        conn = sqlite3.connect(filename)
        conn.row_factory = sqlite3.Row

        # Initialize table(s)
        cursor = conn.cursor()

        # Transactions table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT UNIQUE,
            date TEXT,
            amount REAL,
            description TEXT 
        )
        """)

        # Weekly budget table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS weeklybudget (
            id TEXT UNIQUE,
            amount REAL
        )
        """)

        # Commit changes to database
        conn.commit()

    except Exception as err:
        print(err)

    return conn


def get_transactions(cursor):
    rows = cursor.execute("SELECT * FROM transactions").fetchall()
    return [dict(row) for row in rows]

def get_weekly_budget(cursor):
    rows = cursor.execute("SELECT * FROM weeklybudget").fetchall()
    return [dict(row) for row in rows]
