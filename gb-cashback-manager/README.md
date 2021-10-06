[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# gb-cashback-manager

Serviço responsável por agregar funcionalidades de cashback para revendedores.

## Dependências:
+ Node.JS `14.17.3`
+ NPM `6.14.13`

## Instalando pacotes

```bash
npm install
```

## Iniciando aplicação

```bash
npm start
```

## Rodando testes unitários

```bash
npm test
```
## Docker

Para executar com Docker, primeiro deve construir a imagem:

```bash
docker build -t gb-cashback-manager:latest .
```

Depois execute com:

```bash
docker run -p 9000:9000 -d gb-cashback-manager:latest
```

# Swagger

Swagger link:
http://localhost:9000/docs/swagger-ui