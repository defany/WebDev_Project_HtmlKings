document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('form_overall_container_layout')
	if (!form) return

	const fullNameInput = document.getElementById('user_name')
	const emailInput = document.getElementById('user_email_address')
	const phoneInput = document.getElementById('user_phone_number')
	const selects = form.querySelectorAll('select.form_input_style')
	const contactMethodSelect = selects[0]
	const reasonSelect = selects[1]
	const messageTextarea = document.getElementById('text_box')

	const inputs = [
		fullNameInput,
		emailInput,
		phoneInput,
		contactMethodSelect,
		reasonSelect,
		messageTextarea,
	]

	const errorElements = new Map()

	const createErrorElement = (input) => {
		const el = document.createElement('p')
		el.className = 'form_error_message'
		el.setAttribute('aria-live', 'polite')
		input.insertAdjacentElement('afterend', el)
		errorElements.set(input, el)
		return el
	}

	const ensureErrorElement = (input) =>
		errorElements.get(input) || createErrorElement(input)

	const clearError = (input) => {
		const el = errorElements.get(input)
		if (el) el.textContent = ''
		input.classList.remove('form_input_error')
		input.removeAttribute('aria-invalid')
	}

	const setError = (input, message) => {
		const el = ensureErrorElement(input)
		el.textContent = message
		input.classList.add('form_input_error')
		input.setAttribute('aria-invalid', 'true')
	}

	const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

	const isValidPhone = (value) =>
		!value || /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)

	inputs.forEach((input) => {
		if (!input) return
		createErrorElement(input)
		input.addEventListener('input', () => clearError(input))
		input.addEventListener('change', () => clearError(input))
	})

	form.addEventListener('submit', (e) => {
		let isValid = true
		let firstInvalid = null

		inputs.forEach((input) => input && clearError(input))

		if (!fullNameInput.value.trim()) {
			setError(fullNameInput, 'Please enter your full name.')
			isValid = false
			firstInvalid = firstInvalid || fullNameInput
		}

		const emailVal = emailInput.value.trim()
		if (!emailVal) {
			setError(emailInput, 'Please enter your email address.')
			isValid = false
			firstInvalid = firstInvalid || emailInput
		} else if (!isValidEmail(emailVal)) {
			setError(
				emailInput,
				'Please enter a valid email address (example@domain.com).'
			)
			isValid = false
			firstInvalid = firstInvalid || emailInput
		}

		if (!contactMethodSelect.value) {
			setError(
				contactMethodSelect,
				'Please choose how you would like us to contact you.'
			)
			isValid = false
			firstInvalid = firstInvalid || contactMethodSelect
		}

		const phoneVal = phoneInput.value.trim()

		if (contactMethodSelect.value === 'Phone') {
			if (!phoneVal) {
				setError(
					phoneInput,
					'Please enter your phone number (e.g. 333-222-5555).'
				)
				isValid = false
				firstInvalid = firstInvalid || phoneInput
			} else if (!isValidPhone(phoneVal)) {
				setError(phoneInput, 'Please use the format: 333-222-5555.')
				isValid = false
				firstInvalid = firstInvalid || phoneInput
			}
		} else if (phoneVal && !isValidPhone(phoneVal)) {
			setError(phoneInput, 'Please use the format: 333-222-5555.')
			isValid = false
			firstInvalid = firstInvalid || phoneInput
		}

		if (!reasonSelect.value) {
			setError(reasonSelect, 'Please tell us why you are contacting us.')
			isValid = false
			firstInvalid = firstInvalid || reasonSelect
		}

		if (messageTextarea.value.length > 1000) {
			setError(
				messageTextarea,
				'Your message is a bit long. Please keep it under 1000 characters.'
			)
			isValid = false
			firstInvalid = firstInvalid || messageTextarea
		}

		if (!isValid) {
			e.preventDefault()
			if (firstInvalid) firstInvalid.focus()
		}
	})
})
