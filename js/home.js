// FADE IN ELEMENTS

// Fade in lines
let fadeInTextLinesObserver = new IntersectionObserver(
	function (textBlocks) {
		textBlocks.forEach(function (textBlock) {
			const { isIntersecting } = textBlock;
			if (isIntersecting === true) {
				for (let i = 0; i < textBlock.target.children.length; i++) {
					let element = textBlock.target.children[i];
					setTimeout(() => element.classList.add('fade-in-text-lines-visible'), i * 2000);
				}
				fadeInTextLinesObserver.unobserve(textBlock.target);
			}
		});
	},
	{
		rootMargin: '-20% 0% -20% 0%',
		threshold: 1
	}
);

const fadeInTextElements = document.querySelectorAll('.fade-in-text-lines');
fadeInTextElements.forEach((element) => fadeInTextLinesObserver.observe(element));

// Fade in element
let fadeInElementObserver = new IntersectionObserver(
	function (elements) {
		elements.forEach(function (element) {
			const { isIntersecting } = element;
			if (isIntersecting === true) {
				element.target.classList.add('fade-in-element-visible');
				fadeInElementObserver.unobserve(element.target);
			}
		});
	},
	{
		rootMargin: '-25% 0% -25% 0%',
		threshold: 0
	}
);

const fadeInElements = document.querySelectorAll('.fade-in-element');
fadeInElements.forEach((element) => fadeInElementObserver.observe(element));

// Animate typing
let typingLetters = (element, text) => {
	return new Promise((resolve, reject) => {
		let chars = [ ...text ];
		element.innerText = '';
		for (let i = 0; i < chars.length; i++) {
			setTimeout(() => {
				element.innerText += chars[i];
				if (i === chars.length - 1) {
					resolve();
				}
			}, 50 * i);
		}
	});
};

// Animates header being typed
typingLetters(document.querySelector('.header-huge .typing-letters'), "I'm\u00A0Andrew\u00A0Marvin");

// Animates terminal command being executed
let executeTerminalCommand = (terminal) => {
	document.querySelector('.terminal-box__command.blinking-cursor').classList.remove('blinking-cursor');
	let nodes = terminal.target.querySelectorAll('*');
	for (let i = 0; i < nodes.length; i++) {
		setTimeout(() => nodes[i].classList.remove('hidden'), 10 * i);
	}
};

let terminalObserver = new IntersectionObserver(
	async function (terminal) {
		terminal = terminal[0];
		const { isIntersecting } = terminal;
		if (isIntersecting === true) {
			await typingLetters(
				terminal.target.querySelector('.typing-letters'),
				'tree\u00A0andrewmarvin/techskills/\u00A0'
			);
			setTimeout(executeTerminalCommand, 500, terminal);
			terminalObserver.unobserve(terminal.target);
		}
	},
	{
		rootMargin: '-25% 0% -25% 0%',
		threshold: 0.5
	}
);

const terminal = document.querySelector('.terminal-box');
terminalObserver.observe(terminal);
