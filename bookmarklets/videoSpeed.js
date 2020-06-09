/**
 * This increases the video speed for HTML5 videos.
 */
(function() {
    const speed = prompt("Input desired speed (e.g. 1.5)");
    document.getElementsByTagName("video").forEach((video) => {
        video.playbackRate = speed;
    });
})();