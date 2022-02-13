export const MONTHS = ['junuary', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
// const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

let today = new Date();
export let currentMounthNumber = today.getMonth()

export let currentyear = today.getFullYear()
export let currentMounth = MONTHS[currentMounthNumber]
export let currentdate = today.getDate();
export let currentdayNumber = today.getDay()

const leapYear = (year) => {
	if (year % 4 === 0 || year % 400 === 0 && year % 100 !== 0) {
		return true
	} else {
		return false
	}
}
let febraryDaysNumber = leapYear(currentyear) ? 29 : 28
export const monthDaysNumber = [31, febraryDaysNumber, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const getFirstDaysOfSpesificMonth = (month, year) => {
	return  new Date(year, month,1).getDay();
}

