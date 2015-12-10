window.onload = function(){
    // contents: div contains each slide
    // larr: left arrow
    // rarr: right arrow
    // pos: current scrollLeft
    // wd: width of contents
    // scrolling: flag to prevent extra call when acting
    // afterAnima: callback function to unlock flag and sync current position
    var contents = document.getElementById("contents"),
        larr = document.getElementById("larr"),
        rarr = document.getElementById("rarr"),
        pos = 0,
        wd = contents.clientWidth,
        scrolling = false,
        afterAnima = function () {
            // get real scrollLeft
            pos = contents.scrollLeft;
            // unlock flag
            scrolling = false;
        };
    // scroll right
    rarr.onclick = function () {
        // do nothing if is scrolling
        if (scrolling) return;
        // set flag
        scrolling = true;
        // update position
        pos += wd;
        // do animate
        TweenLite.to(contents, 0.5, {scrollLeft:pos,onComplete:afterAnima});
    }
    larr.onclick = function () {
        if (scrolling) return;
        scrolling = true;
        pos -= wd;
        TweenLite.to(contents, 0.5, {scrollLeft:pos,onComplete:afterAnima});
    }
}