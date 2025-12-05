const BASE_URL = import.meta.env.BASE_URL

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('hero_slider')
	if (!root) return

	const titleEl = root.querySelector('.hero_title')
	const subtitleEl = root.querySelector('.hero_subtitle')
	const timelineItems = Array.from(root.querySelectorAll('.hero_timeline_item'))

	const slides = [
		{
			title: 'Attack on Titan',
			subtitle:
				'A dark and gripping tale of survival, sacrifice, and the cost of freedom. Humanity fights desperately against monstrous Titans as hidden truths reshape their entire world.',
			image: `url(${BASE_URL}images/general_ui/aot.png)`,
		},
		{
			title: 'One Piece',
			subtitle:
				'An epic journey about freedom, adventure, and unbreakable friendship. Luffy and his crew sail across wild seas chasing their dreams, facing danger with optimism, laughter, and heart.',
			image: `url(${BASE_URL}images/general_ui/one_piece.png)`,
		},
		{
			title: 'Naruto',
			subtitle:
				"A powerful story about overcoming loneliness, chasing your destiny, and never giving up. Naruto's path from an outcast to a true hero inspires with every step of his journey.",
			image: `url(${BASE_URL}images/general_ui/naruto.png)`,
		},
	]

	const slideDurationMs = 7000

	let current = 0
	let rafId = null
	let startTs = null

	const setBackground = img => {
		root.style.backgroundImage = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), ${img}`
	}

	const resetProgressBars = () => {
		timelineItems.forEach(item => {
			const fill = item.querySelector('.hero_timeline_fill')
			if (fill) fill.style.transform = 'scaleX(0)'
		})
	}

	const setActiveDot = index => {
		timelineItems.forEach((item, i) => {
			item.classList.toggle('is-active', i === index)
		})
	}

	const applySlide = index => {
		const slide = slides[index]
		titleEl.textContent = slide.title
		subtitleEl.textContent = slide.subtitle
		setBackground(slide.image)
		resetProgressBars()
		setActiveDot(index)
	}

	const step = ts => {
		if (!startTs) startTs = ts
		const elapsed = ts - startTs
		const progress = Math.min(elapsed / slideDurationMs, 1)

		const activeItem = timelineItems[current]
		const fill = activeItem?.querySelector('.hero_timeline_fill')
		if (fill) fill.style.transform = `scaleX(${progress})`

		if (progress >= 1) {
			gotoSlide((current + 1) % slides.length, false)
		} else {
			rafId = requestAnimationFrame(step)
		}
	}

	const startProgress = () => {
		if (rafId) cancelAnimationFrame(rafId)
		startTs = null
		rafId = requestAnimationFrame(step)
	}

	const gotoSlide = (index, fromClick = true) => {
		if (index === current && fromClick) return
		current = index
		applySlide(current)
		startProgress()
	}

	timelineItems.forEach((item, idx) => {
		item.addEventListener('click', () => gotoSlide(idx))
	})

	applySlide(current)
	startProgress()
})
