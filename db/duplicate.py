import json

def remove_duplicates_from_json(json_file_path):
    # Load JSON data
    with open(json_file_path, 'r') as json_file:
        data = json.load(json_file)

    # Remove duplicates from the list
    data['popularHashtags'] = list(set(data['popularHashtags']))

    # Rewrite the JSON file with updated data
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print("Duplicates removed from JSON file.")

# Example usage
remove_duplicates_from_json('hashtags.json')
