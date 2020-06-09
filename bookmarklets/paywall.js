/**
 * This bypasses NYT paywall by deleting all your cookies.
 *
 * Unfortunately, you can't just read the articles on incognito because they are able to
 * detect whether you have an incognito window, and will show you a paywall if so.
 */
(function() {
    document.cookie.split("; ").forEach((cookie) => {
        //  Cookies are uniquely identified by their name, domain and path. (https://stackoverflow.com/a/2421786)
        //  Since we can't tell the domain and path of these values, we're just going to remove
        //  cookies for **all** combinations.
        const cookieBase = `${cookie.split("=")[0]}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;

        const domain = location.hostname.split(".");
        //  No site will be putting cookies on TLDs, so we don't need to go all the way to 0.
        while (domain.length > 1) {
            //  We add a prefix since location.pathname will often start with a `/`.
            //  Therefore, the resulting path array will start with an empty string.
            //  Furthermore, if we join [""], it will be an empty string, so we add another
            //  empty string at the beginning, so the last iteration will be "/".
            const path = ["", ...location.pathname.split("/")];
            while (path.length > 1) {
                document.cookie = `${cookieBase} domain=${domain.join(".")}; path=${path.join("/")}`;
                document.cookie = `${cookieBase} domain=.${domain.join(".")}; path=${path.join("/")}`;

                path.pop();
            }

            domain.shift();
        }
    });
})();