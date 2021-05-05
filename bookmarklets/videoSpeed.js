/**
 * This increases the video speed for HTML5 videos.
 */
(function() {
    const speed = prompt("Input desired speed (e.g. 1.5)");
    if (!speed) {
        //  Gracefully handle no input provided.
        return;
    }

    if (Number.isNaN(Number.parseFloat(speed))) {
        alert("Invalid speed input.");
        return;
    }

    const candidates = [
        document,

        //  NOTE: Sometimes, the video is nested in an iframe.
        ...[...document.getElementsByTagName("iframe")].map(
            (item) => item.contentDocument
        ),
    ];

    for (const candidate of candidates) {
        if (!candidate) {
            continue;
        }

        const videos = [...candidate.getElementsByTagName("video")];
        if (videos.length) {
            videos.forEach((video) => {video.playbackRate = speed;})
        }
    }
})();