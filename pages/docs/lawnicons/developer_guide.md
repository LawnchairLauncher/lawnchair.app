## Contributing code
While adding icons is the main focus for most contributors, code-related contributions are welcome.

Before building the app, ensure that you create the icon drawables by running:

```sh
./gradlew svg-processor:run
```

Afterwards, you can build the app by selecting the `appDebug` build variant.

Here are a few contribution tips:
- [The `app` module](https://github.com/LawnchairLauncher/lawnicons/tree/develop/app) contains most of Lawnicons' core code, while [the `svg-processor` module](https://github.com/LawnchairLauncher/lawnicons/tree/develop/svg-processor) contains the code that converts the SVGs inside the `svgs` folder into Android Drawables. Generally, the `app` module is where you should make most of your contributions.

- You can use either Java or, preferably, Kotlin.

- Make sure your code is logical and well formatted. If using Kotlin, see ["Coding conventions"](https://kotlinlang.org/docs/coding-conventions.html) in the Kotlin documentation.

- Set `develop` as the base branch for pull requests.

- Significant changes to the UI should be discussed on our [Lawnchair's Telegram group chat](https://t.me/lawnchairci). Generally, we want to keep things clean and simple.