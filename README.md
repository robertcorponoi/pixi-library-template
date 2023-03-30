<div align="center">

# **Pixi Library Template**

A template for creating a library to be used in a Pixi application.

</div>

## **Tools**

The following tools are used to build the library and improve the development experience.

-   [Rollup](https://github.com/rollup/rollup) used to bundle the library.
-   [Typescript](https://github.com/microsoft/TypeScript) for type safety and a better development experience.
-   [ESLint](https://github.com/eslint/eslint) to find common issues in the code.
-   [Prettier](https://github.com/prettier/prettier) to enforce a consistent code style.
-   [Jest](https://github.com/facebook/jest) running tests and using fake timers to simulate game time passing.
-   [Testing Library](https://github.com/testing-library) to test user input.

## **Visual Studio Code Extensions**

The following extensions for code formatting and linting should be recommended to you if you open the project in Visual Studio Code:

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## **Concepts**

The following are concepts used throughout the library. This documentation is a work in progress so check back regularly for updates or post an issue for a concept that you think is missing documentation.

### **Bundling**

[Rollup](https://github.com/rollup/rollup) is used to create the bundle that is imported by Pixi applications using the library.

The [rollup.config.js](./rollup.config.js) determines how the bundle is created. In the config we tell Rollup that we want to create an `esm` bundle, with Typescript source, that outputs to a `dist` directory at the top level.

To create the bundle you can use either `npm run build` or `npm run build:watch`. The watch version is helpful in development as it watches for changes to the source and runs the build again when changes are detected.

**Note:** The `dist` directory is ignored in the `.gitignore`. This is because we don't need to commit this since it'll be created automatically when a user installs your package due to the `prepare` script in the [package.json](./package.json) file.

### **Testing**

Tests are located in the [test](./test/) directory. Tests can be run from the command line without a browser since we use [jest-environment-jsdom](https://github.com/facebook/jest/tree/main/packages/jest-environment-jsdom).

There are several parts to how testing works:

-   The [testing-library](https://github.com/testing-library) package is used to simulate key and mouse events. If you don't need this feel free to uninstall it.

-   We use [Jest](https://github.com/facebook/jest) to run the tests but also for fake timers. You'll notice in the `beforeEach` and `afterEach` sections, that we set up the Jest fake timers and then restore the real timers in between every test. There's also a note about an [issue](https://github.com/testing-library/react-hooks-testing-library/issues/631#issuecomment-1196616173) with the fake timers and testing-library but I'll follow the issue and update the tests as needed.

-   The jest environment we use is [jest-environment-jsdom](https://github.com/facebook/jest/tree/main/packages/jest-environment-jsdom) which lets us simulate a browser-like environment without having to run the tests in a browser.

-   The [jest-canvas-mock package](https://github.com/hustcc/jest-canvas-mock) is used so that the Pixi can be used in the tests.

-   We use the [pixi.js-legacy](https://www.npmjs.com/package/pixi.js-legacy) package instead of [pixi.js](https://github.com/pixijs/pixijs) because the test environment doesn't support everything needed by `pixi.js`. This shouldn't be an issue since it has the same functionality as `pixi.js`.

The tests can be run with `npm run test`.

## **Scripts**

The following scripts are available and can be used in the form of `npm run [script_name]`:

-   `build` - Creates the Rollup bundle for the library.
-   `build:watch` - Creates the Rollup bundle for the library and watches for changes to source, re-running the build whenever changes are made.
-   `test` - Runs the tests.

## **GitHub Actions**

The workflow at [.github/workflows/build-and-test.yml](./.github/workflows/build-and-test.yml) will run whenever a pull request is made.

This action will install the dependencies, create the build, and then run the tests.

## **Dependabot**

This template uses [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates) to create pull requests for dependencies that are out of date. The configuration file can be found at [.github/dependabot.yml](./.github/dependabot.yml).

## **Keeping Up To Date With Template Changes**

This template will be updated when dependencies need updating, new packages are added, and new or better concepts are found. To keep up with changes you might want from the template:

1. Add the template repository as a remote:

```sh
git remote add template git@github.com:robertcorponoi/react-template.git
```

2. Fetch the changes:

```sh
git fetch --all
```

3. Merge the changes from the main branch of the template repository:

```sh
git merge template/main
```

## **License**

[MIT](./LICENSE)
