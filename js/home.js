// NAVIGATION
const menuLinks = document.querySelectorAll('.navigation ul li a');
const activateMenuItem = (activeMenuItem) => {
	menuLinks.forEach((menuItem) => {
		menuItem.classList.remove('active-section');
	});
	activeMenuItem.classList.add('active-section');
};

// User Scrolling
const pageSectionObserver = new IntersectionObserver(
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
		// Remove scrolling observer while smooth scroll from click is taking place
		sections.forEach((section) => pageSectionObserver.unobserve(section));
		setTimeout(() => sections.forEach((section) => pageSectionObserver.observe(section)), 500);
	});
});

// ANIMATIONS
// Fade in lines
const fadeInTextLinesObserver = new IntersectionObserver(
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
const fadeInElementObserver = new IntersectionObserver(
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
const fadeOutElementObserver = new IntersectionObserver(
	function (elements) {
		elements.forEach(function (element) {
			const { isIntersecting } = element;
			const targ = element.target;
			if (isIntersecting === true) {
				element.target.style.opacity =
					element.target.getBoundingClientRect().top / (document.body.clientHeight / 25); // So jumping to top of page triggers opacity update
				document.addEventListener(
					'scroll',
					(scrollFade = function (event, targ) {
						this.style.opacity = this.getBoundingClientRect().top / (document.body.clientHeight / 25);
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
const typingLetters = (element, text) => {
	return new Promise((resolve, reject) => {
		const chars = [ ...text ];
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
typingLetters(document.querySelector('.header-huge .typing-letters'), 'Marvin');

// Animates terminal command being executed
const executeTerminalCommand = (terminal) => {
	const audio = new Audio('../media/keystroke.mp3');
	audio.volume = 0.3;
	audio.play();
	document.querySelector('.terminal-box__command.blinking-linux-cursor').classList.remove('blinking-linux-cursor');
	const nodes = terminal.target.querySelectorAll('*');
	for (let i = 0; i < nodes.length; i++) {
		setTimeout(() => nodes[i].classList.remove('hidden'), 10 * i);
	}
};

const terminalObserver = new IntersectionObserver(
	async function (terminal) {
		terminal = terminal[0];
		const { isIntersecting } = terminal;
		if (isIntersecting === true) {
			const audio = new Audio('../media/typing.mp3');
			audio.volume = 0.05;
			audio.play();
			await typingLetters(terminal.target.querySelector('.typing-letters'), 'tree\u00A0techskills/\u00A0');
			audio.pause();
			setTimeout(executeTerminalCommand, 1000, terminal);
			terminalObserver.unobserve(terminal.target);
		}
	},
	{
		rootMargin: '-25% 0% -25% 0%',
		threshold: 0
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
const heroHeaderObserver = new IntersectionObserver(
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

// Form validation
const isValid = (formData) => {
	if (formData.get('name') && (formData.get('email') || formData.get('phone')) && formData.get('message')) {
		console.log('valid');
		return true;
	}
	return false;
};

// Form submission
document.querySelector('.form-submit').addEventListener('click', (e) => {
	e.preventDefault();
	const form = e.target.form;
	for (input of form) {
		console.log(input);
		input.parentElement.classList.remove('required');
	}
	const formData = new FormData(form);
	if (isValid(formData)) {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData).toString()
		})
			.then(() => {
				// ADD SUBMISSION SUCCESS VISUAL
				form.reset();
				console.log('Form successfully submitted');
			})
			.catch((error) => alert(error));
	} else {
		if (!formData.get('name')) {
			form.querySelector('[name=name]').parentElement.classList.add('required');
		}
		if (!formData.get('email') & !formData.get('phone')) {
			form.querySelector('[name=email]').parentElement.classList.add('required');
		}
		if (!formData.get('message')) {
			form.querySelector('[name=message]').parentElement.classList.add('required');
		}
		console.log('form incomplete');
	}
});

// Update footer year
const today = new Date();
document.querySelector('.current-year').innerText = today.getFullYear();
