// NAVIGATION
const menuLinks = document.querySelectorAll('.navigation ul li a');
const activateMenuItem = (activeMenuItem) => {
	menuLinks.forEach((menuItem) => {
		menuItem.classList.remove('active-section');
	});
	activeMenuItem.classList.add('active-section');
	console.log('menu item activated: ', activeMenuItem);
};

// User Scrolling
let pageSectionObserver = new IntersectionObserver(
	function (section) {
		section = section[0];
		const { isIntersecting } = section;
		const targetLinkHref = '#' + section.target.getAttribute('id');
		const targetLinkElement = document.querySelector('a[href="' + targetLinkHref + '"]');
		if (isIntersecting === true && targetLinkElement) {
			activateMenuItem(targetLinkElement);
		}
	},
	{
		rootMargin: '0% 0% 0% 0%',
		threshold: 0.2
	}
);

const sections = document.querySelectorAll('section');
sections.forEach((section) => pageSectionObserver.observe(section));

// User clicks on menu link
menuLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		activateMenuItem(e.target);
	});
});

// ANIMATIONS
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
		rootMargin: '-10% 0% 0% 0%',
		threshold: 0.5
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

// Fade out element
let fadeOutElementObserver = new IntersectionObserver(
	function (elements) {
		elements.forEach(function (element) {
			const { isIntersecting } = element;
			const targ = element.target;
			if (isIntersecting === true) {
				element.target.style.opacity =
					element.target.getBoundingClientRect().top / (document.body.clientHeight / 10); // So jumping to top of page triggers opacity update
				document.addEventListener(
					'scroll',
					(scrollFade = function (event, targ) {
						this.style.opacity = this.getBoundingClientRect().top / (document.body.clientHeight / 10);
					}.bind(targ)),
					true
				);
			} else {
				try {
					document.removeEventListener('scroll', scrollFade, true);
				} catch (e) {
					// Client refreshed page while not at top, so scrollFade function doesn't exist yet
				}
			}
		});
	},
	{
		rootMargin: '0% 0% 0% 0%',
		threshold: 0
	}
);

const fadeOutElements = document.querySelectorAll('.fade-out-element');
fadeOutElements.forEach((element) => fadeOutElementObserver.observe(element));

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
			}, 75 * i);
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
			await typingLetters(terminal.target.querySelector('.typing-letters'), 'tree\u00A0techskills/\u00A0');
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

// Copy email on click
const sideElements = document.querySelector('.side-elements');
const emailElementWrapper = document.querySelector('.side-elements__email-clickable-area');
const emailElement = document.querySelector('.side-elements__email');
emailElement.addEventListener('click', () => {
	navigator.clipboard.writeText(emailElement.innerText);
	sideElements.classList.remove('email-tooltip');
	sideElements.classList.add('email-tooltip--copied');
});

// Show copy email tooltip on mouseover
emailElementWrapper.addEventListener('mousemove', (e) => {
	emailElement.parentElement.style.setProperty('--mouse-x', e.clientX + 25 + 'px');
	emailElement.parentElement.style.setProperty('--mouse-y', e.clientY - 30 + 'px');
});
emailElementWrapper.addEventListener('mouseenter', () => {
	sideElements.classList.add('email-tooltip');
});

emailElementWrapper.addEventListener('mouseleave', () => {
	sideElements.classList.remove('email-tooltip--copied');
	sideElements.classList.remove('email-tooltip');
});

// Nav bar change when hero h1 offscreen
let heroHeaderObserver = new IntersectionObserver(
	function (heroHeader) {
		const { isIntersecting } = heroHeader[0];
		if (isIntersecting === false) {
			document.querySelector('.header').classList.add('header--downpage');
			document.querySelector('.navigation__logo').classList.add('navigation__logo--visible');
		} else {
			document.querySelector('.header').classList.remove('header--downpage');
			document.querySelector('.navigation__logo').classList.remove('navigation__logo--visible');
		}
	},
	{
		rootMargin: '0% 0% 0% 0%',
		threshold: 0
	}
);

const heroHeader = document.querySelector('.hero-content h1');
heroHeaderObserver.observe(heroHeader);
