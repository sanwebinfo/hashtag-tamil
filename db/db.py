import sqlite3
import json

# Read data from JSON file
with open('hashtags.json', 'r') as json_file:
    data = json.load(json_file)

# Connect to SQLite database
conn = sqlite3.connect('hashtags.db')
cursor = conn.cursor()

# Create hashtags table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS hashtags
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT UNIQUE)''')

# Iterate through tags and insert into the database
for tag in data['popularHashtags']:
    try:
        cursor.execute("INSERT INTO hashtags (tag) VALUES (?)", (tag,))
    except sqlite3.IntegrityError:
        # Ignore duplicate entries
        pass

# Commit changes and close connection
conn.commit()
conn.close()

print("SQLite database created and populated with hashtags.")
