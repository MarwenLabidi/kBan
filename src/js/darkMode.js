const darkMode = document.querySelector('.night')
const main = document.querySelector('.main')


darkMode.addEventListener('click', () => {

	//play sound
	var audio = new Audio("/lightswitch.mp3");
	audio.play();
	//play animation 
	darkMode.style.display = 'block'
	darkMode.animate([
		// keyframes
		{
			transform: 'translateY(0px)'
		},
		{
			transform: 'translateY(-150px)'
		}
	], {
		// timing options
		duration: 800,
		// iterations: Infinity
		animationFillMode: 'both'
	})
	//change the content to sun 🌤️ or 🌙 do an if statement
	setTimeout(() => {
		if (darkMode.textContent === '🌙') {
			darkMode.textContent = '🌤️'
			// add changeTheme class  to the main
			main.classList.add('changeTheme')
		}else{
			darkMode.textContent = '🌙'
			//remove changeTheme from the main
			main.classList.remove('changeTheme')
		}
	},800)
	setTimeout(() => {
		darkMode.animate([
			// keyframes
			{
				transform: 'translateY(100px)'
			},
			{
				transform: 'translateY(0px)'
			}
		], {
			// timing options
			duration: 1000,
			// iterations: Infinity
			animationFillMode: 'both'

		})

	}, 810)


})