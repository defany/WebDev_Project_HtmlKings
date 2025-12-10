const BASE_URL = import.meta.env.BASE_URL

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.favorite_animes')
	if (!container) return

	const titleEl = container.querySelector('.favorite_animes__title')
	const descEl = container.querySelector('.favorite_animes__description')
	const prev = container.querySelector('.arrow_previous')
	const next = container.querySelector('.arrow_next')

	const slides = [
		{
			title: 'One Piece',
			description:
				"\"One Piece\" has been my all-time favorite since I was a kid. It's not just about pirates and treasure — it's about freedom, friendship, and chasing your dreams no matter how far they are. Every episode feels like an adventure, and the emotions hit just as strong even after hundreds of episodes.",
			image: `url(${BASE_URL}images/general_ui/one_piece.png)`,
		},
		{
			title: 'Naruto',
			description:
				'"Naruto" is all about perseverance and believing in yourself even when no one else does. Watching Naruto grow from an outcast into a hero always motivates me to keep going, no matter how hard things get.',
			image: `url(${BASE_URL}images/general_ui/naruto.png)`,
		},
		{
			title: 'Attack on Titan',
			description:
				'"Attack on Titan" grabbed me with its intense story and complex characters. It\'s dark, emotional, and makes you think about freedom, sacrifice, and what it really means to fight for your future.',
			image: `url(${BASE_URL}images/general_ui/aot.png)`,
		},
	]

	let index = 0

	const applySlide = i => {
		const slide = slides[i]
		titleEl.textContent = slide.title
		descEl.textContent = slide.description
		container.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), ${slide.image}`
	}

	const showNext = () => {
		index = (index + 1) % slides.length
		applySlide(index)
	}

	const showPrev = () => {
		index = (index - 1 + slides.length) % slides.length
		applySlide(index)
	}

	next.addEventListener('click', showNext)
	prev.addEventListener('click', showPrev)

	applySlide(index)
})
