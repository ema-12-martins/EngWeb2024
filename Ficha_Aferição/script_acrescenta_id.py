import json

def acrescenta_ids(caminho):
    objetos=[]
    contador = 1

    file = open(caminho, "r", encoding="utf-8").read()
    content = json.loads(file)
    
    for elem in content["pessoas"]:
        elem["_id"] = contador
        contador+=1
        objetos.append(elem)
    

    new_file = open("novo_dataset.json", "w", encoding="utf-8")
    json.dump(objetos,new_file,indent=2)
    
acrescenta_ids("datasets/dataset.json")