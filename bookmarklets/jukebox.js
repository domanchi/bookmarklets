/**
 * This is a utility function to send media to the home music system.
 * This is an interesting bit of hackery: since this domain is only accessible
 * on the private network, we need to figure out a way to make HTTP requests
 * from HTTPS origins.
 *
 * One alternative is to have HTTPS certificates on local machines. However,
 * this is not ideal because it means you'll have to copy private keys
 * from publicly accessible boxes around. We can also use self-signed certs,
 * but this would require all clients to install your cert (which is also
 * annoying).
 *
 * We could also use a HTTPS proxy: send the traffic to a HTTPS box, and have
 * that box redirect the traffic to the private network (see
 * https://aaronloo.com/how-to-guide/private-network-webhooks), however, this
 * would mean that *anyone* could hit the endpoint and play music on my home
 * network. No thanks.
 *
 * Therefore, we use the following method: create a popup window (so we
 * wouldn't be mixing content, unlike an iframe), and leverage this popup
 * to send requests to the HTTP destination. Since the browser is ultimately
 * making the final request to the HTTP destination, it's still secure (that
 * is, no randos on the internet can hit the endpoint).
 */
(function() {
    //  TODO: Consider moving this to a common script.
    function delay(milliseconds) {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(); }, milliseconds);
        });
    }

    function xfetch(...args) {
        const popup = window.open(
            "http://voicebox.aaronloo.com/proxy.html",
            "_blank",
            "toolbar=no,titlebar=no,status=no,menubar=no,resizable=no,width=1,height=1",
        );
        const channel = new MessageChannel();

        //  We add a delay here, so that the window has time to open, before we send
        //  messages to it.
        return delay(200)
            .then(() => {
                //  We pass over this port, so that the popup can communicate back.
                popup.postMessage(args, '*', [channel.port1]);
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    //  The first payload will be the response metadata
                    channel.port2.onmessage = ({data}) => {
                        const stream = new ReadableStream({
                            start(controller) {
                                //  The remaining payloads will be the response itself.
                                //  We change the listener to capture this.
                                channel.port2.onmessage = (event) => {
                                    if (event.data === true) {
                                        controller.close();
                                        popup.close();
                                    } else {
                                        controller.enqueue(event.data);
                                    }
                                };
                            }
                        });

                        resolve(new Response(stream, data));
                    };
                });
            });
    }

    xfetch(
        "http://jukebox-api.aaronloo.com/play-now/song",
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
                response.text()
                    .then((text) => {
                        reject(text)
                    });
            } else {
                alert("Loaded!");
                resolve();
            }
        });
    })
    .catch((data) => {
        alert(data);
    });
})();
