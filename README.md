# Board Games

## Vision

This is a small web app where you could play board games. The first games implemented are tic tac toe and Quarto.

Te goal is to make it easy to develop and add games as I go and try to build a framework for developing reasonable game AIs.

Maybe provide a interface for people to develop their own AIs to the games.

## Testing

The testing environment is based on `KarmaJS` and requires some packages that are not installed by default.

```
// install test suite libraries
npm run install:tdd
```

Single run test:

```
npm test
```

Continuous Integration: it runs the tests and watch for changes in the source code:

```
npm run tdd
```

## Test Coverage Report

Test coverage requires few more dependecies to be installed:

```
// install test coverage libraries
npm run install:cov
```

Then you can run:

```
npm run cov
```



