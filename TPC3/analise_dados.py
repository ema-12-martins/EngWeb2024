import json

def create_new_db(file_path):
    # The db will be a dict of lists
    new_db = {
        "films": [],
    }

    # Open the json to analyze your information
    with open(file_path, 'r') as file:
        line = file.readline()
        while line:
            line = line.strip()
            if line:
                # Create the object with the right struct
                film_in_db = json.loads(line)
                
                # Try to obtain the values and if it doesn't work, put a empty object
                new_film = {
                    "title": film_in_db['title'],
                    "id": film_in_db.get('_id', {}).get('$oid', ''),
                    "year": film_in_db.get('year', ''),
                    "cast": film_in_db.get('cast', []),
                    "genres": film_in_db.get('genres', []),
                }
                
                new_db['films'].append(new_film)
            line = file.readline()
    
    with open("new_db.json", 'w+') as new_file:
        json.dump(new_db, new_file, indent=2)

# Example usage
file_path = "filmes.json"
create_new_db(file_path)
