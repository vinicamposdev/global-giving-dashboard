<h1 align="center">Global Giving Dashboard</h1>
<p align="center">
  <strong>Projeto para disciplina de COM231 - Banco de Dados II, Unifei</strong>
</p>

**Tier:** Descrição

O trabalho consiste no consumo e disponibilização de dados obtidos por uma API de Dados. 

### Objetivo
- Coletar dados de uma API de Dados, modelá-los utilizando o modelo relacional e orientado a
documentos, realizar a carga e otimização do banco de dados e implementar um relatório ad-hoc 
para apresentação desses dados.
- Dar suporte ao tomador de decisão, para que ele interprete de forma adequada os dados e, 
juntamente com sua experiência e conhecimento do negócio, chegue a conclusões assertivas 
sobre o problema. O tipo de análise depende do tipo de dado da organização. No contexto de 
inteligência do negócio, Cruz (2017) cita algumas dessas técnicas, das quais interessa a 
este projeto : relatórios padrão (standard reporting), dashboards e relatórios ad hoc.

   Although this is true of all apps, its even more the case here since each
user that abandons the site represents the loss of an opportunity to do good
(see ['What is Web Site Conversion?](##useful-links-and-resources)) below.

## Metodologia
- Etapa 1
-   [ ] Estudar as APIs de dados
-   [ ] Escolher uma API para utilizar no trabalho, garantindo que nenhum outro grupo já está utilizando
a mesma

- Etapa 2
-   [ ] Estudar os dados da API e definir quais serão consumidos
-   [ ] Gerar um modelo relacional a partir dos dados consumidos
-   [ ] Gerar um modelo orientado a documentos a partir dos dados consumidos
-   [ ] Implementar o banco de dados relacional
-   [ ] Implementar o banco orientado a documentos

- Etapa 3
-   [ ] Desenvolver uma aplicação para consumir os dados da API
-   [ ] Dar carga no banco de dados
-   [ ] Otimizar o banco de dados

- Etapa 4
-   [ ] Estudar sobre Relatórios Ad-Hoc
-   [ ] Implementar uma aplicação que gere Relatórios Ad-Hoc dinamicamente para a base de dados
analisada

- Etapa 5
-   [ ] Avaliar a performance dos bancos relacional e orientado a documentos utilizando o JMeter

- Etapa 6
-   [ ] Apresentar os resultados obtidos nas etapas 3, 4, 5 e 6

## Api a ser usada



- [Global Giving API](https://www.globalgiving.org/api/)
- Exemplo JSON returnado:
```
{
    "projects": {
        "hasNext": true,
        "nextProjectId": 13,
        "project": [
            {
                "id": 2,
                "organization": {
                    "totalProjects": 0,
                    "themes": {},
                    "countries": {}
                },
                "active": false,
                "title": "Poor women micro-enterprise development-Indonesia",
                "summary": "Helping 150 poor Indonesian women in 14 villages to help themselves out of poverty by running a 3-day course with their local NGO teaching basic business skills like accounting and product packaging.",
                "contactName": "Toby Beresford",
                "contactTitle": "Managing Director",
                "contactAddress": "MicroAid Projects Charity",
                "contactAddress2": "Unit 11 DRCA, Business Centre",
                "contactCity": "London",
                "contactState": "United Kingdom",
                "contactPostal": "SW11 5HD",
                "contactCountry": "United Kingdom",
                "contactUrl": "http://www.microaidprojects.org.uk",
                "projectLink": "https://www.globalgiving.org/projects/poor-women-micro-enterprise-development-indonesia/",
                "progressReportLink": "https://www.globalgiving.org/projects/poor-women-micro-enterprise-development-indonesia/updates/",
                "themeName": "Economic Growth",
                "country": "Indonesia",
                "iso3166CountryCode": "ID",
                "region": "Asia and Oceania",
                "goal": 3046.00,
                "funding": 3071.00,
                "remaining": 0.00,
                "numberOfDonations": 32,
                "status": "funded",
                "need": "35 million people in Indonesia live below the poverty line with little or no income. Indonesia is a beautiful country where both Christians and Muslims live side by side. Take Murni for example, a vulnerable woman living on an income below $2 a day. In poor villages simple illnesses like diarrhea can be fatal. When a woman has an income she can pay for medical care.",
                "longTermImpact": "150 poor families will take the first step out of poverty.",
                "activities": "150 families will be trained in basic business skills.",
                "additionalDocumentation": "https://www.globalgiving.org/pfil/2/projdoc.doc",
                "imageLink": "https://www.globalgiving.org/pfil/2/pict.jpg",
                "imageGallerySize": 11,
                "approvedDate": "2003-05-16T12:57:20-04:00",
                "modifiedDate": "2020-10-14T07:29:39-04:00",
                "numberOfReports": 1,
                "dateOfMostRecentReport": "2007-01-04T14:30:46-05:00",
                "countries": {
                    "country": [
                        {
                            "name": "Indonesia",
                            "iso3166CountryCode": "ID"
                        }
                    ]
                },
                "image": {
                    "title": "Poor women micro-enterprise development-Indonesia",
                    "id": 0,
                    "imagelink": [
                        {
                            "url": "https://www.globalgiving.org/pfil/2/pict_grid1.jpg",
                            "size": "small"
                        },
                        {
                            "url": "https://www.globalgiving.org/pfil/2/pict_thumbnail.jpg",
                            "size": "thumbnail"
                        },
                        {
                            "url": "https://www.globalgiving.org/pfil/2/pict_med.jpg",
                            "size": "medium"
                        },
                        {
                            "url": "https://www.globalgiving.org/pfil/2/pict_grid7.jpg",
                            "size": "large"
                        },
                        {
                            "url": "https://www.globalgiving.org/pfil/2/pict_large.jpg",
                            "size": "extraLarge"
                        },
                        {
                            "url": "https://www.globalgiving.org/pfil/2/pict_original.jpg",
                            "size": "original"
                        }
                    ]
                },
                "themes": {
                    "theme": [
                        {
                            "id": "ecdev",
                            "name": "Economic Growth"
                        }
                    ]
                },
                "type": "project"
            }],
        "numberFound": 33793
    }
```
