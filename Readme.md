# Opacity Project :thinking:

A example of API for data of servers from "Portal da Transparência". For didactic purposes and simplicity, we're filtering only servers of UFPI.

The source of data is in: [Servidores - Portal Transparência](http://www.portaltransparencia.gov.br/download-de-dados/servidores).

## Generate output data
Testing with tables obtained in link above:
```javascript
const CADASTRO_CSV = '20180131_Cadastro.csv';
const REMUNERACAO_CSV = '20180131_Remuneracao.csv';
```

### Generate
`yarn generate`

### Output
The output generated use data from tables of "Cadastro" and "Remuneração" from servers filtered by a ID of the Organization UFPI (26279):

- `output/registers.json`
  - A Object with key=Id_SERVIDOR_PORTAL and value=data_register_of_server
- `output/servers.json`
  - A List of Objects with data merge from table of "Cadastro" and "Remuneração".
- `output/categories.json`
  - A List of categories from servidores sorted by quantity.


## API

### Install dependencies
`yarn install`

### Run :: dev mode
`yarn api:dev`

### Details

| URL | Method | Reponse |
| --  | ---    | -----  |
| `/` |  `GET` | "hello friend" |
| `/categories` |  `GET` | List of categories: `[{key, count}]` |

### Example

```shell
curl localhost:3001/categories
```

##### Output
```
[{"key":"PROFESSOR DO MAGISTERIO SUPERIOR","count":1547,"meta":{"revision":0,"created":1545937444396,"version":0},"$loki":1},{"key":"ASSISTENTE EM ADMINISTRACAO","count":309,"meta":{"revision":0,"created":1545937444396,"version":0},"$loki":2},{"key":"PROFESSOR MAGISTERIO SUPERIOR-SUBSTITUTO","count":264,"meta":{"revision":0,"created":1545937444396,"version":0},"$loki":3}
...
```

Made with :pensive: by <a href="https://github.com/akatsukijs">@akatsukijs</a>