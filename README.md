## Api com Autenticação JWT

## Fabio Rodrigues, Luciano Cabral
## Matheus Froes,Luis Gabriel.

## Visão geral


```Esse projeto se baseia na construção de um caminho seguro de login para qualquer aplicação, que é capaz de criar um usuário e autenticar um usuário existente .
Ferramentas utilizadas



1.	JSON WEB TOKEN: O JWT é um padrão (RFC-7519) de mercado que define como transmitir e armazenar objetos JSON de forma compacta e segura entre diferentes aplicações. Os dados nele contidos podem ser validados a qualquer momento pois o token é assinado digitalmente. Especificamente em nossa aplicação, o JWT tem uma duração de 24h.
2.	Node.js: Node.js é uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis.
3.	Bcryptjs: bcrypt é um método de criptografia do tipo hash para senhas baseado no Blowfish. Utilizamos esta biblioteca desenvolvida em JavaScript para compararmos se a senha está correta.

4.	Sequelize: O Sequelize é um ORM (Object-Relational Mapper) para Node.js, que tem suporte aos bancos de dados PostgreSQL, MariaDB, MySQL, SQLite e MSSQL, como ORM ele faz o mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos Javascript.

```

