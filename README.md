# NCCWSC/CASC Projects

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

## Development server

### Initial setup

In the source directory:

```
nvm install 8.5.0 
npm install -g @angular/cli@1
npm install typescript@'>=2.1.0 <2.4.0’
npm install
```

### Run

```
nvm use 8.5.0
ng build
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Environment settings are stored in src/environments, including service path directories, version, etc.

To build for PRODUCTION:

npm run build

To build for BETA:

ng build --environment=beta --base-href /projects

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
