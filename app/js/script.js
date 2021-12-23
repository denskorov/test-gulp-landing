$(document).ready(function () {

    const hash = window.location.hash
    const header = $('header')
    const headerHeight = header.outerHeight()

    scrollToElement(hash)

    function scrollToElement(selectorToScrollElement, callback = null) {
        const body = $("html, body")

        if (!selectorToScrollElement) return

        const scrollTo = ($(selectorToScrollElement).offset().top) - headerHeight

        $('header nav .nav-item.active').removeClass('active')

        //TODO: https://api.jquery.com/animate/
        body.stop().animate({scrollTop: scrollTo}, 500, 'swing', () => {
            $(`a.nav-link[href="${selectorToScrollElement}"]`).parent().addClass('active')
            if (callback) callback()
        })
    }

    $('.comments').masonry({
        itemSelector: '.item',
        columnWidth: '.item',
        percentPosition: true,
        gutter: 24
    });

    $('header nav .nav-item .nav-link').click(function () {
        scrollToElement($(this).attr('href'))
    })

    $('a.navbar-brand').click(function () {
        scrollToElement($(this).attr('href'), () => {
            window.location.hash = ''
        })
    })

//TODO: https://stackoverflow.com/questions/19158559/how-to-fix-a-header-on-scroll
    $(window).scroll(function () {
        const scrollTo = $(window).scrollTop()

        if (scrollTo >= headerHeight) header.addClass('shadow-sm')
        else header.removeClass('shadow-sm')
    });


})
