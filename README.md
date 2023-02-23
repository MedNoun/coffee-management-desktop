# Project Name: Yummy

Yummy is a desktop application for restaurant and coffee place management.

## Features
- [x] Add / Remove products and subproducts
- [x] Update products or subproducts.
- [x] Bills History Navigation for each user using pagination.
- [x] Add and Remove elements from the current bill.
- [x] Create a bill and launch it
- [x] Login for Admin or Server
- [x] Synchronized login for admin between remote backend and local backend
- [ ] Stats
- [ ] Register Server
- [ ] Change user information
- [ ] Printing

## Technologies

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/) [![NestJS logo](https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg)](https://nestjs.com/) ![Sqlite Icon](https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg)

## Installation
### Getting Started

*Clone this repository locally:*

``` bash
git clone https://github.com/MedNoun/yummy.git
```

*install the dependencies and start the application:*

```bash
cd app/ && npm install && cd .. && npm install && npm start
```

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

Currently runs with:

- Angular v13.2.4
- Electron v17.1.0


Why two package.json ? This project follow [Electron Builder two package.json structure](https://www.electron.build/tutorials/two-package-structure) in order to optimize final bundle and be still able to use Angular `ng add` feature.

Here is a preview of the application running in local :

https://user-images.githubusercontent.com/54535672/220906733-3874f7ae-b7cc-4bb1-a590-d2ee46a39b91.mp4


## Shout out to [Maxime Gris](https://github.com/maximegris/angular-electron) for his easy to use boilerplate for an angular electron project

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/maximegris/angular-electron/blob/main/LICENSE.md
