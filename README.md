# Unite Planner

This is the source code behind [uniteplanner.com](https://uniteplanner.com/), a website that helps visitors plan around which sessions to watch from [Unity's Unite Conference](https://unite.unity.com/).

Currently, it features [Unite LA](https://unite.unity.com/2018/los-angeles)'s schedule. In the future, this might be adapted to work with other Unite conferences.

## TODO

* Make CSS support less idiotic (e.g. allow nesting)
* Add polyfills/babel - it's not using any
  * Use include() (enable in TS)
* Allow picking visual options
  * Add support for `useLocalTimezone`
* Allow selecting specific sessions
* Saves settings as hash/persistent data
* Add Google Analytics

## Contributing

Pull requests and issue creation are welcomed.

## Development

1. Install all dependencies

    ```shell
    yarn
    ```

2. Run the website locally

    ```shell
    yarn start
    ```

3. Modify files as needed


## Disclaimers

This project is not associated with or supported by Unity Technologies.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Create React App TypeScript](https://github.com/wmonk/create-react-app-typescript).

## License

[MIT](LICENSE.md).
