
// Identificar o clique no menu
// Verificar o item que foi clicado e fazer referência com o alvo
// Verificar a distância entre o alvo e o topo
// Animar o scroll até o alvo

const menuItems = document.querySelectorAll('.menu a[href^="#"]');

menuItems.forEach(item => {
 item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
 const id = element.getAttribute('href');
 return document.querySelector(id).offsetTop;
}

function scrollToIdOnClick(event) {
 event.preventDefault();
 const to = getScrollTopByHref(event.target) - 80;
 scrollToPosition(to);
}

function scrollToPosition(to) {
 // window.scroll({
 //   top: to,
 //   behavior: "smooth",
 // });
 smoothScrollTo(0, to);
}

/**
* Smooth scroll animation
* @param {int} endX: destination x coordinate
* @param {int} endY: destination y coordinate
* @param {int} duration: animation duration in ms
*/
function smoothScrollTo(endX, endY, duration) {
 const startX = window.scrollX || window.pageXOffset;
 const startY = window.scrollY || window.pageYOffset;
 const distanceX = endX - startX;
 const distanceY = endY - startY;
 const startTime = new Date().getTime();

 duration = typeof duration !== 'undefined' ? duration : 400;

 // Easing function
 const easeInOutQuart = (time, from, distance, duration) => {
   if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
   return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
 };

 const timer = setInterval(() => {
   const time = new Date().getTime() - startTime;
   const newX = easeInOutQuart(time, startX, distanceX, duration);
   const newY = easeInOutQuart(time, startY, distanceY, duration);
   if (time >= duration) {
     clearInterval(timer);
   }
   window.scroll(newX, newY);
 }, 1000 / 60); // 60 fps
};

//Post Annimado
debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

(function(){
    var $target = $('.anime'),
        animationClass = 'anime-start';
        offset = $(window).height() * 3/4;

    function animeScroll() {
        var documentTop = $(document).scrollTop();
        
        $target.each(function() {
            var itemTop = $(this).offset().top;
            if(documentTop > itemTop - offset) {
                $(this).addClass(animationClass);
            } else {
                $(this).removeClass(animationClass);
            }
        })
    }

    animeScroll();

    $(document).scroll(debounce(function(){
        animeScroll();
    }, 200));

}());