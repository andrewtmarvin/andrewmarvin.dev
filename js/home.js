// Interesection Observer
let observer = new IntersectionObserver(function(textBlocks) {
    textBlocks.forEach(function (textBlock) {
        const {isIntersecting, intersectionRatio} = textBlock;
        if (isIntersecting === true || intersectionRatio > 0) {
            for (let i = 0; i < textBlock.target.children.length; i++) {
                let element = textBlock.target.children[i];
                setTimeout(() => element.classList.add('fade-in-text-visible'), (i + 1) * (i + 1) * 500)
            }
            observer.unobserve(textBlock.target);
        }
    });
},
{
    root: null, // set to viewport
    rootMargin: '0px',
    threshold: 0.5
});


const fadeInTextElements = document.querySelectorAll('.fade-in-text');
fadeInTextElements.forEach(element => observer.observe(element));


// document.querySelectorAll('.fade-in-text').forEach(textBlock => {
//     for (let i = 0; i < textBlock.children.length; i++) {
//         let element = textBlock.children[i];
//         setTimeout(function() { element.classList.add('fade-in-text-visible')}, (i + 1) * (i + 1) * 500)
//     }
// })

