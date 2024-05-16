import csv
import json
import sys

def passar_para_json(nome_arquivo):
    # Lista para armazenar os objetos JSON
    contratos = []

    # Abra o arquivo CSV e leia as linhas
    with open(nome_arquivo, newline='', encoding='utf-8') as csvfile:
        # Especifique o separador, que é ';' no seu caso
        reader = csv.DictReader(csvfile, delimiter=';')
        
        # Processar cada linha do CSV
        for row in reader:
            # Renomear o campo 'idcontrato' para '_id'
            if 'idcontrato' in row:
                row['_id'] = row.pop('idcontrato')
            contratos.append(row)

    # Saída da lista de objetos JSON ou salvar em um arquivo JSON
    print(contratos)

    # Para salvar em um arquivo JSON
    with open('contratos.json', 'w', encoding='utf-8') as jsonfile:
        json.dump(contratos, jsonfile, indent=2)

    print("Arquivo JSON salvo com sucesso.")

# Verifica se o nome do arquivo foi passado como argumento de linha de comando
if len(sys.argv) < 2:
    print("Por favor, forneça o nome do arquivo CSV como argumento.")
    sys.exit(1)

# Chama a função passar_para_json com o nome do arquivo como argumento
passar_para_json(sys.argv[1])
