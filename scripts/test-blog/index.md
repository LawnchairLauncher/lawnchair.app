---
title: LC-FM Title
description: LC-FM Description
authors:
  - generic
  - lawnchair-team
  - lawnicons-team
first_published: 2077-01-23
last_modified: 2025-07-23
---

<!-- CM Comment! -->

<toc-inline></toc-inline>

<!-- ToC Inline only work with ToC Script! -->

Decoration escape \*Italicised\* to \*\*Bold\*\*

*CM Italicised* / _CM Italicised (alternative)_

**CM Bold** / __CM Bold (alternative)__

***Markdown Italicised + Bold***

> CM Blockquote

CM List
* List 0
* List 1
* List 2
	* Nested list 0
	* Nested list 1
		* Nested-ed list 0
		* Nested-ed list 1

CM Bullet point
1. Point 0
2. Point 1
	0. Nested point 0
	1. Nested point 1
		0. Nested-ed point 0
		1. Nested-ed point 1

![CM alt (accessibility reader)](/images/blog-15-beta/dock-customization-example.jpg "CM alt (tooltip)")

![CM alt (accessibility reader)][ex-link-ref]

[CM Link (Standard)](https://example.com)

[CM Link (Reference)][ex-link-ref]

[ex-link]: https://example.com

[ex-link-ref]: /images/blog-15-beta/dock-customization-example.jpg "CM alt (Reference tooltip)"

```md
# CM Codeblock (md)

<!-- Hi! -->
```

```py
print("CM Codeblock (py)")

# Hi!
```

    CM Codeblock (alternative)

	Hi!

`CM Inline code`

CM Separator

---

CM Separator (Alternative)

***

# CM h1

CM h1 (Alternative)
===================

## CM h2

CM h2 (Alternative)
-------------------

### CM h3

#### CM h4

##### CM h5

###### CM h6

Inline HTML

<p>Hi</p>

<bold>HTML bold</bold>

GFM Tasklist
- [x] 🧋 Lawnchair Bubble Tea
  - [ ] Tapioca
  - [x] Milk
  - [ ] Tea
- [ ] Lawnchair Cinnamon Tea

~~GFM Strikethrough~~

> [!TIP]
> GFM Admonition tip!

> [!NOTE]
> GFM Admonition note!

> [!IMPORTANT]
> GFM Admonition important!

> [!WARNING]
> GFM Admonition warning!

> [!CAUTION]
> GFM Admonition caution!

GFM Table: Auto aligned

| Column 1     | Column 2 |
|--------------|----------|
| Row 1.1      | Row 2.1  |
| Row 1.2      | Row 2.2  |
| Row 1.3      | Row 2.3  |

GFM Table: Left

| Column 1     | Column 2 |
|:-------------|:---------|
| Row 1.1      | Row 2.1  |
| Row 1.2      | Row 2.2  |
| Row 1.3      | Row 2.3  |

GFM Table: Right

| Column 1     | Column 2 |
|-------------:|---------:|
| Row 1.1      | Row 2.1  |
| Row 1.2      | Row 2.2  |
| Row 1.3      | Row 2.3  |

GFM Table: Center

| Column 1     | Column 2 |
|:------------:|:--------:|
| Row 1.1      | Row 2.1  |
| Row 1.2      | Row 2.2  |
| Row 1.3      | Row 2.3  |

GFM footnote[^1].

[^1]: GFM reference
