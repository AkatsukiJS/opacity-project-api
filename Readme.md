# Opacity Project :squirrel:

A example of API for data of servers from "Portal da Transparência". For didactic purposes and simplicity, we're filtering only servers of UFPI.

The source of data is in: [Servidores - Portal Transparência](http://www.portaltransparencia.gov.br/download-de-dados/servidores).

## Generate output data :wrench:
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


## API :rocket:

### Install dependencies
`yarn install`

### Run :: dev mode
`yarn api:dev`

### Details

| URL | Method | Body   | Response |
| --  | --     | --  | -----      |
| `/`  |  `GET` |        | "hello friend" |
| `/categories` |  `GET` | | List of categories: <br> `[{key, count}]` |
| `/category` |  `POST` | `from` <br> `category` <br> `desc` <br> `order_by` | List of max size 10  [ Server ] <br> in according with the params |

#### `/category` parameters details

| Param | Type | Default  | Description |
| --    | --   | --       | ----------- |
| from  | int  | 0        | base index from list returned,<br> **[from, from + 10)** <br> (zero indexed) |
| category  | string  |       | select a category of servers obtained in `/categories`|
| desc  | boolean  | false  | whether to sort descending |
| order_by  | string  | 'NAME'  | Allow sort the list by **NAME**, <br>**R_BRUTE** (Brute remuneration) and <br> **R_LIQUID** (Liquid remuneration) |


##### Server Object model

```json
{
    "Id_SERVIDOR_PORTAL": "9999999",
    "cadastro": {
        "NOME": "FULANO DE TAL",
        "CPF": "***.******-**",
        "MATRICULA": "******",
        "DESCRICAO_CARGO": "PROFESSOR MAGISTERIO SUPERIOR-SUBSTITUTO",
        "CLASSE_CARGO": "4",
        "REFERENCIA_CARGO": "00",
        "PADRAO_CARGO": "",
        "NIVEL_CARGO": "401",
        "SIGLA_FUNCAO": "-1",
        "NIVEL_FUNCAO": "-1",
        "FUNCAO": "Sem informação",
        "CODIGO_ATIVIDADE": "-1",
        "ATIVIDADE": "Sem informação",
        "OPCAO_PARCIAL": "",
        "COD_UORG_LOTACAO": "26279000000140",
        "UORG_LOTACAO": "DEPARTAMENTO DE MATEMATICA/CCN",
        "COD_ORG_LOTACAO": "26279",
        "ORG_LOTACAO": "UNIVERSIDADE FEDERAL DO PIAUI",
        "COD_ORGSUP_LOTACAO": "15000",
        "ORGSUP_LOTACAO": "MINISTERIO DA EDUCACAO",
        "COD_UORG_EXERCICIO": "26279000000140",
        "UORG_EXERCICIO": "DEPARTAMENTO DE MATEMATICA/CCN",
        "COD_ORG_EXERCICIO": "26279",
        "ORG_EXERCICIO": "UNIVERSIDADE FEDERAL DO PIAUI",
        "COD_ORGSUP_EXERCICIO": "15000",
        "ORGSUP_EXERCICIO": "MINISTERIO DA EDUCACAO",
        "TIPO_VINCULO": "2",
        "SITUACAO_VINCULO": "CONT.PROF.SUBSTITUTO",
        "DATA_INICIO_AFASTAMENTO": "",
        "DATA_TERMINO_AFASTAMENTO": "",
        "REGIME_JURIDICO": "CONTRATO TEMPORARIO",
        "JORNADA_DE_TRABALHO": "40 HORAS SEMANAIS",
        "DATA_INGRESSO_CARGOFUNCAO": "30/05/2016",
        "DATA_NOMEACAO_CARGOFUNCAO": "",
        "DATA_INGRESSO_ORGAO": "25/05/2016",
        "DOCUMENTO_INGRESSO_SERVICOPUBLICO": "712",
        "DATA_DIPLOMA_INGRESSO_SERVICOPUBLICO": "30/05/2016",
        "DIPLOMA_INGRESSO_CARGOFUNCAO": "",
        "DIPLOMA_INGRESSO_ORGAO": "PORTARIA",
        "DIPLOMA_INGRESSO_SERVICOPUBLICO": "PORTARIA",
        "UF_EXERCICIO": "PI"
    },
    "remuneracao": {
        "ANO": "2018",
        "MES": "01",
        "Id_SERVIDOR_PORTAL": "9999999",
        "CPF": "***.***.***-**",
        "NOME": "ABIMAEL AUGUSTO DOS SANTOS SILVA",
        "REMUNERAÇÃO BÁSICA BRUTA (R$)": "3552,08",
        "REMUNERAÇÃO BÁSICA BRUTA (U$)": "0,00",
        "ABATE-TETO (R$)": "0,00",
        "ABATE-TETO (U$)": "0,00",
        "GRATIFICAÇÃO NATALINA (R$)": "0,00",
        "GRATIFICAÇÃO NATALINA (U$)": "0,00",
        "ABATE-TETO DA GRATIFICAÇÃO NATALINA (R$)": "0,00",
        "ABATE-TETO DA GRATIFICAÇÃO NATALINA (U$)": "0,00",
        "FÉRIAS (R$)": "0,00",
        "FÉRIAS (U$)": "0,00",
        "OUTRAS REMUNERAÇÕES EVENTUAIS (R$)": "458,00",
        "OUTRAS REMUNERAÇÕES EVENTUAIS (U$)": "0,00",
        "IRRF (R$)": "-119,40",
        "IRRF (U$)": "0,00",
        "PSS/RPGS (R$)": "-390,72",
        "PSS/RPGS (U$)": "0,00",
        "DEMAIS DEDUÇÕES (R$)": "0,00",
        "DEMAIS DEDUÇÕES (U$)": "0,00",
        "PENSÃO MILITAR (R$)": "0,00",
        "PENSÃO MILITAR (U$)": "0,00",
        "FUNDO DE SAÚDE (R$)": "0,00",
        "FUNDO DE SAÚDE (U$)": "0,00",
        "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (R$)": "0,00",
        "TAXA DE OCUPAÇÃO IMÓVEL FUNCIONAL (U$)": "0,00",
        "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)": "3499,96",
        "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (U$)": "0,00",
        "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (R$)(*)": "0,00",
        "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - CIVIL (U$)(*)": "0,00",
        "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (R$)(*)": "0,00",
        "VERBAS INDENIZATÓRIAS REGISTRADAS EM SISTEMAS DE PESSOAL - MILITAR (U$)(*)": "0,00",
        "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (R$)": "0,00",
        "VERBAS INDENIZATÓRIAS PROGRAMA DESLIGAMENTO VOLUNTÁRIO  MP 792/2017 (U$)": "0,00",
        "TOTAL DE VERBAS INDENIZATÓRIAS (R$)(*)": "0,00",
        "TOTAL DE VERBAS INDENIZATÓRIAS (U$)(*)": "0,00"
    }
}
```

##### For more details about attributes of the objects

> REMUNERAÇÂO: http://www.portaltransparencia.gov.br/pagina-interna/603423-dicionario-de-dados-servidores-remuneracao

> CADASTRO: http://www.portaltransparencia.gov.br/pagina-interna/603422-dicionario-de-dados-servidores-cadastro

### Examples :thinking:

#### /categories [GET]
```shell
curl localhost:3001/categories
```

**Output**
> List of all categories
``` json
[{"key":"PROFESSOR DO MAGISTERIO SUPERIOR","count":1547},{"key":"ASSISTENTE EM ADMINISTRACAO","count":309},{"key":"PROFESSOR MAGISTERIO SUPERIOR-SUBSTITUTO","count":264},{"key":"Sem informação","count":196},{"key":"TECNICO DE LABORATORIO AREA","count":111},{"key":"PROFESSOR ENS BASICO TECN TECNOLOGICO","count":95},{"key":"VIGILANTE","count":59},
...
```


#### /category [POST]
> List of servers from category "PROFESSOR DO MAGISTERIO SUPERIOR" sorted by Brute remuneration in order descending, with the list containing elements of indexes from 10 at 19
```shell
curl -d\
"category=PROFESSOR DO MAGISTERIO SUPERIOR&\
from=10&\
desc=true&\
order_by=R_BRUTE" localhost:3001/category
```



Made with :stuck_out_tongue_closed_eyes: by <a href="https://github.com/akatsukijs">@akatsukijs</a>