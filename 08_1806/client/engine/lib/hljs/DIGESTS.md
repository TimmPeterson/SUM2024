## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
  integrity="sha384-9mu2JKpUImscOMmwjm1y6MA2YsW3amSoFNYwKeUHxaXYKQ1naywWmamEGMdviEen"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"
  integrity="sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-Wjwd1YEG/PYlkLHTWIx+RlPK6XboMN3bEpveERJ8D8Z4RaNE02Ho19ZFrSRPGi0j /es/languages/cpp.js
sha384-Q4zTNH8WsDVdSZbiZtzWS1HmAUcvMSdTmth9Uqgfjmx7Qzw6B8E3lC9ieUbE/9u4 /es/languages/cpp.min.js
sha384-qEBJBMpLpivuXkjdfOfq0lG7X75kJAs7lBKNa+lwHTB5p/rmQdnqpaiP9jJ8A0zy /es/languages/glsl.js
sha384-M7Ef1sJ4SsC67Z22eDV84pAdQRp9VnynFqNtD8xry35mYsHET3AmeJXScLce0iJr /es/languages/glsl.min.js
sha384-J4Ge+xXjXgzbK2FP+OyzIGHLfKU/RR0+cH4JJCaczeLETtVIvJdvqfikWlDuQ66e /languages/cpp.js
sha384-LMyrRAiUz6we2SGvYrwDd4TJoJZ+m/5c+4n4E64KVkfWFcZdlrs4Wabr0crMesyy /languages/cpp.min.js
sha384-ZJ8K2T7Eu40AMSL5L2melYeL6dBE/QobNlRdRg04totelNOYMs3d2igwh2KXNXNC /languages/glsl.js
sha384-PkNQzkPieB8PCovDH3VAfEBO1RvFP6kPVFxLkO2soZ3MoAaf/TeKffj2vMLGxJlT /languages/glsl.min.js
sha384-76bnJJmR4JRcJT0BhKVmde8l53U3t4UPxpg/96w5izeJnB//5o6DLovrD04rKBtl /highlight.js
sha384-Eg1E5hgB08+5o7i/bDNRnzDXTPAIOKXM3yeAimFZtYo4OxJr9nbjXfNgblWTP2XB /highlight.min.js
```

