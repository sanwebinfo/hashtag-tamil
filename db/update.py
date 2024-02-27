import json
import sqlite3

# Load data from JSON file
with open('hashtags.json', 'r') as json_file:
    data = json.load(json_file)

# Connect to the existing SQLite database
conn = sqlite3.connect('hashtags.db')
cursor = conn.cursor()

# Iterate over the hashtags from the JSON data and insert them into the database
for tag in data['popularHashtags']:
    # Use INSERT OR IGNORE to insert only if the tag is unique
    cursor.execute("INSERT OR IGNORE INTO hashtags (tag) VALUES (?)", (tag,))

# Commit the changes and close the connection
conn.commit()
conn.close()

print("SQLite database updated with new unique hashtags from the JSON file.")
