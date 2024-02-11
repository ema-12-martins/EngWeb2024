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
#...................................................Pagina principal.............................................

htlm_principal_pag=html

#Para selecioanr todos as ruas
list_street = [x for x in os.listdir("texto")]
list_street_without_mod=list_street.copy()

# Colocar os nomes das ruas direitos
i=0
lenght_list_street=len(list_street)
while i < lenght_list_street:
    list_street[i] = list_street[i][7:-4]

    j = 0
    lenght_elem_list_street = len(list_street[i]) 
    while j < lenght_elem_list_street:
        if list_street[i][j].isupper() and j > 0:
            list_street[i] = list_street[i][:j] + " " + list_street[i][j:]
            j+=1
        j += 1
    i+=1  

#Ordenar alfabeticamente as ruas
list_street.sort()


#Fazer uma lista com todos os nomes das ruas em html
htlm_principal_pag+="<ul>"
htlm_principal_pag+="<h1>Selecione uma das ruas para obter mais informações!</h1>"
for street in list_street:
    htlm_principal_pag+=f"<li>{street}</li>"

#Para terminar a pagina principal
htlm_principal_pag+="</ul>"
htlm_principal_pag+="</body>"
htlm_principal_pag+="</html>"

#Para criar a pagina propriamente dita
file = open("pagina_principal.html","w",encoding="utf-8")
file.write(htlm_principal_pag)
file.close()

#................................................Paginas das ruas.........................................

#Criar pasta para os as paginas das ruas
if not os.path.exists("paginas_ruas"):
    os.mkdir("paginas_ruas")

# Carregar o arquivo XML
i=0
while i<lenght_list_street:
    tree = ET.parse(f"texto/{list_street_without_mod[i]}")
    root = tree.getroot()

    nome_pagina=f"html{i+1}"
    html_pagina_rua=html
    



    i+=1


