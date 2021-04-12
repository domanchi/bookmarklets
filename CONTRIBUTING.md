# CONTRIBUTING

## Testing

```bash
$ python -m http.server
```

This spins up a local server that allows developers to test the bookmarklets without
needing to compile it beforehand. It *should* be designed to watch for latest file
changes, for an improved development experience. However, it doesn't have the necessary
metadata to perform a full integration test with some of the files (e.g. `paywall.js`
strips cookies, but there's no cookies to strip).