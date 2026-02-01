# Lawnchair Website

## Setup

Install Node runtime, Bun (tested for Bun 1.3.0) or Node.js (at least Node.js 20), then run `npm i`

> [!WARNING]
> For CI or production usage, you should not run `npm i` but `npm ci` (clean-install) instead for reproducible dependencies.

### Write from Markdown to HTML

Create a folder inside `blog` and place your markdown file in that folder then run `npm run build` to generate the HTMLified version of your markdown.
If your markdown has frontmatter with `title` and `description`, they will be automatically used for the page's `<title>` and meta description. Otherwise, `{{title}}` and `{{description}}` placeholders remain for you to fill in manually.

The blog index, sitemap and RSS feed is automatically updated with blog entries using `last_modified` or `first_published` from frontmatter (defaults to today if neither is present), for RSS feed the `title` and `description` will be omitted if none is specified.

> [!NOTE]
> The script does not update live information, please manually update the data with the blog that you want to show.

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
> The `title` and `description` in frontmatter are the single source of truth. The build script generates the h1 heading and description paragraph from these values, so you should **not** include a duplicate `# Title` in your markdown content. Author cards and metadata are positioned below the generated title/description.

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

#### Testing

To test the rendering of CommonMark (CM), GitHub-Flavored Markdown (GFM), Lawnchair frontmatter (LC-FM)

Move the `/scripts/test-blog` to `/blog` folder and build the documents.
