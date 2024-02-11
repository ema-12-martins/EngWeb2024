import os
import xml.etree.ElementTree as ET


#Cabecalho inicial do HTML
html='''
<!DOCTYPE htlm>
<html>
<head>
    <title>EngWeb2024</title>
    <meta charset="UTF-8">
</head>
<body>

'''

#Onde fica os nome das ruas
list_street=[]

#Para termos todos os nomes presentes nessa pagina
xml_names = [x for x in os.listdir("texto")]
xml_names.sort()
print(xml_names)

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
    html_street+=f"<h1>{street_name}</h1>"

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
print(list_street)
list_street=list(enumerate(list_street,start=1))
print(list_street)
list_street = sorted(list_street, key=lambda x: x[1])
print(list_street)

#...........................Criar a pagina principal................................................
html_principal_pag=html

html_principal_pag+="<ul>"
html_principal_pag+="<h1>Selecione uma das ruas para obter mais informações!</h1>"

i=0
while i < len(list_street):
    html_principal_pag+=f"<li><a href='paginas_ruas/{list_street[i][0]}.html'>{list_street[i][1]}</a></li>"
    i+=1

#Para terminar a pagina principal
html_principal_pag+="</ul>"
html_principal_pag+="</body>"
html_principal_pag+="</html>"

#Para criar a pagina propriamente dita
file = open("pagina_principal.html","w",encoding="utf-8")
file.write(html_principal_pag)
file.close()


