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


var components
var calendar
// import('/calendar.js').then(calendarr => {
// 	calendar = calendarr
// })

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




function addBugsFromButt() {

	const tbody = document.querySelector('tbody')
	Qual.confirmd("ADD Bug ", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"ADD", //blue button string
		"", // cancel button string
		"addBug", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"string", //type of input you want whether a text ,password or number
		"Enter Bug" //Placeholder text of input field
	)
	waitUntilReturnName(bugName, 'bugName').then((bug) => {
		let BUG = components.bugbarHtml
		BUG.childNodes[1].childNodes[1].childNodes[1].innerText = bug
		BUG.childNodes[3].childNodes[3].innerHTML = new Date().toLocaleDateString()
		BUG.childNodes[7].innerHTML = "open"
		tbody.append(BUG.cloneNode(true))
		//--> create the bugs data
		allBugsInThisProject.push({
			bugName: bug,
			bugStatus: "open",
			bugOpenDate: new Date().toLocaleDateString(),
			bugClosedDate: `on going`
		})
		// SEND BUG TO SEVICE WORKER
		navigator.serviceWorker.controller.postMessage({
			bugs: allBugsInThisProject,
		});
		bugName = null
	})


}

//--> add bug function 
function threeDotsBugs(e) {
	// 
	// 
	e.path[3].children[1].children[0].style.display = 'block'
	setTimeout(() => {
		e.path[3].children[1].children[0].style.display = 'none'

	}, 2000);
}

function closeThisBug(e) {
	//option
	// 
	//all the tab
	// 
	//on going
	// 
	//open
	// 
	// 

	//name
	// 


	// 
	e.parentElement.style.display = 'none'
	//date

	e.parentElement.parentElement.parentElement.children[2].innerText = new Date().toLocaleDateString()
	//closed
	// 
	e.parentElement.parentElement.parentElement.children[3].innerText = "closed"
	e.parentElement.parentElement.parentElement.classList.add('closegreenclass')


	function changeBugStatus(name, closedDate) {
		allBugsInThisProject.forEach((bug, index) => {
			if (name.trim() == bug.bugName) {

				bug.bugClosedDate = closedDate
				bug.bugStatus = "closed"
			} else {
				return
			}
		})
	}

	changeBugStatus(e.parentElement.parentElement.parentElement.children[0].innerText, new Date().toLocaleDateString())

	navigator.serviceWorker.controller.postMessage({
		bugs: allBugsInThisProject,
	});

}
function deleteThisBug(e) {


	e.parentElement.style.display = 'none'
	//delete 
	//get the name
	let n = e.parentElement.parentElement.parentElement.children[0].innerText


	// 
	e.parentElement.parentElement.parentElement.remove()

	function deleteBug(name) {

		allBugsInThisProject.forEach((bug, index) => {

			if (name.trim() == bug.bugName) {
				allBugsInThisProject.splice(index, 1)
			} else {
				return
			}
		})
	}
	deleteBug(n)
	// SEND BUG TO SEVICE WORKER
	navigator.serviceWorker.controller.postMessage({
		bugs: allBugsInThisProject,
	});







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
		navigator.serviceWorker.controller.postMessage({
			kban: kanbanBoardDATA,
		});
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

	allEpicsInThisProject.splice(indexOFEpic, 1)

	startDaysToColorArr.splice(indexOFEpic, 1)



	endDaysToColorArr.splice(indexOFEpic, 1)


	colorArr.splice(indexOFEpic, 1)
	navigator.serviceWorker.controller.postMessage({
		epics: allEpicsInThisProject,
	});
	navigator.serviceWorker.controller.postMessage({
		start: startDaysToColorArr,
		end: endDaysToColorArr,
		color: colorArr
	});





	e.path[2].remove()
	//refresh the color in calendar
	document.querySelector('.btn_next').click()
	document.querySelector('.btn_previous').click()

}

function createKbanFromRoadmap(e) {

	document.querySelector('.KanbanBoard').click()

	setTimeout(() => {

		document.querySelector('#newKboard').click()
		close_qual();
		KboardName = e.path[2].firstChild.textContent
	}, 100);

}

function showDots(e) {
	// 
	// 
	e.path[1].children[2].style.display = 'block'
	setTimeout(() => {
		e.path[1].children[2].style.display = 'none'
	}, 2000);
}



function loadDataFromIndexDB(e) {

	// let name = e.path[0].children[0].textContent
	// if(typeof name === 'undefined'){name=e.path[0].textContent}
	let name
	if (e.path[0].children[0]) {
		name = e.path[0].children[0].textContent

	} else {
		name = e.path[0].textContent

	}


	PROJECTNAME = name

	// show sidebar
	const aside = document.querySelector('aside')
	const rightbar = document.querySelector('.rightbar')

	aside.style.width = '28%'
	aside.style.minWidth = '300px'
	rightbar.append(components.sideBarRightHtml)
	const projectnamesHtml = document.querySelector('.projectnames')
	projectnamesHtml.innerText = name
	//--> load data from indexDB
	let version = 1
	const db = new Dexie(name);
	db.version(version).stores({
		allEpicsInThisProject: "epic",
		startDaysToColorArr: "startDays",
		endDaysToColorArr: "endDays",
		colorArr: "colorArr",
		kanbanBoardDATA: "kanbanBoardDATA",
		allBugsInThisProject: "allBugsInThisProject",
	});
	db.colorArr.bulkGet(["colorArr"]).then((data) => {
		// 
		colorArr = data[0].data

	})

	db.startDaysToColorArr.bulkGet(["startDays"]).then((data) => {
		// 
		startDaysToColorArr = data[0].data

	})
	db.endDaysToColorArr.bulkGet(["endDays"]).then((data) => {
		// 
		endDaysToColorArr = data[0].data

	})
	db.allEpicsInThisProject.bulkGet(["epic"]).then((data) => {
		// 
		allEpicsInThisProject = data[0].data

		// ADD EPIC CARD TO THE ROADMAP section
		allEpicsInThisProject.forEach((epic, index) => {
			const epicTask = document.querySelector('.epic_task')
			let epicTaskHtml = components.epicHtml
			epicTaskHtml.childNodes[0].innerHTML = epic
			epicTaskHtml.style.backgroundColor = colorArr[index]
			epicTask.append(epicTaskHtml.cloneNode(true))
		})
		// click previous then  next button to color the days
		let btnPrevious = document.querySelector('.btn_previous')

		let btnNext = document.querySelector('.btn_next')
		setTimeout(() => {

			btnPrevious.click()
			btnNext.click()
		}, 200)
	})
	setTimeout(() => {
		db.kanbanBoardDATA.bulkGet(["kanbanBoardDATA"]).then((data) => {
			// 
			kanbanBoardDATA = data[0].data
			let arrData = Object.keys(kanbanBoardDATA);

			const KanbanBoard = document.querySelector('.KanbanBoard')
			KanbanBoard.click()
			// 
			// 
			// create kanban boards and add it to the list
			// create cards with comments

			const nameKboard = document.querySelector('#nameKboard')
			const kbanBoardList = document.querySelector('#kbanBoardList')
			const Backlog = document.querySelector('#Backlog')
			const InProgress = document.querySelector('#inProgress')
			const Done = document.querySelector('#done')

			arrData.forEach((kboard, index) => {
				let optionHTML = document.createElement('option')
				optionHTML.innerHTML = kboard
				kbanBoardList.append(optionHTML)
				nameKboard.innerHTML = kboard

			})

			//get the current kboard and use foreach on it to create the cards
			let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
			//backlog
			kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.forEach((crd, index) => {
				// add card
				let card = components.cardBoardkanbanHtml
				card.children[0].innerHTML = crd.constent
				card.childNodes[7].innerHTML = ''
				//add comments
				crd.commenst.forEach((comt, index) => {
					let lia = document.createElement('li')
					lia.innerHTML = comt
					card.childNodes[7].append(lia)

				})
				//add number of comments
				card.children[2].children[0].textContent = crd.commenst.length
				Backlog.append(card.cloneNode(true))
				allCardBoard = document.querySelectorAll('.cardBoard')


			})

			//in progress

			kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.forEach((crd, index) => {
				// add card
				let card = components.cardBoardkanbanHtml
				card.children[0].innerHTML = crd.constent
				card.childNodes[7].innerHTML = ''
				//add comments
				crd.commenst.forEach((comt, index) => {
					let lia = document.createElement('li')
					lia.innerHTML = comt
					card.childNodes[7].append(lia)

				})
				//add number of comments
				card.children[2].children[0].textContent = crd.commenst.length
				InProgress.append(card.cloneNode(true))
				allCardBoard = document.querySelectorAll('.cardBoard')


			})

			//done 

			kanbanBoardDATA[kbanBoardListSelectedValue].Done.forEach((crd, index) => {
				// add card
				let card = components.cardBoardkanbanHtml
				card.children[0].innerHTML = crd.constent
				card.childNodes[7].innerHTML = ''
				//add comments
				crd.commenst.forEach((comt, index) => {
					let lia = document.createElement('li')
					lia.innerHTML = comt
					card.childNodes[7].append(lia)
				})
				//add number of comments
				card.children[2].children[0].textContent = crd.commenst.length
				Done.append(card.cloneNode(true))
				allCardBoard = document.querySelectorAll('.cardBoard')


			})
		})

	}, 300);



	setTimeout(() => {
		db.allBugsInThisProject.bulkGet(["allBugsInThisProject"]).then((data) => {
			// 
			allBugsInThisProject = data[0].data

			const Bugs = document.querySelector('.Bugs')
			Bugs.click()
			// create bugs
			const tbody = document.querySelector('tbody')
			let BUG = components.bugbarHtml
			allBugsInThisProject.forEach((bug, index) => {
				BUG.childNodes[1].childNodes[1].childNodes[1].innerText = bug.bugName
				BUG.childNodes[3].childNodes[3].innerHTML = bug.bugOpenDate
				BUG.childNodes[7].innerHTML = bug.bugStatus
				BUG.children[2].textContent = bug.bugClosedDate
				if(bug.bugStatus === 'closed'){
					BUG.classList.add('closegreenclass')
				}

				tbody.append(BUG.cloneNode(true))
				
			})

		})

	}, 800);





}

