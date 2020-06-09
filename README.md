# bookmarkets

Bookmarklets are tiny snippets of Javascript code that are saved as bookmarks. They run like
inline scripts, and are a convenient shortcut for opening developer tools and copy-pasting code
into the console.

The problem is that my bookmarklets quickly grew in complexity, and I wanted a way to store them
in source control. And, I wanted them to sync with my various browsers on various machines (without
needing to opt into Chrome/Firefox browser sync ability).

Then, I discovered that Github serves raw code content, with liberal CORS headers. Huzzah! This way,
I can use Github to source control the javascript code, then setup my bookmarklets to source my code
off Github and run them in the browser. The security of this setup will be based off who can make
modifications to this repository (which seems fair for personal use bookmarklets).

Feel free to fork as necessary!

## Setup

Use https://mrcoles.com/bookmarklet/ to encode the following snippet:

```javascript
fetch("https://raw.githubusercontent.com/domanchi/bookmarklets/master/bookmarklets/paywall.js")
    .then((response) => { return response.text(); })
    .then((body) => {eval(body);})
```

As I slowly migrate more bookmarklets to this repository, I will perhaps provide an easier way
to do this, and remove a "third party" dependency.