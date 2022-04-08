var kanbanBoardDATA = {}
//projectname
var PROJECTNAME = null
//register all the epics here
var allEpicsInThisProject = []
var allBugsInThisProject = []



var projectName = null;
var epicName = null;
var startDate = null;
var endDate = null;
var KboardName = null;
var cardKanbanContent = null;
var comment = null;
var bugName = null;



var calendar
import('/calendar.js').then(calendarr => {
	calendar = calendarr
})

var prevSibling = null
var monthDom = null
var yearDom = null
var daysDom = null



var thisYear = null
var thisMonth = null
var firstDayMth = null
// var btnPrevious = null
var btnNext = null
var evrySingleDays = []
var color = null
var startDaysToColorArr = []
var endDaysToColorArr = []
var colorArr = []






const SubmitFun = () => {
	projectName = inx;
	// Qual.successd('DONE');
	// setTimeout(() => {
	close_qual()
	// }, 1000);
}
const endDateF = () => {
	endDate = inx
	setTimeout(() => {
		close_qual()
	}, 1000);
}
const startDateF = () => {
	startDate = inx;
	Qual.confirmd("When Are You Gonna finish this ", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"END", //blue button string
		"", // cancel button string
		"endDateF", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"date", //type of input you want whether a text ,password or number
		"Enter finish date" //Placeholder text of input field
	)
}
const addEpic = () => {
	epicName = inx;
	Qual.confirmd("When Are You Gonna Start this ", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"START", //blue button string
		"", // cancel button string
		"startDateF", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"date", //type of input you want whether a text ,password or number
		"Enter start date" //Placeholder text of input field
	)
}

const createKboardPopUp = () => {
	KboardName = inx;
	close_qual();

}

const createcardKanban = () => {
	cardKanbanContent = inx;
	close_qual();
}

const addComment = () => {
	comment = inx;
	close_qual();
}

const addBug = () => {
	bugName = inx;
	close_qual();
}









// the add comments button functions 
function waitUntilReturnName(value, vl) {
	return new Promise((resolve, reject) => {
		const waitUntilReturn = setInterval(() => {
			setTimeout(() => {
				clearInterval(waitUntilReturn)
			}, 10000);
			value = eval(vl)
			if (value !== null) {
				clearInterval(waitUntilReturn)
				resolve(value)
			}
		}, 2000)
	})
}

function functionName(e) {
	Qual.confirmd("ADD COMMENT", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"ADD", //blue button string
		"", // cancel button string
		"addComment", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"string", //type of input you want whether a text ,password or number
		"Enter your comment" //Placeholder text of input field
	)


	waitUntilReturnName(comment, 'comment').then((comments) => {
		//add comment to the card
		const li = document.createElement('li')
		li.innerHTML = comments
		e.path[2].children[3].append(li)
		comment = null
		//count the number of commnet
		let currentNumberOFComments = +e.path[2].children[2].children[0].textContent
		currentNumberOFComments++
		e.path[2].children[2].children[0].textContent = currentNumberOFComments + ''

		//add the comments to the arrData
		//get the kanban boaard of this card
		let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value



		// get the place (backlog,inprogress,done) of this card
		let theplaceDropit = e.path[3].getAttribute('id')
		theplaceDropit = theplaceDropit.charAt(0).toUpperCase() + theplaceDropit.substring(1);

		let constetncard = e.path[2].children[0].textContent
		kanbanBoardDATA[kbanBoardListSelectedValue][theplaceDropit].forEach((card, index) => {
			if (card.constent == constetncard) {
				card.commenst.push(comments)
			}
		})
	})

}

const runOneTime = (firstDay, arrDays) => {
	let run = true
	return () => {
		if (run === true) {
			for (let index = 1; index < firstDay; index++) {
				arrDays.shift()
			}
			run = false
		}
	}
}

const createCalender = () => {
	daysDom.innerHTML = ''
	yearDom.innerText = thisYear

	monthDom.innerText = calendar.MONTHS[thisMonth]


	for (let index = 1; index < firstDayMth; index++) {
		let div = document.createElement('div')
		daysDom.append(div)
	}
	for (let index = 1; index <= calendar.monthDaysNumber[thisMonth]; index++) {
		let div = document.createElement('div')
		div.innerText = index
		daysDom.append(div)
	}
}

const colorDaysINCalendarNEXTbPREVIOUS = (startDatesarr, endDatesarr, currentMonth, currentYear) => {


	setTimeout(() => {
		let allDaysSelected = [...document.querySelectorAll('.days div')]
		let firstDayMths = calendar.getFirstDaysOfSpesificMonth(currentMonth - 1, currentYear)
		runOneTime(firstDayMths, allDaysSelected)()

		for (let i = 0; i < startDatesarr.length; i++) {
			if (startDatesarr[i].year == currentYear && startDatesarr[i].month == currentMonth) {
				if (endDatesarr[i].month == startDatesarr[i].month) {
					for (let index = startDatesarr[i].day; index <= endDatesarr[i].day; index++) {
						allDaysSelected[index - 1].style.backgroundColor = colorArr[i]
					}
				} else {
					for (let index = startDatesarr[i].day; index <= allDaysSelected.length; index++) {
						allDaysSelected[index - 1].style.backgroundColor = colorArr[i]
					}
				}

			} else if (endDatesarr[i].year == currentYear && endDatesarr[i].month == currentMonth) {
				setTimeout(() => {
					let allDaysSelected2 = [...document.querySelectorAll('.days div')]
					let firstDayMths2 = calendar.getFirstDaysOfSpesificMonth(currentMonth - 1, currentYear)
					runOneTime(firstDayMths2, allDaysSelected2)()
					for (let index = 0; index < endDatesarr[i].day; index++) {
						allDaysSelected2[index].style.backgroundColor = colorArr[i]
					}
				}, 10);
			}
		}
	}, 10);
}

function previous(e) {
	let theOneMonth = thisMonth
	if (thisMonth === 0) {
		theOneMonth = 12;
	}

	if (startDaysToColorArr.length > 0) {
		colorDaysINCalendarNEXTbPREVIOUS(startDaysToColorArr, endDaysToColorArr, theOneMonth, thisYear)

	}



	if (thisMonth === 0) {
		thisYear--
		thisMonth = 11
	} else {
		thisMonth--
	}
	firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
	createCalender()
}

function next(e) {
	let theOneMonthss = thisMonth + 2
	if (theOneMonthss === 13) {
		theOneMonthss = 12;
	}
	if (startDaysToColorArr.length > 0) {
		colorDaysINCalendarNEXTbPREVIOUS(startDaysToColorArr, endDaysToColorArr, theOneMonthss, thisYear)
	}

	if (thisMonth === 11) {
		thisYear++
		thisMonth = 0
	} else {
		thisMonth++
	}
	firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
	createCalender()
}


function deleteDaysColorFromCalendar(e) {
	//--> hide option
	e.path[1].style.display = 'none'
	//--> delete the curren epic
	//--> all the epics
	let allEpicsInoine = [...e.path[3].children]
	allEpicsInoine.shift()


	// get the index of the current epic
	let indexOFEpic = 0
	allEpicsInoine.forEach((epic, index) => {

		if (epic.firstChild.textContent == e.path[2].firstChild.textContent) {

			indexOFEpic = index
		}
	})

	//--> detete the color from the calendar

	startDaysToColorArr.splice(indexOFEpic, 1)



	endDaysToColorArr.splice(indexOFEpic, 1)


	colorArr.splice(indexOFEpic, 1)





	e.path[2].remove()
	//refresh the color in calendar
	document.querySelector('.btn_next').click()
	document.querySelector('.btn_previous').click()

}

function createKbanFromRoadmap(e) {
	console.log(`create`);
	document.querySelector('.KanbanBoard').click()

	setTimeout(() => {

		document.querySelector('#newKboard').click()
		close_qual();
		KboardName = e.path[2].firstChild.textContent
	}, 100);

}