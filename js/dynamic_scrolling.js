function show_eles(viewPosition) {
    document.querySelectorAll('.show-on-scroll').forEach((ele, index) => {
        if ($(ele).css('opacity') == 0 && viewPosition > ele.offsetTop) {
            $(ele).css('opacity', '1');
        }
    });
}
window.addEventListener('scroll', (view) => {
    let viewPosition = window.scrollY + window.innerHeight;
    show_eles(viewPosition)
});
window.addEventListener('load', () => {
    show_eles(window.innerHeight)

});