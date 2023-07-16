## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Have postgresql installed

```bash
$ yarn install
# Runt this command if using postgresql through docker, this will setup
# postgresql image and container with details in the compose file. view coompose for more information
& yarn db:dev:restart
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
