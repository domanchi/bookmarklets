/**
 * This is a utility function to send media to the home music system.
 */
(function() {
    fetch(
        "https://jukebox-api.aaronloo.com/play-now/song",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `link=${document.location.href}`,
        }
    )
    .then((response) => {
        return new Promise((resolve, reject) => {
            if (!response.ok) {
                reject(response.json());
            }

            alert("Loaded!");
            resolve();
        });
    })
    .catch((data) => {
        alert(data.message);
    });
})();