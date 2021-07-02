// INTERSECTION OBSERVER

// Fade in lines
let fadeInTextLinesObserver = new IntersectionObserver(function(textBlocks) {
    textBlocks.forEach(function (textBlock) {
        const {isIntersecting} = textBlock;
        if (isIntersecting === true) {
            for (let i = 0; i < textBlock.target.children.length; i++) {
                let element = textBlock.target.children[i];
                setTimeout(() => element.classList.add('fade-in-text-lines-visible'), (i * 1250));
            }
            fadeInTextLinesObserver.unobserve(textBlock.target);
        } 
    });
},
{
    rootMargin: '-20% 0% -20% 0%',
    threshold: 1
});

const fadeInTextElements = document.querySelectorAll('.fade-in-text-lines');
fadeInTextElements.forEach(element => fadeInTextLinesObserver.observe(element));

// Fade in element
let fadeInElementObserver = new IntersectionObserver(function(elements) {
    elements.forEach(function (element) {
        const {isIntersecting} = element;
        if (isIntersecting === true) {
            element.target.classList.add('fade-in-element-visible');
            fadeInElementObserver.unobserve(element.target);
        } 
    });
},
{
    rootMargin: '-20% 0% -20% 0%',
    threshold: 0
});

const fadeInElements = document.querySelectorAll('.fade-in-element');
fadeInElements.forEach(element => fadeInElementObserver.observe(element));

// TERMINAL COMPONENT
