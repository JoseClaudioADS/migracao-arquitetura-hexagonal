## Exemplo de arquitetura hexagonal (projeto migrado)

#### Projeto criado para exemplificar uma migração de código com utilização da Arquitetura Hexagonal.

*Vídeo exibindo a migração do código, YouTube (canal Guerreiro Programador):* https://youtu.be/BxGgTs_OSEY

### Execução da aplicação
> Não esquecer de instalar as dependências da aplicação que estão descritas no package.json.

*A aplicação utiliza conexão com o banco de dados PostgreSQL. Conferir no arquivo '**.env**' as configurações para conexão. 
PS: criar uma tabela chamada **cadastros_tests** para execução dos testes. Desse modo teremos bases para fins diferentes.*

> Para gerar o schema do banco de dados na base sem ser testes. Utilizar os migrations contidos no código junto ao CLI do TypeORM. Guia disponível em: [https://typeorm.io/#/using-cli](https://typeorm.io/#/using-cli)

*Obs: para executar os testes não é necessário rodar os migrations, já deixei os testes prontos para isso.*

De qualquer forma deixei um script no package.json para ajudar a utilizar o CLI do TypeORM. Para gerar o schema, apenas executar o comando: `yarn typeorm migration:run`, caso utilize o Yarn. Ou  `npm run typeorm migration:run`, sem uso do Yarn.

#### Para rodar a aplicação basta executar o comando abaixo:
 - `yarn start:dev` (executará em modo de Watcher)

> Lembre-se, caso não utilize o Yarn, trocar por 'npm run < script >'

#### Para executar os testes:

 - `yarn test`

 
