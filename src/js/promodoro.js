//svg circle configuration 
const audioPlayer = document.querySelector('#audioElement')
const circle = document.querySelector("circle")
const rayon = 30
let perimetre = 2 * Math.PI * rayon
let shrinkStrokeBy = 0
let colorOfStroke = 'green'
var audio = new Audio('/Mouse-Click.ogg')
var audioStop = new Audio('/stop.ogg')
var audioBack = new Audio('/getUp.ogg')
audioBack.crossOrigin = 'anonymous';
let playSong = true



circle.setAttribute("r", rayon)
circle.setAttribute("fill", "transparent")
circle.setAttribute("stroke", colorOfStroke)
circle.setAttribute("stroke-width", "10")
circle.setAttribute("stroke-dasharray", perimetre)
circle.setAttribute("stroke-dashoffset", shrinkStrokeBy)

//TODO ADD TRANSITION PROPERY TO THE SVG ELEMENT
//general formula is : offset=(peimeter*time Remainig)/total duration-perimeter
let buttonStartState = true
const startButton = document.querySelector(".promodoroTimer__ControlButton__Button")
const minuteFocusState = document.querySelector(".promodoroTimer__focusState__minute")
const secondFocusState = document.querySelector(".promodoroTimer__focusState__second")
const minuteBreakState = document.querySelector(".promodoroTimer__breakState__minute")
const secondBreakState = document.querySelector(".promodoroTimer__breakState__second")

const playButton = document.querySelector(".promodoroTimer__ControlButton__Button__Start")
const pauseButton = document.querySelector(".promodoroTimer__ControlButton__Button__Pause")

let oldValueMinuteFocus = minuteFocusState.value
let oldValueSecondFocus = secondFocusState.value
let oldValueMinuteBreak = minuteBreakState.value
let oldValueSecondBreak = secondBreakState.value
minuteFocusState.addEventListener('change', () => {
	oldValueMinuteFocus = minuteFocusState.value
})
secondFocusState.addEventListener('change', () => {
	oldValueSecondFocus = secondFocusState.value
})
minuteBreakState.addEventListener('change', () => {
	oldValueMinuteBreak = minuteBreakState.value
})
secondBreakState.addEventListener('change', () => {
	oldValueSecondBreak = secondBreakState.value
})

const countDownF = (minute, seconde, interval) => {


	shrinkStrokeBy = (perimetre * ((+minuteFocusState.value * 60 * 60) + (+secondFocusState.value * 60))) / (((+oldValueMinuteFocus * 60 * 60) + (+oldValueSecondFocus * 60))) - perimetre
	circle.setAttribute("stroke-dashoffset", shrinkStrokeBy)
	// 
	if (minute == 0 && seconde == 0) {
		if (playSong) {
			playSong = false
			audioStop.play()

		}

		shrinkStrokeBy = 0

		countDownB(minuteBreakState.value, secondBreakState.value, interval)

		return

	} else if (seconde == 0) {
		minute--
		minuteFocusState.value = minute
		seconde = 59
		secondFocusState.value = seconde




	} else {

		seconde--
		secondFocusState.value = seconde


	}
}

const countDownB = (minute, seconde, interval) => {
	let colorOfStroke = 'red'
	circle.setAttribute("stroke", colorOfStroke)



	shrinkStrokeBy = (perimetre * ((+minuteBreakState.value * 60 * 60) + (+secondBreakState.value * 60))) / (((+oldValueMinuteBreak * 60 * 60) + (+oldValueSecondBreak * 60))) - perimetre
	circle.setAttribute("stroke-dashoffset", shrinkStrokeBy)
	// 
	if (minute == 0 && seconde == 0) {
		audioPlayer.play()
		shrinkStrokeBy = 0
		circle.setAttribute("stroke-dashoffset", shrinkStrokeBy)


		// reset the value of the timer to the first state
		minuteFocusState.value = oldValueMinuteFocus
		secondFocusState.value = oldValueSecondFocus
		minuteBreakState.value = oldValueMinuteBreak
		secondBreakState.value = oldValueSecondBreak
		clearInterval(interval)
		buttonStartState = true
		playButton.style.display = "block"
		pauseButton.style.display = "none"


		return

	} else if (seconde == 0) {
		minute--
		minuteBreakState.value = minute
		seconde = 59
		secondBreakState.value = seconde




	} else {

		seconde--
		secondBreakState.value = seconde


	}
}

let focusTimer
startButton.addEventListener("click", () => {
	playSong = true
	let colorOfStroke = 'green'
	circle.setAttribute("stroke", colorOfStroke)
	if (buttonStartState) {

		playButton.style.display = "none"
		pauseButton.style.display = "block"
		// play sound of clicked button
		audio.play()

		focusTimer = setInterval(() => {

			countDownF(minuteFocusState.value, secondFocusState.value, focusTimer)
		}, 1000);




		buttonStartState = false
	} else {
		//create pause method code 
		playButton.style.display = "block"
		pauseButton.style.display = "none"
		audio.play()
		clearInterval(focusTimer)
		minuteFocusState.value = oldValueMinuteFocus
		secondFocusState.value = oldValueSecondFocus
		minuteBreakState.value = oldValueMinuteBreak
		secondBreakState.value = oldValueSecondBreak

		buttonStartState = true
	}
})