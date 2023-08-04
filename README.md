# BrasalChallengeBackEnd


## Como rodar o projeto ?

1. Clone o projeto via ssh/https ou baixe e extrai o arquivo .zip
2. Baixe as depedências do projeto com 

``` npm install```

Atenção: Versão antigas do node (14-) podem apresentar alguma falha ao baixar as depedências do projeto

3. Execute a aplicação com

``` npm run dev```


Atenção: Talvez seja necessário modificações no arquivo .ENV para conectar com seu MongoDB local, trocar 0.0.0.0 por localhost

4. A API pode ser testado no postman/insomnia no domínio base: http://0.0.0.0:8000/api/&{restoDaRotaQueVcDesejaUsar}
