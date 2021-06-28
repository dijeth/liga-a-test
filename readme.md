# Тестовое задание. Лига А

## Описание
Проект реализует сервис по регистрации и авторизации пользователей.
Проект состоит из двух независимых модулей: api и ui.

### Модуль api
Реализует web и api интерфейсы сервиса регистрации пользователей.
После запуска web-интерфейс доступен по адресу `http://localhost:{PORT}`, api-интерфейс доступен по адресу `http://localhost:{PORT}/api`

### Модуль ui
Выполнен в виде spa.
После запуска приложение доступно по адресу `http://localhost:1338`

## Запуск

0. Запустить сервер mongodb

1. cd api
   npm i

2. cp .env.example .env

3. npm run start

4. cd ../ui
   npm i

5. npm run start:dev
