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
		threshold: 0.25
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
					element.target.getBoundingClientRect().bottom / (document.body.clientHeight / 30); // So jumping to top of page triggers opacity update
				document.addEventListener(
					'scroll',
					(scrollFade = function (event, targ) {
						this.style.opacity = this.getBoundingClientRect().bottom / (document.body.clientHeight / 30);
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
const typingLetters = (element, text, typingSpeed = 75) => {
	return new Promise((resolve, reject) => {
		const chars = [ ...text ];
		const textLength = chars.length;
		element.innerText = '';
		for (let i = 0; i < textLength; i++) {
			setTimeout(() => {
				element.innerText += chars.shift();
				if (i === textLength - 1) {
					resolve();
				}
			}, typingSpeed * i + i);
		}
	});
};

// Animates header being typed
const mainHeaderTyping = document.querySelector('.header-huge .typing-letters');
mainHeaderTyping.innerText = '';
setTimeout(typingLetters, 1000, mainHeaderTyping, 'Marvin', 110);

// Animates terminal command being executed
const executeTerminalCommand = (terminal) => {
	const audio = new Audio('../media/keystroke.mp3');
	audio.volume = 0.3;
	audio.play().catch(function (error) {
		// Throws DOMException if user hasn't interacted with page before sound attempts to play
	});
	document.querySelector('.terminal-box__command > .blinking-linux-cursor').classList.remove('blinking-linux-cursor');
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
			audio.play().catch(function (error) {
				// Throws DOMException if user hasn't interacted with page before sound attempts to play
			});
			await typingLetters(terminal.target.querySelector('.typing-letters'), '\u00A0tree\u00A0skills/');
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
			document.querySelector('.navigation-mobile__logo').classList.add('navigation-mobile__logo--visible');
		} else {
			document.querySelector('.header').classList.remove('header--downpage');
			document.querySelector('.navigation__logo').classList.remove('navigation__logo--visible');
			document.querySelector('.navigation-mobile__logo').classList.remove('navigation-mobile__logo--visible');
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
		return true;
	}
	return false;
};

document.querySelector('.navigation-mobile__button').addEventListener('click', (e) => {
	e.target.classList.toggle('navigation-mobile__button--open');
	document.querySelector('.navigation-mobile ul').classList.toggle('navigation-mobile--closed');
});
document.querySelector('.navigation-mobile ul').addEventListener('click', () => {
	document.querySelector('.navigation-mobile ul').classList.toggle('navigation-mobile--closed');
	document.querySelector('.navigation-mobile__button').classList.toggle('navigation-mobile__button--open');
});

// Form submission
document.querySelector('.form-submit').addEventListener('click', (e) => {
	e.preventDefault();
	const form = e.target.form;
	for (input of form) {
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
				form.classList.add('success');
				form.reset();
				console.log('Form successfully submitted');
				setTimeout(() => {
					form.querySelector('.success-message').classList.add('transparent');
				}, 3000);
				form.querySelector('.success-message').classList.remove('transparent');
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
