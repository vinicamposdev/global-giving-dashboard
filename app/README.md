Necessário nodejs instalado. Após isso instale as dependencias usando:

> npm install

Instale o postgres na sua máquina. Mas se for usuário de docker, pode rodar:

> docker run --name ps-database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

É necessário uma api key do GlobalGiving site, e após isso coloca-lo em config.js.
Uma explicação de como está

Para rodar o script para passar os dados dos Temas para o banco Postgres, rode:

> node app/models/themes.js
