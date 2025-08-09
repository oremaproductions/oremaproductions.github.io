function redirectTo(link, method) {
    return (method == 'replace') ? window.location.href = link : window.open(link);
}
function toggleCollabContent(){
    let content = $('#collabContentMore');
    const trigger = $('#expandCollabContent');
    console.log(content);
    if(content.hasClass('d-none')){
        trigger.text('See Less');
        trigger.addClass('active');
        content.removeClass('d-none');
        content.addClass('d-flex');
    } else {
        trigger.text('Learn More');
        trigger.removeClass('active')
        content.addClass('d-none');
        content.removeClass('d-flex');
    }
}