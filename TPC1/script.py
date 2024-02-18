import os
import xml.etree.ElementTree as ET
import re

# Função para remover tags XML de uma string
def remove_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)


#Cabecalho inicial do HTML
html='''
<!DOCTYPE htlm>
<html>
<head>
    <title>EngWeb2024</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>

'''

#Onde fica os nome das ruas
list_street=[]

#Para termos todos os nomes presentes nessa pagina
xml_names = [x for x in os.listdir("texto")]
xml_names.sort()

#Criar pasta para os as paginas das ruas
if not os.path.exists("paginas_ruas"):
    os.mkdir("paginas_ruas")

#Trabalhar sobre cada XML
i=0
while i < len(xml_names):

    # Carregar o arquivo XML
    tree = ET.parse(f"texto/{xml_names[i]}")
    root = tree.getroot()

    # Encontrar o elemento 'nome' dentro de 'meta'
    street_name = root.find('./meta/nome').text
    list_street.append(street_name)

    #........................................Criar a pagina desta rua.........................................
    html_street=html
    html_street+="<ul>"

    #Nome
    html_street+=f"<h1>{street_name}</h1>"

    # Encontrar todos os elementos 'para'
    html_street+="<h3>Descrição:</h3>"
    for para in root.findall('.//para'):
        # Obter o texto dentro do elemento 'para'
        texto_para = ET.tostring(para, encoding='unicode', method='text')
        
        # Remover as tags XML do texto e adicionar ao texto final
        texto_final = remove_tags(texto_para.strip())

        # Adicionar o texto ao HTML
        html_street += f"<p>{texto_final}</p>"
    html_street += f"<br><br>"

    if len(root.findall('.//casa')) > 0:
        # Para as casas
        html_street += "<h3>Casas:</h3>"
        html_street += "<table style='max-width: 100%; margin-left: 20px; border-collapse: collapse;'>"
        
        # Cabeçalho da tabela
        html_street += "<tr>"
        html_street += "<th style='border: 1px solid black; padding: 8px;'>Número</th>"
        html_street += "<th style='border: 1px solid black; padding: 8px;'>Enfiteuta</th>"
        html_street += "<th style='border: 1px solid black; padding: 8px;'>Foro</th>"
        html_street += "<th style='border: 1px solid black; padding: 8px;'>Descrição</th>"
        html_street += "</tr>"

        for casa in root.findall('.//casa'):
            html_street += "<tr>"
            
            numero_element = casa.find('número')
            if numero_element is not None:
                numero = numero_element.text
                html_street += f"<td style='border: 1px solid black; padding: 8px;'>{numero}</td>"
            else:
                html_street += "<td style='border: 1px solid black; padding: 8px;'></td>"

            enfiteuta_element = casa.find('enfiteuta')
            if enfiteuta_element is not None:
                enfiteuta = enfiteuta_element.text
                html_street += f"<td style='border: 1px solid black; padding: 8px;'>{enfiteuta}</td>"
            else:
                html_street += "<td style='border: 1px solid black; padding: 8px;'></td>"
            
            foro_element = casa.find('foro')
            if foro_element is not None:
                foro = foro_element.text
                html_street += f"<td style='border: 1px solid black; padding: 8px;'>{foro}</td>"
            else:
                html_street += "<td style='border: 1px solid black; padding: 8px;'></td>"
            
            descricao_element = casa.find('desc')
            if descricao_element is not None:
                html_street += "<td style='border: 1px solid black; padding: 8px;'>"
                for para in descricao_element.findall('para'):
                    descricao_limpa = remove_tags(ET.tostring(para, encoding='unicode', method='text').strip())
                    html_street += f"<p>{descricao_limpa}</p>"
                html_street += "</td>"
            else:
                html_street += "<td style='border: 1px solid black; padding: 8px;'></td>"

            html_street += "</tr>"

        html_street += "</table>"


        html_street += f"<br><br>"
        html_street += f"</pre>"

    # Encontrar todas as figuras
    figuras = root.findall('.//figura')

    if figuras:
        html_street += f"<h3>Imagens:</h3>"
        
        for figura in figuras:
            # Iterar sobre as figuras
            figura_id = figura.get('id')
            imagem_path = figura.find('imagem').get('path')
            legenda = figura.find('legenda').text
            html_street += f"<img src='{imagem_path}' alt='Imagem indisponível' style='max-width: 45%; height: auto;margin-right: 5%;'>"

    html_street += f"<br><br><br>"


    # Listar todos os arquivos no diretoria
    list_img=[]
    for nome_arquivo in os.listdir("atual"):
        if re.match(f"{str(i+1).zfill(2)}-.*", nome_arquivo):
            caminho_imagem = os.path.join("atual", nome_arquivo)
            list_img.append(caminho_imagem)
    #Se existirem imagens atuais, entao estas vao ser exibidas
    if list_img:
        #Fotos atuais
        html_street += f"<h3>Fotos atuais da rua:</h3>"
        for img in list_img:
            html_street += f"<img src='../{img}' alt='Imagem indisponível' style='max-width: 45%; height: auto;margin-right: 5%;'>"   


    #Para terminar a pagina principal
    html_street+="</ul>"
    html_street+="</body>"
    html_street+="</html>"

    #Para criar a pagina propriamente dita
    file = open(f"paginas_ruas/{i+1}.html","w",encoding="utf-8")
    file.write(html_street)
    file.close()

    i+=1


#Ordenar alfabeticamente as ruas e para associar aos nomes das paginas
list_street=list(enumerate(list_street,start=1))
list_street = sorted(list_street, key=lambda x: x[1])

#...........................Criar a pagina principal................................................
html_principal_pag=html

html_principal_pag+="<ul>"
html_principal_pag+="<h1>Selecione uma das ruas para obter mais informações!</h1>"

i=0
while i < len(list_street):
    html_principal_pag+=f"<li><a href='paginas_ruas/{list_street[i][0]}.html' >{list_street[i][1]}</a></li>"
    i+=1

#Para terminar a pagina principal
html_principal_pag+="</ul>"
html_principal_pag+="</body>"
html_principal_pag+="</html>"

#Para criar a pagina propriamente dita
file = open("pagina_principal.html","w",encoding="utf-8")
file.write(html_principal_pag)
file.close()


