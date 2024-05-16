# 1.1
### Formatação
Troquei o nome do campo "idcontrato" por _id por este se tratar de um identificador unico.

### Comandos para colocar no Mongo
~~~
docker cp contratos.json mongoEW:/tmp
docker exec -it mongoEW bash
mongoimport -d contratos -c contratos /tmp/contratos.json --jsonArray
~~~
### Para verificar a importação correu bem
~~~
mongosh
show dbs
use contratos
db.contratos.find()
~~~

# 1.2

### 1
~~~
db.contratos.countDocuments()
~~~

### 2
~~~
db.contratos.countDocuments({ "tipoprocedimento": "Ajuste Direto Regime Geral" })
~~~

### 3
~~~
db.contratos.distinct("entidade_comunicante").sort()
~~~

### 4
~~~
db.suaColecao.aggregate([
  { $group: { _id: "$tipoprocedimento", total: { $sum: 1 } } }
])
~~~

### 5
~~~
db.contratos.aggregate([
  {
    $addFields: {
      precoContratualNumber: { $toDouble: { $replaceAll: { input: "$precoContratual", find: ",", replacement: "." } } }
    }
  },
  {
    $group: {
      _id: "$entidade_comunicante",
      montante_total: { $sum: "$precoContratualNumber" }
    }
  }
])
~~~

# Como foram geradas as aplicações
~~~
npx express-generator <\nome> --view=pug
cd <\nome>
npm install
npm install jsonfile
npm install multer
npm install -i
npm install mongoose
npm install axios
npm start
~~~
