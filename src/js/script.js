let dataBases = await indexedDB.databases()
const components = await import('./ajaj.js')
const calendar = await import('./calendar.js')
const workspace = document.querySelector('.workspace')
const rightbar = document.querySelector('.rightbar')
const project = document.querySelector('#project')
const aside = document.querySelector('aside')
const main = document.querySelector('main')

let prevSibling = null
let monthDom = null
let yearDom = null
let daysDom = null
let thisYear = null
let thisMonth = null
let firstDayMth = null
let btnPrevious = null
let btnNext = null
let evrySingleDays = []


const waitUntilReturnName = (value, vl) => {
	return new Promise((resolve, reject) => {
		const waitUntilReturn = setInterval(() => {
			let value = eval(vl)
			if (value) {
				clearInterval(waitUntilReturn)
				resolve(value)
			}
		}, 4000)
	})
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
const getDayMonthYear = (date) => {
	const dateArr = date.split('-')
	return {
		day: dateArr[2],
		month: dateArr[1],
		year: dateArr[0]
	}
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

const colorSelectedDays = (currentMonth, currentYear) => {
	let multipleWeekColor = 0
	let count = 0
	return (startday, startMonth, startYear) => {
		return (endday, endMonth, endYear) => {
			return (color) => {
				if (currentMonth === startMonth && currentYear === startYear) {
					let allDaysSelected = [...document.querySelectorAll('.days div')]
					firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
					runOneTime(firstDayMth, allDaysSelected)()
					evrySingleDays.push(allDaysSelected)
					while (currentMonth < endMonth || currentYear < endYear) {
						currentMonth++
						btnNext.click()
						let allDaysSelected2 = [...document.querySelectorAll('.days div')]
						firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
						runOneTime(firstDayMth, allDaysSelected2)()
						evrySingleDays.push(allDaysSelected2)
						multipleWeekColor += evrySingleDays[count].length
						count++
					}
					let s = startday - 1
					let e = endday + multipleWeekColor

					let allDaysInOneTable = evrySingleDays.flat()

					for (let i = 0; i < allDaysInOneTable.length; i++) {
						for (let index = s; index < e; index++) {
							if (!allDaysInOneTable[index]) {
								break
							}
							allDaysInOneTable[index].style.backgroundColor = color
						}
					}
					return
				} else if (startMonth > currentMonth || startYear > currentYear) {
					currentMonth++
					btnNext.click()
					colorSelectedDays(currentMonth, currentYear)(startday, startMonth, startYear)(endday, endMonth, endYear)(color)
				} else {
					currentMonth--
					btnPrevious.click()
					colorSelectedDays(currentMonth, currentYear)(startday, startMonth, startYear)(endday, endMonth, endYear)(color)
				}

			}
		}
	}
}


project.addEventListener('click', () => {
	workspace.innerHTML = ''
	workspace.append(components.cardAddHtml)
	rightbar.style.display = 'block'
	if (dataBases.length > 0) {
		//  if the data base not empty add project cards
		workspace.style.gridTemplateColumns = '1fr 1fr 1fr'
		const Names = []
		dataBases.forEach(db => {
			Names.push(db.name)
			workspace.append(components.card_projectNamesHtml.cloneNode(true))
		})
		const cardNames = [...document.querySelectorAll('.cardName')]
		for (let index = 0; index < Names.length; index++) {
			cardNames[index].innerText = Names[index]
		}
		//TODO when you click to any project card it will show you seconde side bar and show you the data
		//TODO  if you click oneof them
	}

})
project.click()


const cardAdd = document.querySelector('.cardAdd')
if (cardAdd) {
	prevSibling = cardAdd.nextElementSibling;
	if (!prevSibling) {
		workspace.style.gridTemplateColumns = '1fr'
		cardAdd.style.placeItems = 'center'
	} else {
		workspace.style.gridTemplateColumns = '1fr 1fr 1fr'
	}
}


// when you click the add card card show prompt asking the name of the project
cardAdd.addEventListener('click', () => {

	Qual.confirmd("What is the Name of your Project ?", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"Submit", //blue button string
		"", // cancel button string
		"SubmitFun", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"string", //type of input you want whether a text ,password or number
		"Enter Project Name" //Placeholder text of input field
	)


	waitUntilReturnName(projectName, 'projectName').then((Name) => {
		//! console.log(Name) NOTE : send the name to the service worker
		aside.style.width = '28%'
		rightbar.append(components.sideBarRightHtml)
		const projectnamesHtml = document.querySelector('.projectnames')
		projectnamesHtml.innerText = Name
		projectName = null
	})
})



const observerSideBar = new MutationObserver((mutations) => {
	const Roadmap = document.querySelector('.Roadmap')
	const KanbanBoard = document.querySelector('.KanbanBoard')
	const Bugs = document.querySelector('.Bugs')

	Roadmap.addEventListener('click', () => {
		workspace.style.gridTemplateColumns = '1fr'
		workspace.innerHTML = ''
		workspace.append(components.roadmapHtml)
		monthDom = document.querySelector('.mounth')
		yearDom = document.querySelector('.year')
		daysDom = document.querySelector('.days')
		thisYear = calendar.currentyear
		thisMonth = calendar.currentMounthNumber
		firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
		createCalender()
	})
	Roadmap.click()

	KanbanBoard.addEventListener('click', () => {
		workspace.style.gridTemplateColumns = '1fr'
		workspace.innerHTML = ''
		workspace.append(components.kanbanboardHtml)
	})
	Bugs.addEventListener('click', () => {
		workspace.style.gridTemplateColumns = '1fr'
		workspace.innerHTML = ''
		workspace.append(components.bugsTemplateHtml)

	})

})
observerSideBar.observe(rightbar, {
	childList: true
})

report.addEventListener('click', () => {
	workspace.style.gridTemplateColumns = '1fr'
	aside.style.width = '5.2%'
	rightbar.style.display = 'none'
	workspace.innerHTML = ''
	workspace.append(components.reportHtml)

})
const observerWorkspace = new MutationObserver((mutations) => {
	const epicButton = document.querySelector('#epicButton')
	btnPrevious = document.querySelector('.btn_previous')
	btnNext = document.querySelector('.btn_next')

	if (!btnPrevious || !btnNext) {
		return
	}
	btnPrevious.addEventListener('click', () => {
		// evrySingleDays = [...document.querySelectorAll('.days div')]
		if (thisMonth === 0) {
			thisYear--
			thisMonth = 11
		} else {
			thisMonth--

		}
		firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
		createCalender()
	})
	btnNext.addEventListener('click', () => {
		// evrySingleDays = [...document.querySelectorAll('.days div')]
		if (thisMonth === 11) {
			thisYear++
			thisMonth = 0
		} else {
			thisMonth++
		}
		firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
		createCalender()
	})
	if (!epicButton) {
		return
	}
	epicButton.addEventListener('click', () => {
		Qual.confirmd("ADD EPIC ", //For heading
			"", //For sub heading
			inf, //icon variable we can define our own also by giving th link in double quotes
			"ADD", //blue button string
			"", // cancel button string
			"addEpic", //function name that is to be called on click on blue button
			"", //function name that is to be called on click on cancel button
			"string", //type of input you want whether a text ,password or number
			"Enter EPIC" //Placeholder text of input field
		)
		waitUntilReturnName(epicName, 'epicName').then((epic) => {
			waitUntilReturnName(startDate, 'startDate').then((sDate) => {
				waitUntilReturnName(endDate, 'endDate').then((eDate) => {

					//! NOTE send epic sDate  and eDate to the servece worker
					const startDayMonthYear = getDayMonthYear(sDate)
					const endDayMonthYear = getDayMonthYear(eDate)
					firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)


					const epicTask = document.querySelector('.epic_task')
					let epicTaskHtml = components.epicHtml
					epicTaskHtml.childNodes[1].innerHTML = epic

					// TODO create multiple color function random color
					epicTask.append(epicTaskHtml.cloneNode(true))
					runOneTime(firstDayMth, evrySingleDays)()					// if ((thisYear + '') === startDayMonthYear.year) {

					colorSelectedDays(thisMonth + 1, thisYear)(+startDayMonthYear.day, +startDayMonthYear.month, +startDayMonthYear.year)(+endDayMonthYear.day, +endDayMonthYear.month, +endDayMonthYear.year)('#f5f5f5')

					startDate = null
					epicName = null
					endDate = null
				})
			})
		})
	})


})

observerWorkspace.observe(workspace, {
	childList: true,
	// subtree: true
})


// create data base
// var db = new Dexie('aaaaaa');
// db.version(1).stores({
// 	Roadmap: `epics,color,startDay,finishDay,startMonth,finshMonth,year`,
// 	kanban: `backlog,inProgress,done`,
// 	bugs: `opened,closed`,
// });
// await db.Roadmap.bulkPut([{
// 	epics: "UX design",
// 	color: "red",
// 	startDay: "10 ",
// 	finishDay: "15 ",
// 	startMounth: "February",
// 	finshMonth: "March",
// 	year: "2022",
// }])

//TODO  for the epic name and the color of the epi and then the day of begin an the day of finish
//TODO when you click the eipic you can modifie it and delete i 
//TODO add a colorful line in the calendar of each epic with the coloryou choose

//TODO create functionality of kanban
//TODO create the add functionality it will show you prompt adked you for the name of the
//TODO create the delete functionality  and the drag and drop functionality

//TODO create functionality of bugs: it will show you a promp and when the bug is open the color is red and when you close it the color become green
//TODO CReate delete functionality

// TODO count the task open and in progress done and bugs and calcule the percent of each tasks


// TODO use pwa pluging and use the offline data base and use service worker with index dbTODO5 use background sync TODO6 crete instal button functionality

// TODO voice controll : a button to active voice controll and when you talk it show your voice and there is a little note beside the button when you click it show the instruction 