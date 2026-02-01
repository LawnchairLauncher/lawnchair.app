# Lawnchair Website

## Setup

Install Node runtime, Bun (tested for Bun 1.3.0) or Node.js (at least Node.js 20), then run `npm i`

> [!WARNING]
> For CI or production usage, you should not run `npm i` but `npm ci` (clean-install) instead for reproducible dependencies.

### Write from Markdown to HTML

Create a folder inside `blog` and place your markdown file in that folder then run `npm run build` to generate the HTMLified version of your markdown.
If your markdown has frontmatter with `title` and `description`, they will be automatically used for the page's `<title>` and meta description. Otherwise, `{{title}}` and `{{description}}` placeholders remain for you to fill in manually.

The sitemap and RSS feed is automatically updated with blog entries using `last_modified` or `first_published` from frontmatter (defaults to today if neither is present), for RSS feed the `title` and `description` will be omitted if none is specified.

After that, continue to update live information and blog selector.

#### Custom components

Lawnchair markdown renderer has extra components to extend the current CommonMark specifications:
 * Lawnchair frontmatter/metadata
 * Inlining Table of Contents (ToC) compatible page at any location: `<toc-inline></toc-inline>` (user override and disable toc globally by adding `?disabletoc=*` to the url param)
 * Admonitions: Quote block starting with `> [!TIP/NOTE/IMPORTANT/WARNING/CAUTION]` [(same as GitHub-flavored alerts)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)

##### Metadata

###### Frontmatter (markdown)

The frontmatter metadata is completely optional, supports displaying multiple authors, rendering published date and modified date using YYYY-MM-DD format.

```md
---
title: strings
description: strings
authors:
  - array1
  - array2
first_published: YYYY-MM-DD
last_modified: YYYY-MM-DD
---
```

> [!NOTE]
> If you specify title card and description card, you need to remove the title and description that's embedded in the markdown file, additionally the author card and metadata will be positioned below the description instead of finding the first nearest `h1` heading.

##### Authorship

The authorship metadata is required when you specify authors in markdown metadata

```jsonc
{
  "authors": [
    {
      "id": "generic",                                      // *Required
      "name": "Lawnchair Launcher Team",                    // *Required
      "role": "Administrator",                              // *Required
      "avatar": "/images/lawnchair.png",                    // Optional, supports URLs and local assets, and will not show an avatar when not specified
      "links": {                                            // Optional, will not show social(s) when not specified
        "github": "https://github.com/lawnchairlauncher",
        "x": "https://x.com/lawnchairapp",
        "mastodon": "https://mastodon.social/@lawnchairapp"
        /* Want to add more socials? 
           Add your icons to the asset, search for iconMap in scripts/build.js and configure it so that icon will render correctly for your socials */
      }
    }
  ]
}
```
