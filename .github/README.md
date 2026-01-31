# Lawnchair Website

This is the source code of the [official Lawnchair website](https://lawnchair.app).

If you are experiencing issues relating to Lawnchair or Lawnicons, please create an issue in the respective repositiories.

## Contributing

Contributions are always welcome. If you feel inclined to, feel free to submit a pull request.

In addition, you can also contribute by submitting issues. Please describe the issue with enough details and it will be solved as soon as possible.

## Static site generation

By default the site will let client render markdown to html, for faster performance you can opt for static site generation 
by pre-renders markdown to static HTML. Run the build to generate a deployable copy under `dist/` then run your webserver there.

```js
npm install
npm run build
```

> [!IMPORTANT]
> Always use `npm clean-install` instead of `npm install` for webserver

### Custom components

Lawnchair markdown renderer have extra components to extends the current CommonMark specifications:
 * Lawnchair metadata (Optional: Authorship(s), publish date, modified date):
 * Inlining Table of Contents (ToC) at any location: `<toc-inline></toc-inline>` (user override and disable toc globally by adding `?disabletoc=*` to the url param)
 * Admonitions: Quote block starting with `> [!TIP/NOTE/IMPORTANT/WARNING/CAUTION]` [(same as GitHub-flavored alerts)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)

#### Metadata

##### Markdown

The markdown metadata is completely optional, support displaying multiple authors, rendering published date and modified date using YYYY-MM-DD format (can be human readable format).

```md
<!--
Author: [array1, array2, ...]
First published: YYYY-MM-DD
Last modified: YYYY-MM-DD
-->
```

#### Authorship

The authorship metadata is required when you specify authors in markdown metadata

```jsonc
{
  "authors": [
    {
      "id": "generic",                                      // *Required
      "name": "Lawnchair Launcher Team",                    // *Required
      "role": "Administrator",                              // *Required
      "avatar": "/images/lawnchair.png",                    // Optional, support url and local assets, will not show avatar when not specified
      "links": {                                            // Optional, will not show social(s) when not specified
        "github": "https://github.com/lawnchairlauncher",
        "x": "https://x.com/lawnchairapp",
        "mastodon": "https://mastodon.social/@lawnchairapp"
        // Want to add more socials? Search for iconMap in markdown.js so that icon will render correctly for your socials
      }
    }
  ]
}
```
