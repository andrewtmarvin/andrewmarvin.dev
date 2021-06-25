document.querySelectorAll('.fade-in-text').forEach(textBlock => {
    for (let i = 0; i < textBlock.children.length; i++) {
        let node = textBlock.children[i];
        setTimeout(function() { node.classList.add('fade-in-text-visible')}, (i + 1) * (i + 1) * 500)
    }
})