// INTERSECTION OBSERVER SECTION

// Fade in lines observer
let timeOutIDs = [];
let observer = new IntersectionObserver(function(textBlocks) {
    textBlocks.forEach(function (textBlock) {
        const {isIntersecting} = textBlock;
        if (isIntersecting === true) {
            for (let i = 0; i < textBlock.target.children.length; i++) {
                let element = textBlock.target.children[i];
                timeOutIDs.push(setTimeout(() => element.classList.add('fade-in-text-visible'), (i * 1250)));
            }
        } else {
            for (let i = 0; i < textBlock.target.children.length; i++) {
                let element = textBlock.target.children[i];
                timeOutIDs.forEach(ID => clearInterval(ID));
                element.classList.remove('fade-in-text-visible');
            }
        }
    });
},
{
    rootMargin: '-20% 0% -20% 0%',
    threshold: 1
});

const fadeInTextElements = document.querySelectorAll('.fade-in-text');
fadeInTextElements.forEach(element => observer.observe(element));
