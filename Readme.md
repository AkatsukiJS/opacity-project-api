# Opacity Project :squirrel:

<div align="center">

[![Build Status](https://travis-ci.org/AkatsukiJS/opacity-project-api.svg?branch=master)](https://travis-ci.org/AkatsukiJS/opacity-project-api)
[![Coverage Status](https://coveralls.io/repos/github/AkatsukiJS/opacity-project-api/badge.svg?branch=master)](https://coveralls.io/github/AkatsukiJS/opacity-project-api?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

A example of API for data of servers from **"Portal da Transparência"**. For didactic purposes and simplicity, we're filtering only servers of UFPI.

The source of data is in: [Servidores - Portal Transparência](http://www.portaltransparencia.gov.br/download-de-dados/servidores).

In this project was utilized [Koajs2](https://koajs.com/), [LokiJS](http://lokijs.org/) and [Jest](https://jestjs.io/)

## Scripts

### `yarn install`
> Install dependencies

### `yarn api:dev`
> Run in development mode (port 3001 - default)

### `yarn api:start`
> Run in production mode (port 3001 - default)

### `yarn generate`
> Generate the JSON files required for the API


## API :rocket:

### Data requirement

#### Generate output data :wrench:

As a example, unpack the `data/20180131_data.tar.xz` for testing the tables of 01/2018 obtained in link above.

After this, will have the files `data/20180131_Cadastro.csv` and `data/20180131_Remuneracao.csv`

For generate the JSON files **required by application**, run:

```sh
yarn generate
```

> The API Depends on of files `data/20180131_Cadastro.csv` and `data/20180131_Remuneracao.csv`

#### Output

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

### Endpoints

#### / [GET]
> Hello friend

**Request**

```sh
curl -X GET localhost:3001/
```

**Response**

- Schema

    ```json
    {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "string"
    }
    ```

- Example

    ```json
    Hello friend
    ```

#### /info [GET]

> Information about utilized data in API

**Request**

```sh
curl -X GET localhost:3001/info
```

**Response**

- Schema

  ```json
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "month_year_version": { "type": "string" },
      "remuneration_dictionary": { "type": "string" },
      "register_dictionary": { "type": "string" },
      "data_source": { "type": "string" },
      "api_repository": { "type": "string" },
      "servers_endpoint": { "type": "string" }
    }
  }
  ```

- Example

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

#### /categories [GET]
> List of all categories

**Request**

```sh
curl -X GET localhost:3001/categories
```

**Response**

- Schema

    ```json
    {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "array",
      "items": { "$ref": "#/definitions/categoryInfo" },
      "definitions": {
        "categoryInfo": {
          "type": "object",
          "properties": {
            "label": { "type": "string" },
            "key": { "type": "string" },
            "count": { "type": "integer" }
          }
        }
      }
    }

    ```
- Example

    ```json
    [
      {
        "label": "PROFESSOR DO MAGISTERIO SUPERIOR",
        "key": "PROFESSOR_DO_MAGISTERIO_SUPERIOR",
        "count": 1547
      },
      {
        "label": "ASSISTENTE EM ADMINISTRACAO",
        "key": "ASSISTENTE_EM_ADMINISTRACAO",
        "count": 309
      },
      {
        "label": "PROFESSOR MAGISTERIO SUPERIOR-SUBSTITUTO",
        "key": "PROFESSOR_MAGISTERIO_SUPERIOR_SUBSTITUTO",
        "count": 264
      },
      {
        "label": "Sem informação",
        "key": "SEM_INFORMACAO",
        "count":196
      }
    ]
    ```

#### /category [GET]
>  List of servers in according with params of query

**Request**

```sh
curl -X GET -G -d \
"category=PROFESSOR_DO_MAGISTERIO_SUPERIOR&\
offset=10&\
limit=2&\
sort_by=R_BRUTE&\
order_by=DESC" localhost:3001/category
```

or

```sh
curl -X GET \
"localhost:3001/category?category=PROFESSOR_DO_MAGISTERIO_SUPERIOR&offset=10&limit=2&sort_by=R_BRUTE&order_by=DESC"
```

Parameters details

| Param | Type | Default  | Description |
| --    | --   | --       | ----------- |
| offset  | int  | 0        | base index from list returned,<br> **[offset, offset + limit)** <br> (zero indexed) |
| limit  | int  | 10        | size of list to be returned |
| category  | string  |       | select a category of servers obtained in GET `/categories`|
| sort_by  | string  | 'NAME'  | Allow sort the list by **NAME**, <br>**R_BRUTE** (Brute remuneration) and <br> **R_LIQUID** (Liquid remuneration) |
| order_by  | string  | 'ASC'  | whether to sort **DESC** (descending) or **ASC** (ascending) |



**Response**

- Schema

    ```json
    {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "results": {
            "type": "array",
            "items": { "$ref": "#/definitions/server" }
        },
        "has_more_pages": { "type": "boolean" },
        "offset": { "type": "integer" },
        "category": { "type": "string" }
      },
      "definitions": {
        "server": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "cadastro": {
                "type": "object",
                "properties": {
                  "NOME": { "type": "string" },
                  "CPF": { "type": "string" },
                  "MATRICULA": { "type": "string" },
                  "DESCRICAO_CARGO": { "type": "string" },
                  "CLASSE_CARGO": { "type": "string" },
                  "REFERENCIA_CARGO": { "type": "string" },
                  "PADRAO_CARGO": { "type": "string" },
                  "NIVEL_CARGO": { "type": "string" },
                  "SIGLA_FUNCAO": { "type": "string" },
                  "NIVEL_FUNCAO": { "type": "string" },
                  "FUNCAO": { "type": "string" },
                  "CODIGO_ATIVIDADE": { "type": "string" },
                  "ATIVIDADE": { "type": "string" },
                  "OPCAO_PARCIAL": { "type": "string" },
                  "COD_UORG_LOTACAO": { "type": "string" },
                  "UORG_LOTACAO": { "type": "string" },
                  "COD_ORG_LOTACAO": { "type": "string" },
                  "ORG_LOTACAO": { "type": "string" },
                  "COD_ORGSUP_LOTACAO": { "type": "string" },
                  "ORGSUP_LOTACAO": { "type": "string" },
                  "COD_UORG_EXERCICIO": { "type": "string" },
                  "UORG_EXERCICIO": { "type": "string" },
                  "COD_ORG_EXERCICIO": { "type": "string" },
                  "ORG_EXERCICIO": { "type": "string" },
                  "COD_ORGSUP_EXERCICIO": { "type": "string" },
                  "ORGSUP_EXERCICIO": { "type": "string" },
                  "TIPO_VINCULO": { "type": "string" },
                  "SITUACAO_VINCULO": { "type": "string" },
                  "DATA_INICIO_AFASTAMENTO": { "type": "string" },
                  "DATA_TERMINO_AFASTAMENTO": { "type": "string" },
                  "REGIME_JURIDICO": { "type": "string" },
                  "JORNADA_DE_TRABALHO": { "type": "string" },
                  "DATA_INGRESSO_CARGOFUNCAO": { "type": "string" },
                  "DATA_NOMEACAO_CARGOFUNCAO": { "type": "string" },
                  "DATA_INGRESSO_ORGAO": { "type": "string" },
                  "DOCUMENTO_INGRESSO_SERVICOPUBLICO": { "type": "string" },
                  "DATA_DIPLOMA_INGRESSO_SERVICOPUBLICO": { "type": "string" },
                  "DIPLOMA_INGRESSO_CARGOFUNCAO": { "type": "string" },
                  "DIPLOMA_INGRESSO_ORGAO": { "type": "string" },
                  "DIPLOMA_INGRESSO_SERVICOPUBLICO": { "type": "string" },
                  "UF_EXERCICIO": { "type": "string" }
                }
              },
              "remuneracao": {
                "type": "object",
                "properties": {
                  "ANO": { "type": "string" },
                  "MES": { "type": "string" },
                  "Id_SERVIDOR_PORTAL": { "type": "string" },
                  "CPF": {"type": "string" },
                  "NOME": {"type": "string" },
                  "REMUNERAÇÃO BÁSICA BRUTA (R$)": { "type" : "number" },
                  "REMUNERAÇÃO BÁSICA BRUTA (U$)": { "type": "string" },
                  "ABATE-TETO (R$)": { "type": "string" },
                  "ABATE-TETO (U$)": { "type": "string" },
                  "GRATIFICAÇÃO NATALINA (R$)": { "type": "string" },
                  "GRATIFICAÇÃO NATALINA (U$)": { "type": "string" },
                  "ABATE-TETO DA GRATIFICAÇÃO NATALINA (R$)": { "type": "string" },
                  "ABATE-TETO DA GRATIFICAÇÃO NATALINA (U$)": { "type": "string" },
                  "FÉRIAS (R$)": { "type": "string" },
                  "FÉRIAS (U$)": { "type": "string" },
                  "OUTRAS REMUNERAÇÕES EVENTUAIS (R$)": { "type": "string" },
                  "OUTRAS REMUNERAÇÕES EVENTUAIS (U$)": { "type": "string" },
                  "IRRF (R$)": { "type": "string" },
                  "IRRF (U$)": { "type": "string" },
                  "PSS/RPGS (R$)": { "type": "string" },
                  "PSS/RPGS (U$)": { "type": "string" },
                  "DEMAIS DEDUÇÕES (R$)": { "type": "string" },
                  "DEMAIS DEDUÇÕES (U$)": { "type": "string" },
                  "PENSÃO MILITAR (R$)": { "type": "string" },
                  "PENSÃO MILITAR (U$)": { "type": "string" },
                  "FUNDO DE SAÚDE (R$)": { "type": "string" },
                  "FUNDO DE SAÚDE (U$)": { "type": "string" },
                  "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (R$)": { "type": "string" },
                  "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (U$)": { "type": "string" },
                  "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)": { "type": "number" },
                  "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (U$)": { "type": "string" },
                  "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (R$)(*)": { "type": "string" },
                  "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (U$)(*)": { "type": "string" },
                  "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (R$)(*)": { "type": "string" },
                  "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (U$)(*)": { "type": "string" },
                  "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (R$)": { "type": "string" },
                  "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (U$)": { "type": "string" },
                  "TOTAL DE VERBAS INDENIZATÓRIAS (R$)(*)": { "type": "string" },
                  "TOTAL DE VERBAS INDENIZATÓRIAS (U$)(*)": { "type": "string" }
                }
              }
            }
          }
        }
      }
    ```


> `has_more_pages` indicates if has more pages

> `offset` is the next offset to be utilized

> `category`is the current category

- Example

    ```json
    {
      "results":[
        {
          "id":"0000000",
          "cadastro":{
            "NOME":"FULANO DE TAL",
            "CPF":"***.089.883-**",
            "MATRICULA":"011****",
            "DESCRICAO_CARGO":"PROFESSOR DO MAGISTERIO SUPERIOR",
            "CLASSE_CARGO":"6",
            "REFERENCIA_CARGO":"00",
            "PADRAO_CARGO":"",
            "NIVEL_CARGO":"604",
            "SIGLA_FUNCAO":"-1",
            "NIVEL_FUNCAO":"-1",
            "FUNCAO":"Sem informação",
            "CODIGO_ATIVIDADE":"-1",
            "ATIVIDADE":"Sem informação",
            "OPCAO_PARCIAL":"",
            "COD_UORG_LOTACAO":"-3",
            "UORG_LOTACAO":"Inválido",
            "COD_ORG_LOTACAO":"26279",
            "ORG_LOTACAO":"UNIVERSIDADE FEDERAL DO PIAUI",
            "COD_ORGSUP_LOTACAO":"15000",
            "ORGSUP_LOTACAO":"MINISTERIO DA EDUCACAO",
            "COD_UORG_EXERCICIO":"26279000000056",
            "UORG_EXERCICIO":"SUPERINTENDENCIA DE RECURSOS HUMANOS/SRH",
            "COD_ORG_EXERCICIO":"26279",
            "ORG_EXERCICIO":"UNIVERSIDADE FEDERAL DO PIAUI",
            "COD_ORGSUP_EXERCICIO":"15000",
            "ORGSUP_EXERCICIO":"MINISTERIO DA EDUCACAO",
            "TIPO_VINCULO":"2",
            "SITUACAO_VINCULO":"APOSENTADO",
            "DATA_INICIO_AFASTAMENTO":"",
            "DATA_TERMINO_AFASTAMENTO":"",
            "REGIME_JURIDICO":"REGIME JURIDICO UNICO",
            "JORNADA_DE_TRABALHO":"DEDICACAO EXCLUSIVA",
            "DATA_INGRESSO_CARGOFUNCAO":"01/03/2013",
            "DATA_NOMEACAO_CARGOFUNCAO":"",
            "DATA_INGRESSO_ORGAO":"04/05/1971",
            "DOCUMENTO_INGRESSO_SERVICOPUBLICO":"000258/71",
            "DATA_DIPLOMA_INGRESSO_SERVICOPUBLICO":"04/05/1971",
            "DIPLOMA_INGRESSO_CARGOFUNCAO":"",
            "DIPLOMA_INGRESSO_ORGAO":"PORTARIA",
            "DIPLOMA_INGRESSO_SERVICOPUBLICO":"PORTARIA",
            "UF_EXERCICIO":"-1"
          },
          "remuneracao":{
            "ANO":"2018",
            "MES":"01",
            "Id_SERVIDOR_PORTAL":"0000000",
            "CPF":"***.089.883-**",
            "NOME":"FULANO DE TAL",
            "REMUNERAÇÃO BÁSICA BRUTA (R$)":31862.42,
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
            "IRRF (R$)":"-3408,51",
            "IRRF (U$)":"0,00",
            "PSS/RPGS (R$)":"-2780,33",
            "PSS/RPGS (U$)":"0,00",
            "DEMAIS DEDUÇÕES (R$)":"-3196,10",
            "DEMAIS DEDUÇÕES (U$)":"0,00",
            "PENSÃO MILITAR (R$)":"0,00",
            "PENSÃO MILITAR (U$)":"0,00",
            "FUNDO DE SAÚDE (R$)":"0,00",
            "FUNDO DE SAÚDE (U$)":"0,00",
            "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (R$)":"0,00",
            "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (U$)":"0,00",
            "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)":22477.48,
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
        },
        {
          "id":"0000001",
          "cadastro":{
            "NOME":"FULANA DE TAL",
            "CPF":"***.141.604-**",
            "MATRICULA":"062****",
            "DESCRICAO_CARGO":"PROFESSOR DO MAGISTERIO SUPERIOR",
            "CLASSE_CARGO":"4",
            "REFERENCIA_CARGO":"00",
            "PADRAO_CARGO":"",
            "NIVEL_CARGO":"602",
            "SIGLA_FUNCAO":"-1",
            "NIVEL_FUNCAO":"-1",
            "FUNCAO":"Sem informação",
            "CODIGO_ATIVIDADE":"-1",
            "ATIVIDADE":"Sem informação",
            "OPCAO_PARCIAL":"",
            "COD_UORG_LOTACAO":"26279000000283",
            "UORG_LOTACAO":"COORD CURSO G ENGENHARIA MECANICA/CT",
            "COD_ORG_LOTACAO":"26279",
            "ORG_LOTACAO":"UNIVERSIDADE FEDERAL DO PIAUI",
            "COD_ORGSUP_LOTACAO":"15000",
            "ORGSUP_LOTACAO":"MINISTERIO DA EDUCACAO",
            "COD_UORG_EXERCICIO":"26279000000192",
            "UORG_EXERCICIO":"CENTRO DE TECNOLOGIA / UFPI",
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
            "DATA_INGRESSO_CARGOFUNCAO":"16/10/2015",
            "DATA_NOMEACAO_CARGOFUNCAO":"",
            "DATA_INGRESSO_ORGAO":"09/10/2015",
            "DOCUMENTO_INGRESSO_SERVICOPUBLICO":"1883",
            "DATA_DIPLOMA_INGRESSO_SERVICOPUBLICO":"16/10/2015",
            "DIPLOMA_INGRESSO_CARGOFUNCAO":"",
            "DIPLOMA_INGRESSO_ORGAO":"PORTARIA",
            "DIPLOMA_INGRESSO_SERVICOPUBLICO":"PORTARIA",
            "UF_EXERCICIO":"-1"
          },
          "remuneracao":{
            "ANO":"2018",
            "MES":"01",
            "Id_SERVIDOR_PORTAL":"0000001",
            "CPF":"***.141.604-**",
            "NOME":"FULANA DE TAL",
            "REMUNERAÇÃO BÁSICA BRUTA (R$)":31851.91,
            "REMUNERAÇÃO BÁSICA BRUTA (U$)":"0,00",
            "ABATE-TETO (R$)":"0,00",
            "ABATE-TETO (U$)":"0,00",
            "GRATIFICAÇÃO NATALINA (R$)":"0,00",
            "GRATIFICAÇÃO NATALINA (U$)":"0,00",
            "ABATE-TETO DA GRATIFICAÇÃO NATALINA (R$)":"0,00",
            "ABATE-TETO DA GRATIFICAÇÃO NATALINA (U$)":"0,00",
            "FÉRIAS (R$)":"172,70",
            "FÉRIAS (U$)":"0,00",
            "OUTRAS REMUNERAÇÕES EVENTUAIS (R$)":"0,00",
            "OUTRAS REMUNERAÇÕES EVENTUAIS (U$)":"0,00",
            "IRRF (R$)":"-2251,16",
            "IRRF (U$)":"0,00",
            "PSS/RPGS (R$)":"-2263,47",
            "PSS/RPGS (U$)":"0,00",
            "DEMAIS DEDUÇÕES (R$)":"-6911,34",
            "DEMAIS DEDUÇÕES (U$)":"0,00",
            "PENSÃO MILITAR (R$)":"0,00",
            "PENSÃO MILITAR (U$)":"0,00",
            "FUNDO DE SAÚDE (R$)":"0,00",
            "FUNDO DE SAÚDE (U$)":"0,00",
            "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (R$)":"0,00",
            "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (U$)":"0,00",
            "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)":20598.64,
            "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (U$)":"0,00",
            "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (R$)(*)":"695,52",
            "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (U$)(*)":"0,00",
            "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (R$)(*)":"0,00",
            "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (U$)(*)":"0,00",
            "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (R$)":"0,00",
            "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (U$)":"0,00",
            "TOTAL DE VERBAS INDENIZATÓRIAS (R$)(*)":"695,52",
            "TOTAL DE VERBAS INDENIZATÓRIAS (U$)(*)":"0,00"
          }
        }
      ],
      "has_more_pages":true,
      "category":"PROFESSOR DO MAGISTERIO SUPERIOR",
      "offset":12
    }
    ```

##### For more details about attributes of the objects

> REMUNERAÇÂO: http://www.portaltransparencia.gov.br/pagina-interna/603423-dicionario-de-dados-servidores-remuneracao

> CADASTRO: http://www.portaltransparencia.gov.br/pagina-interna/603422-dicionario-de-dados-servidores-cadastro


## License

The source code is licensed under **MIT**. License is available [here](https://github.com/AkatsukiJS/opacity-project-api/blob/master/LICENSE)

</br>

Made with :stuck_out_tongue_closed_eyes: by <a href="https://github.com/akatsukijs">@akatsukijs</a>