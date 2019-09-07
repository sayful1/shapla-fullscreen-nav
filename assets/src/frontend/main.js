(function () {
    'use strict';

    var btnWrapper = document.querySelector(".NavBtnWrapper"),
        mainWrapper = document.querySelector(".NavWrapper"),
        menuContainer = document.querySelector(".MenuContainer"),
        animatedArrow,
        subMenu,
        childLink,
        i;

    // add animated arrow to sub-menus
    animatedArrow = '<span><div class="sub-menu-arrow-tip-left"></div><div class="sub-menu-arrow-line"><div><div class="sub-menu-arrow-tip-right"></div></span>';
    subMenu = menuContainer.querySelectorAll('ul li ul');
    for (i = 0; i < subMenu.length; i++) {
        subMenu[i].insertAdjacentHTML('afterend', animatedArrow);
    }

    // show sub-menu when top-level menu item is clicked/tapped
    childLink = menuContainer.querySelectorAll("li.menu-item-has-children > a, li.menu-item-has-children > span");
    for (i = 0; i < childLink.length; i++) {
        childLink[i].onclick = function (e) {
            e.preventDefault();
            var parent = this.parentNode;
            parent.classList.toggle("is-top-inactive");
            parent.parentNode.classList.toggle("is-top-inactive");

            var subMenu = parent.querySelectorAll('.sub-menu');
            for (i = 0; i < subMenu.length; i++) {
                subMenu[i].classList.toggle("is-sub-inactive");
            }

            var span = parent.querySelectorAll('span');
            for (i = 0; i < span.length; i++) {
                span[i].classList.toggle("is-submenu-active");
            }
        }
    }

    // if sub-menu active, hide sub-menu when main menu button is clicked/tapped
    function hideSubMenu() {
        var menuFirstSpan = menuContainer.querySelector("ul > li > span");
        if (menuFirstSpan && menuFirstSpan.classList.contains('is-submenu-active')) {
            menuContainer.querySelector("ul").classList.remove("is-top-inactive");
            menuContainer.querySelector("ul li").classList.remove("is-top-inactive");
            menuContainer.querySelector("ul > li > span").classList.remove("is-submenu-active");
            var subMenu = menuContainer.querySelectorAll('.sub-menu');
            for (i = 0; i < subMenu.length; i++) {
                subMenu[i].classList.remove("is-sub-inactive");
            }
        }
    }

    btnWrapper.addEventListener('click', hideSubMenu, false);
    btnWrapper.addEventListener('touchstart', hideSubMenu, false);

})();

(function () {
    'use strict';

    var btnWrapper = document.querySelector(".NavBtnWrapper"),
        mainBackground = document.querySelector(".NavBackground"),
        linesWrapper = document.querySelector(".NavLines"),
        mainWrapper = document.querySelector(".NavWrapper"),
        menuWrapper = document.querySelector(".MenuWrapper");

    function hideOrShowMenu(e) {
        e.preventDefault();
        if (mainWrapper && mainWrapper.classList.contains('is-active')) {
            // hide navi slide
            mainWrapper.classList.remove('is-active');
            // hide navi background
            mainBackground.classList.remove('is-active');
            // hide navi background lines
            linesWrapper.classList.remove('is-active');
            // when menu de-activated, animate main menu items
            menuWrapper.classList.remove('is-active');
            // de-animate menu button
            // btnWrapper.classList.remove('is-active');
            document.querySelector('html').classList.remove('is-body-clipped');
        }
        else {
            // hide navi slide
            mainWrapper.classList.add('is-active');
            // hide navi background
            mainBackground.classList.add('is-active');
            // hide navi background lines
            linesWrapper.classList.add('is-active');
            // when menu de-activated, animate main menu items
            menuWrapper.classList.add('is-active');
            // de-animate menu button
            // btnWrapper.classList.add('is-active');
            document.querySelector('html').classList.add('is-body-clipped');
        }

        btnWrapper.classList.toggle('is-active');
        btnWrapper.classList.toggle('toggled-on');
    }

    btnWrapper.addEventListener('touchstart', hideOrShowMenu, false);
    btnWrapper.addEventListener('click', hideOrShowMenu, false);
})();