# Lawnchair Website

## Setup

Install Node.js (at least Node.js 20), then run `npm i` then `npm run build`

### Write from Markdown to HTML

Create a folder inside `blog` and place your markdown file in that folder then run `npm run build` to generate the HTMLified version of your markdown
and change your `{{title}}` and `{{description}}` to accurately reflect your documentation after that continue to update live information, blog selector, and sitemap.

#### Custom components

Lawnchair markdown renderer has extra components to extend the current CommonMark specifications:
 * Lawnchair metadata (Optional: Authorship(s), publish date, modified date):
 * Inlining Table of Contents (ToC) at any location: `<toc-inline></toc-inline>` (user override and disable toc globally by adding `?disabletoc=*` to the url param)
 * Admonitions: Quote block starting with `> [!TIP/NOTE/IMPORTANT/WARNING/CAUTION]` [(same as GitHub-flavored alerts)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)

##### Metadata

###### Frontmatter (markdown)

The frontmatter metadata is completely optional, supports displaying multiple authors, rendering published date and modified date using YYYY-MM-DD format.

```md
---
authors:
  - array1
  - array2
first_published: YYYY-MM-DD
last_modified: YYYY-MM-DD
---
```

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
