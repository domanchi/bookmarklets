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

    document.getElementsByTagName("video").forEach((video) => {
        video.playbackRate = speed;
    });
})();