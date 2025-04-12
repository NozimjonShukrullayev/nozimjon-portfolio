;(function () {
	'use strict'

	let forms = document.querySelectorAll('.php-email-form')

	forms.forEach(function (e) {
		e.addEventListener('submit', function (event) {
			event.preventDefault()

			let thisForm = this
			let botToken = '7050168568:AAG4UDnhTen6HVUc4gnb5yZp45GLX-fjGvM'
			let chatId = '962709515'

			thisForm.querySelector('.loading').classList.add('d-block')
			thisForm.querySelector('.error-message').classList.remove('d-block')
			thisForm.querySelector('.sent-message').classList.remove('d-block')

			let formData = new FormData(thisForm)
			let message = '📩 *Yangi Forma Yuborildi!*\n\n'

			formData.forEach((value, key) => {
				message += `*${key}:* ${value}\n`
			})

			let telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

			fetch(telegramApiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
					parse_mode: 'Markdown',
				}),
			})
				.then(response => {
					if (response.ok) {
						return response.json()
					} else {
						throw new Error(
							`Telegram API error: ${response.status} ${response.statusText}`
						)
					}
				})
				.then(data => {
					thisForm.querySelector('.loading').classList.remove('d-block')
					if (data.ok) {
						thisForm.querySelector('.sent-message').classList.add('d-block')
						thisForm.reset()
					} else {
						throw new Error('Xabar yuborishda xatolik yuz berdi!')
					}
				})
				.catch(error => {
					displayError(thisForm, error.message)
				})
		})
	})

	function displayError(thisForm, error) {
		thisForm.querySelector('.loading').classList.remove('d-block')
		thisForm.querySelector('.error-message').innerHTML = error
		thisForm.querySelector('.error-message').classList.add('d-block')
	}
})()
