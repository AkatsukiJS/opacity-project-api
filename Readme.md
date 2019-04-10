# Opacity Project :squirrel:

<div align="center">

![travis](https://travis-ci.org/AkatsukiJS/opacity-project-api.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/AkatsukiJS/opacity-project-api/badge.svg?branch=feature-improvements)](https://coveralls.io/github/AkatsukiJS/opacity-project-api?branch=feature-improvements)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

A example of API for data of servers from **"Portal da Transparência"**. For didactic purposes and simplicity, we're filtering only servers of UFPI.

The source of data is in: [Servidores - Portal Transparência](http://www.portaltransparencia.gov.br/download-de-dados/servidores).

In this project was utilized [Koajs2](https://koajs.com/), [LokiJS](http://lokijs.org/) and [Jest](https://jestjs.io/)

## Generate output data :wrench:

As a example, unpack the `data/20180131_data.tar.xz` for testing the tables of 01/2018 obtained in link above.

After this, will have the files `data/20180131_Cadastro.csv` and `data/20180131_Remuneracao.csv`

For generate the JSON files **required by application**, run:

`yarn generate`

> Depends on of files `data/20180131_Cadastro.csv` and `data/20180131_Remuneracao.csv`

### Output

The output files generated use data from tables of "Cadastro" and "Remuneração" from servers filtered by a ID of the Organization UFPI (26279):

- `output/registers.json`
  - A Object with key=Id_SERVIDOR_PORTAL and value=data_register_of_server
- `output/servers.json`
  - A List of Objects with data merge from table of "Cadastro" and "Remuneração".
- `output/categories.json`
  - A List of categories from servidores sorted by quantity.

```
.
├── data
│   ├── 20180131_Cadastro.csv
│   ├── 20180131_data.tar.xz
│   ├── 20180131_Remuneracao.csv
│   └── source
├── db
│   ├── fillDB.js
│   ├── getCategories.js
│   ├── getServers.js
│   └── index.js
├── LICENSE
├── output
│   ├── categories.json
│   ├── registers.json
│   └── servers.json
├── package.json
├── Readme.md
├── src
│   ├── app.js
│   ├── index.js
│   └── routes.js
```

## API :rocket:

### Install dependencies
`yarn install`

### Run in dev mode
`yarn api:dev`

### Run in prod mode
`yarn api:start`

### Details

| URL | Method | Response |
| --  | --     | -----      |
| `/`  |  `GET` |  `"hello friend"` |
| `/categories` |  `GET` | List of categories: <br> `[{key, label, count}]` |
| `/category` |  `GET` | List of servers in according with the params (see below in `/category`) |
| `/info` |  `GET` | `{ month_year_version, remuneration_dictionary, register_dictionary, data_source, api_repository, servers_endpoint }` |

#### `/category` parameters details

| Param | Type | Default  | Description |
| --    | --   | --       | ----------- |
| offset  | int  | 0        | base index from list returned,<br> **[offset, offset + limit)** <br> (zero indexed) |
| limit  | int  | 10        | size of list to be returned |
| category  | string  |       | select a category of servers obtained in `/categories`|
| sort_by  | string  | 'NAME'  | Allow sort the list by **NAME**, <br>**R_BRUTE** (Brute remuneration) and <br> **R_LIQUID** (Liquid remuneration) |
| order_by  | string  | 'ASC'  | whether to sort **DESC** (descending) or **ASC** (ascending) |


##### Server Object model

```json
{
   "id":"999999",
   "cadastro":{
      "NOME":"FULANO DE TAL",
      "CPF":"***.008.299-**",
      "MATRICULA":"003****",
      "DESCRICAO_CARGO":"PROFESSOR DO MAGISTERIO SUPERIOR",
      "CLASSE_CARGO":"7",
      "REFERENCIA_CARGO":"00",
      "PADRAO_CARGO":"",
      "NIVEL_CARGO":"701",
      "SIGLA_FUNCAO":"-1",
      "NIVEL_FUNCAO":"-1",
      "FUNCAO":"Sem informação",
      "CODIGO_ATIVIDADE":"-1",
      "ATIVIDADE":"Sem informação",
      "OPCAO_PARCIAL":"",
      "COD_UORG_LOTACAO":"26279000000153",
      "UORG_LOTACAO":"DEPARTAMENTO DE FILOSOFIA/CCHL",
      "COD_ORG_LOTACAO":"26279",
      "ORG_LOTACAO":"UNIVERSIDADE FEDERAL DO PIAUI",
      "COD_ORGSUP_LOTACAO":"15000",
      "ORGSUP_LOTACAO":"MINISTERIO DA EDUCACAO",
      "COD_UORG_EXERCICIO":"26279000000153",
      "UORG_EXERCICIO":"DEPARTAMENTO DE FILOSOFIA/CCHL",
      "COD_ORG_EXERCICIO":"26279",
      "ORG_EXERCICIO":"UNIVERSIDADE FEDERAL DO PIAUI",
      "COD_ORGSUP_EXERCICIO":"15000",
      "ORGSUP_EXERCICIO":"MINISTERIO DA EDUCACAO",
      "TIPO_VINCULO":"2",
      "SITUACAO_VINCULO":"ATIVO PERMANENTE",
      "DATA_INICIO_AFASTAMENTO":"",
      "DATA_TERMINO_AFASTAMENTO":"",
      "REGIME_JURIDICO":"REGIME JURIDICO UNICO",
      "JORNADA_DE_TRABALHO":"DEDICACAO EXCLUSIVA",
      "DATA_INGRESSO_CARGOFUNCAO":"15/01/2009",
      "DATA_NOMEACAO_CARGOFUNCAO":"",
      "DATA_INGRESSO_ORGAO":"18/12/2008",
      "DOCUMENTO_INGRESSO_SERVICOPUBLICO":"2057",
      "DATA_DIPLOMA_INGRESSO_SERVICOPUBLICO":"15/01/2009",
      "DIPLOMA_INGRESSO_CARGOFUNCAO":"",
      "DIPLOMA_INGRESSO_ORGAO":"PORTARIA",
      "DIPLOMA_INGRESSO_SERVICOPUBLICO":"PORTARIA",
      "UF_EXERCICIO":"PI"
   },
   "remuneracao":{
      "ANO":"2018",
      "MES":"01",
      "Id_SERVIDOR_PORTAL":"999999",
      "CPF":"***.008.299-**",
      "NOME":"FULANO DE TAL",
      "REMUNERAÇÃO BÁSICA BRUTA (R$)":29414.54,
      "REMUNERAÇÃO BÁSICA BRUTA (U$)":"0,00",
      "ABATE-TETO (R$)":"0,00",
      "ABATE-TETO (U$)":"0,00",
      "GRATIFICAÇÃO NATALINA (R$)":"0,00",
      "GRATIFICAÇÃO NATALINA (U$)":"0,00",
      "ABATE-TETO DA GRATIFICAÇÃO NATALINA (R$)":"0,00",
      "ABATE-TETO DA GRATIFICAÇÃO NATALINA (U$)":"0,00",
      "FÉRIAS (R$)":"0,00",
      "FÉRIAS (U$)":"0,00",
      "OUTRAS REMUNERAÇÕES EVENTUAIS (R$)":"0,00",
      "OUTRAS REMUNERAÇÕES EVENTUAIS (U$)":"0,00",
      "IRRF (R$)":"-3137,46",
      "IRRF (U$)":"0,00",
      "PSS/RPGS (R$)":"-2614,55",
      "PSS/RPGS (U$)":"0,00",
      "DEMAIS DEDUÇÕES (R$)":"-2839,57",
      "DEMAIS DEDUÇÕES (U$)":"0,00",
      "PENSÃO MILITAR (R$)":"0,00",
      "PENSÃO MILITAR (U$)":"0,00",
      "FUNDO DE SAÚDE (R$)":"0,00",
      "FUNDO DE SAÚDE (U$)":"0,00",
      "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (R$)":"0,00",
      "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (U$)":"0,00",
      "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)":20822.96,
      "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (U$)":"0,00",
      "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (R$)(*)":"582,33",
      "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (U$)(*)":"0,00",
      "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (R$)(*)":"0,00",
      "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (U$)(*)":"0,00",
      "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (R$)":"0,00",
      "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (U$)":"0,00",
      "TOTAL DE VERBAS INDENIZATÓRIAS (R$)(*)":"582,33",
      "TOTAL DE VERBAS INDENIZATÓRIAS (U$)(*)":"0,00"
   }
}
```

##### For more details about attributes of the objects

> REMUNERAÇÂO: http://www.portaltransparencia.gov.br/pagina-interna/603423-dicionario-de-dados-servidores-remuneracao

> CADASTRO: http://www.portaltransparencia.gov.br/pagina-interna/603422-dicionario-de-dados-servidores-cadastro

### Examples :thinking:

#### /categories [GET]

```sh
curl localhost:3001/categories
```

**Response**
> List of all categories

``` json
[
  {
    "label":"PROFESSOR DO MAGISTERIO SUPERIOR",
    "key":"PROFESSOR_DO_MAGISTERIO_SUPERIOR",
    "count":1547
  },
  {
    "label":"ASSISTENTE EM ADMINISTRACAO",
    "key":"ASSISTENTE_EM_ADMINISTRACAO",
    "count":309
  },
  {
    "label":"PROFESSOR MAGISTERIO SUPERIOR-SUBSTITUTO",
    "key":"PROFESSOR_MAGISTERIO_SUPERIOR_SUBSTITUTO",
    "count":264
  },
  ...
]
```

#### /category [GET]

> List of servers from category "PROFESSOR DO MAGISTERIO SUPERIOR" sorted by Brute remuneration in order descending, with the list containing elements of indexes from 10 at 19

```sh
curl -X GET -G -d \
"category=PROFESSOR_DO_MAGISTERIO_SUPERIOR&\
offset=10&\
limit=10&\
sort_by=R_BRUTE&\
order_by=DESC" localhost:3001/category
```

**Response**

```json
{
  "results": [Server],
  "has_more_pages": true,
  "category": "PROFESSOR DO MAGISTERIO SUPERIOR",
  "offset": 10
}
```
> Server is as the model example shown above in **Server Object Model**

#### /info [GET]

> Some informations about utilized data in API

```sh
curl localhost:3001/info
```

**Response**

```json
{
  "month_year_version": "01-2018",
  "remuneration_dictionary": "http://www.portaltransparencia.gov.br/pagina-interna/603423-dicionario-de-dados-servidores-remuneracao",
  "register_dictionary": "http://www.portaltransparencia.gov.br/pagina-interna/603422-dicionario-de-dados-servidores-cadastro",
  "data_source": "http://www.portaltransparencia.gov.br/download-de-dados/servidores",
  "api_repository": "https://github.com/AkatsukiJS/opacity-project-api",
  "servers_endpoint": "http://www.portaltransparencia.gov.br/servidores/:id"
}
```

## License

The source code is licensed under **MIT**. License is available [here](https://github.com/AkatsukiJS/opacity-project-api/blob/master/LICENSE)

</br>

Made with :stuck_out_tongue_closed_eyes: by <a href="https://github.com/akatsukijs">@akatsukijs</a>