import json
import sys
from pymongo import MongoClient


def acrescenta_na_bd(nome_bd,nome_collection,nome_file):
    # Conexão com o MongoDB
    client = MongoClient('localhost', 27017) #Porta do mongo
    db = client[nome_bd]  # Substitua pelo nome do seu banco de dados
    collection = db[nome_collection]      # Substitua pelo nome da sua coleção

    # Caminho do arquivo JSON
    json_file = nome_file  # Substitua pelo caminho do seu arquivo JSON

    # Função para carregar dados do JSON para o MongoDB
    def load_json_to_mongodb(json_file, collection):
        with open(json_file, 'r') as file:
            data = json.load(file)
            collection.insert_many(data)

    # Chamada da função para carregar os dados
    load_json_to_mongodb(json_file, collection)

    print("Dados carregados com sucesso no MongoDB.")


nome_bd = input("Introduza nome da bd")
nome_collection = input("Introduza nome da colecao")
nome_file = input("Introduza nome do ficheiro a acrescentar")
acrescenta_na_bd(nome_bd,nome_collection,nome_file)

