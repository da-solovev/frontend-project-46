### Hexlet tests and linter status:
[![Actions Status](https://github.com/da-solovev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/da-solovev/frontend-project-46/actions)
[![Actions Status](https://github.com/da-solovev/frontend-project-46/actions/workflows/run-check.yml/badge.svg)](https://github.com/da-solovev/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f3cba2f3bd3397bcbb2/maintainability)](https://codeclimate.com/github/da-solovev/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9f3cba2f3bd3397bcbb2/test_coverage)](https://codeclimate.com/github/da-solovev/frontend-project-46/test_coverage)

## Описание
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например  [http://www.jsondiff.com/](http://www.jsondiff.com/). Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Возможности утилиты:

-   Поддержка разных входных форматов: yaml, json
-   Генерация отчета в виде plain text, stylish и json

## Setup
```
make install
```
## Запуск
### Stylish format
```
gendiff filepath1 filepath2
```
[![asciicast](https://asciinema.org/a/FSKg2ga1YLyVMRd48KyNKQieX.svg)](https://asciinema.org/a/FSKg2ga1YLyVMRd48KyNKQieX)
### Plain format
```
gendiff filepath1 filepath2 --format plain
```
[![asciicast](https://asciinema.org/a/49cIcWa8mR1YFBapPGLDoFeUy.svg)](https://asciinema.org/a/49cIcWa8mR1YFBapPGLDoFeUy)
### JSON format
```
gendiff filepath1 filepath2 --format json
```
[![asciicast](https://asciinema.org/a/H3nD8P6Uj1Fi7hKE2cwDo6HE1.svg)](https://asciinema.org/a/H3nD8P6Uj1Fi7hKE2cwDo6HE1)