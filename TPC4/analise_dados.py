import json

def create_new_db(file_path):
    count_period=1

    # The db will be a dict of lists
    db = {
        "compositores": [],
        "periodos_musicais":[],
    }

    # Open the json to analyze your information
    contador=0
    with open(file_path, 'r') as file:
        original_db=json.load(file)

        for compositor in original_db['compositores']:

            i=0
            encontrado=False
            while encontrado==False and i<len(db['periodos_musicais']):
                if (db["periodos_musicais"][i]['nome']==compositor['periodo']):
                    encontrado=True
                else:
                    i+=1

            if encontrado==False:
                new_period={}
                new_period['id']=f"p{count_period}"
                count_period+=1
                new_period['nome']=compositor['periodo']
                db['periodos_musicais'].append(new_period)
                db['compositores'].append(compositor)
            else:
                compositor['periodo_id']=db["periodos_musicais"][i]['id']
                db['compositores'].append(compositor)

    
    with open("new_db.json", 'w+',encoding='utf-8') as new_file:
        json.dump(db, new_file, indent=2,ensure_ascii=False)

# Example usage
file_path = "compositores.json"
create_new_db(file_path)
