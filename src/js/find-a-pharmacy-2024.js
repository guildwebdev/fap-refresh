// ----- jQuery goes here ------ //

// ----- Mega Menu Toggle Sub Items ------ //
document.querySelectorAll('.header__menu-item ul li > a').forEach(function(item) {
    item.addEventListener('click', function(e) {
        const subList = this.nextElementSibling;

        const isActive = this.classList.contains('active');

        document.querySelectorAll('.header__menu-item ul li > a').forEach(function(link) {
            link.classList.remove('active');

            const siblingSubList = link.nextElementSibling;
            if (siblingSubList && siblingSubList.tagName === 'UL') {
                siblingSubList.classList.remove('open');
                siblingSubList.style.maxHeight = null;
                siblingSubList.style.opacity = 0;
            }
        });

        if (!isActive) {
            this.classList.add('active');
            e.preventDefault();
            if (subList && subList.tagName === 'UL') {
                subList.classList.add('open');
                subList.style.maxHeight = subList.scrollHeight + "px";
                subList.style.opacity = 1;
            }
        } else {
            this.classList.remove('active');
            if (subList && subList.tagName === 'UL') {
                subList.classList.remove('open');
                subList.style.maxHeight = null;
                subList.style.opacity = 0;
            }
        }
    });
});

// ----- Mega Menu Toggle - Mobile Screens ------ //
function toggleMegaMenu() {
    if (window.innerWidth <= 991) {
        const menuItems = document.querySelectorAll('.header__menu-item__has-megamenu');

        menuItems.forEach(item => {
            const menuLink = item.querySelector('a.header__menu-link');
            const megaMenu = item.querySelector('.header__mega-menu');

            if (menuLink && megaMenu) {
                menuLink.addEventListener('click', function (event) {
                    event.preventDefault();

                    megaMenu.classList.toggle('active');

                    event.stopPropagation();
                });

                document.addEventListener('click', function (event) {
                    if (!item.contains(event.target)) {
                        megaMenu.classList.remove('active');
                    }
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', toggleMegaMenu);

window.addEventListener('resize', toggleMegaMenu);

// ----- Mobile Menu ----- //
$(document).ready(function() {
    function handleResize() {
        if ($(window).width() >= 992) {
            $('#fap-header-menu').removeClass('show');
            $('.header__nav-toggler').addClass('collapsed');
        }
    }

    $(window).resize(handleResize);
});

// ----- Button Overlay Animation ----- //
const buttons = document.querySelectorAll('.btn-with-backdrop');

buttons.forEach(button => {
    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    backdrop.innerHTML = `
        ${button.innerHTML}
    `;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `
        ${button.innerHTML}
    `;

    button.innerHTML = '';

    button.appendChild(backdrop);
    button.appendChild(overlay);
});

// ----- Button Line Height ----- //
const fapButtons = document.querySelectorAll('.btn');

fapButtons.forEach(button => {
    if (button.scrollHeight > button.clientHeight) {
        button.classList.add('multiline');
    } else {
        button.classList.remove('multiline');
    }
});

// ----- Dropdown Filter - Hero Section ------ //
function toggleDropdown() {
    const dropdown = document.getElementById('fap-dropdown-list');
    dropdown.classList.toggle('show');
}

function filterFunction() {
    const input = document.getElementById('fap-filter-input');
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById('fap-dropdown-list');
    const sections = dropdown.querySelectorAll('.service-category-title');

    sections.forEach(section => {
        let hasVisibleItem = false;
        const items = [];

        let sibling = section.nextElementSibling;
        while (sibling && sibling.tagName.toLowerCase() === 'p') {
            items.push(sibling);
            sibling = sibling.nextElementSibling;
        }

        items.forEach(item => {
            const txtValue = item.textContent || item.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                item.style.display = "";
                hasVisibleItem = true;
            } else {
                item.style.display = "none";
            }
        });

        if (hasVisibleItem) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });
}

function selectOption(element) {
    const inputField = document.getElementById('fap-search-service');
    inputField.value = element.textContent;

    document.getElementById('fap-dropdown-list').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('fap-dropdown-list');
    const searchInput = document.getElementById('fap-search-service');

    if (dropdown && searchInput) {
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
});

// ----- Hero Section Ad ----- //
var heroAdElement = document.querySelector('.hero-banner-ad__ad-toggle');

if (heroAdElement) {
    heroAdElement.addEventListener('click', function() {

        const parentElement = this.parentElement;

        const heroAdElement = parentElement.nextElementSibling;

        if (heroAdElement && heroAdElement.classList.contains('hero-banner-ad__ad-wrapper')) {
            const isMobile = window.matchMedia("(max-width: 991px)").matches;

            if (isMobile) {
                if (heroAdElement.style.maxHeight === '0px' || heroAdElement.style.maxHeight === '') {
                    heroAdElement.classList.remove('fade-out');
                    heroAdElement.style.maxHeight = '400px';
                    setTimeout(() => {
                        heroAdElement.style.opacity = '1';
                    }, 10);
                    parentElement.classList.add('ad-active');
                } else {
                    heroAdElement.style.maxHeight = '400px';
                    setTimeout(() => {
                        heroAdElement.style.maxHeight = '0';
                        heroAdElement.classList.add('fade-out');
                    }, 10);
                    parentElement.classList.remove('ad-active');
                }
            } else {
                if (!heroAdElement.classList.contains('fade-out')) {
                    heroAdElement.style.maxHeight = heroAdElement.scrollHeight + 'px';
                    setTimeout(() => {
                        heroAdElement.style.maxHeight = '0';
                        heroAdElement.classList.add('fade-out');
                    }, 10);
                    parentElement.classList.remove('ad-active');
                } else {
                    heroAdElement.classList.remove('fade-out');
                    heroAdElement.style.maxHeight = '0';
                    setTimeout(() => {
                        heroAdElement.style.maxHeight = heroAdElement.scrollHeight + 'px';
                    }, 10);
                    parentElement.classList.add('ad-active');

                    heroAdElement.addEventListener('transitionend', function handleTransition() {
                        heroAdElement.style.maxHeight = null;
                        heroAdElement.removeEventListener('transitionend', handleTransition);
                    });
                }
            }
        }

    });
}

// ----- Dropdown Filter - Map Section ------ //
function searchtoggleDropdown() {
    const dropdown = document.getElementById('search-dropdown-list');
    dropdown.classList.toggle('show');
}

function searchfilterFunction() {
    const input = document.getElementById('search-filter-input');
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById('search-dropdown-list');
    const sections = dropdown.querySelectorAll('.service-category-title');
    
    sections.forEach(section => {
        let hasVisibleItem = false;
        const items = [];

        let sibling = section.nextElementSibling;
        while (sibling && sibling.tagName.toLowerCase() === 'p') {
            items.push(sibling);
            sibling = sibling.nextElementSibling;
        }

        items.forEach(item => {
            const txtValue = item.textContent || item.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                item.style.display = "";
                hasVisibleItem = true;
            } else {
                item.style.display = "none";
            }
        });

        if (hasVisibleItem) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });
}

function searchselectOption(element) {
    const inputField = document.getElementById('search-service-2');
    inputField.value = element.textContent;

    document.getElementById('search-dropdown-list').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('search-dropdown-list');
    const searchInput = document.getElementById('search-service-2');

    if (dropdown && searchInput) {
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
});

// ----- Draggabale Bar ------ //
function updateSliderValue() {
    const slider = document.getElementById('fap-range-slider');
    const sliderLabel = document.getElementById('fap-slider-label');

    sliderLabel.innerHTML = slider.value;

    const valPercent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    const valValue = ((slider.value) / 3) - 10;

    let leftPosition;

    leftPosition = `calc(${valPercent}% - ${valValue}px)`;

    sliderLabel.style.left = leftPosition;

    slider.style.background = `linear-gradient(to right, rgb(var(--clr--yellow)) 0%, rgb(var(--clr--yellow)) ${valPercent}%, rgba(var(--clr--lightblue), 0.4) ${valPercent}%, rgba(var(--clr--lightblue), 0.4) 100%)`;
}

// ----- Search Results ------ //
document.querySelectorAll('.map-to-list-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const targetDivs = document.querySelectorAll('.pharmacy-map-toggle-view');

        targetDivs.forEach(div => {
            if (div.classList.contains('d-block')) {
                div.classList.remove('d-block');
                div.classList.add('d-none');
            } else if (div.classList.contains('d-none')) {
                div.classList.remove('d-none');
                div.classList.add('d-block');
            }
        });
    });
});

// ----- Map Search Toggle - Mobile ----- //
var mapSearchWrapperToggle = document.querySelector('.pharmacy-map__search-wrapper-toggle');

if (mapSearchWrapperToggle) {
    mapSearchWrapperToggle.addEventListener('click', function() {

        const mapSearchPanel = this.closest('.pharmacy-map__search-wrapper');

        if (mapSearchPanel) {
            mapSearchPanel.classList.toggle('display-none');
            mapSearchPanel.classList.toggle('filter-closed');
            mapSearchPanel.classList.toggle('filter-opened');
        }

    });
}

// ----- Search list Schedule ----- //
const parentElements = document.querySelectorAll('.open-status');

parentElements.forEach(function(parent) {
  parent.addEventListener('click', function() {
    const childElement = this.querySelector('.open-status__schedule');

    const isActive = childElement.classList.contains('active');

    document.querySelectorAll('.open-status__schedule').forEach(function(child) {
      child.classList.remove('active');
    });

    if (!isActive) {
      childElement.classList.add('active');
    }
  });
});

// ----- Services Carousel ----- //
$(".our-services-wrapper").owlCarousel({
    loop: true,
    autoplay: false,
    items: 4,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
        0: {
            loop: true,
            items: 1,
            nav: true,
            dots: false,
        },
        768: {
            loop: true,
            items: 2,
            nav: true,
            dots: false,
        },
        1024: {
            loop: true,
            items: 4,
            nav: true,
            dots: false,
        },
    }
});

// ----- News Carousel ----- //
$(".latest-updates__news-wrapper").owlCarousel({
    loop: false,
    autoplay: false,
    items: 3,
    nav: false,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
        0: {
            loop: true,
            items: 1,
            nav: true,
            dots: false,
        },
        768: {
            loop: true,
            items: 2,
            nav: true,
            dots: false,
        },
        1024: {
            loop: false,
            items: 3,
            nav: false,
            dots: false,
        },
    }
});

// ----- Disable Up and Down Arrow Keys for input[type="number"] ----- //
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault();
        }
    });
});
