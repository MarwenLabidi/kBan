let dataBases = await indexedDB.databases()
const workspace = document.querySelector('.workspace')
const rightbar = document.querySelector('.rightbar')
const project = document.querySelector('#project')
let prevSibling = null
const components = await import('./ajaj.js')
const aside = document.querySelector('aside')
const main = document.querySelector('main')
const calendar = await import('./calendar.js')


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

	const waitUntilReturnName = (value) => {
		return new Promise((resolve, reject) => {
			const waitUntilReturn = setInterval(() => {
				let value = projectName
				if (value) {
					clearInterval(waitUntilReturn)
					resolve(value)
				}
			}, 4000)
		})
	}
	waitUntilReturnName(projectName).then((Name) => {
		// console.log(Name) FIXME send the name to the service worker
		aside.style.width = '28%'
		rightbar.append(components.sideBarRightHtml)
		const projectnamesHtml = document.querySelector('.projectnames')
		projectnamesHtml.innerText = Name
	})
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


const observerSideBar = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		const Roadmap = document.querySelector('.Roadmap')
		const KanbanBoard = document.querySelector('.KanbanBoard')
		const Bugs = document.querySelector('.Bugs')

		Roadmap.addEventListener('click', () => {
			workspace.style.gridTemplateColumns = '1fr'
			workspace.innerHTML = ''
			workspace.append(components.roadmapHtml)
			//! calendar
			const monthDom = document.querySelector('.mounth')
			monthDom.innerText = calendar.currentMounth
			const yearDom = document.querySelector('.year')
			yearDom.innerText = calendar.currentyear
			const daysDom = document.querySelector('.days')
			daysDom.innerText = ''

			const firstDayMth = calendar.getFirstDaysOfSpesificMonth(calendar.currentMounthNumber, calendar.currentyear)
			for (let index = 1; index < firstDayMth; index++) {
				let div = document.createElement('div')
				daysDom.append(div)
			}
			for (let index = 1; index <= calendar.monthDaysNumber[calendar.currentMounthNumber]; index++) {
				let div = document.createElement('div')
				div.innerText = index
				daysDom.append(div)
			}


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
})
// the elelemtn you wanna to observe
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
//TODO create functionality of roadmap use mutation observer
const observerWorkspace = new MutationObserver((mutations) => {
	const daysDom = document.querySelector('.days')
	const monthDom = document.querySelector('.mounth')
	const yearDom = document.querySelector('.year')

	mutations.forEach((mutation) => {
		const btnPrevious = document.querySelector('.btn_previous')
		const btnNext = document.querySelector('.btn_next')
		//FIXME
		let thisYear = calendar.currentyear
		let thisMonth = calendar.currentMounthNumber
		const createCalender = () => {
			daysDom.innerHTML = ''
			yearDom.innerText = thisYear
			monthDom.innerText = calendar.MONTHS[thisMonth]
			const PfirstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
			for (let index = 1; index < PfirstDayMth; index++) {
				let div = document.createElement('div')
				daysDom.append(div)
			}
			for (let index = 1; index <= calendar.monthDaysNumber[thisMonth]; index++) {
				let div = document.createElement('div')
				div.innerText = index
				daysDom.append(div)
			}
		}
		btnPrevious.addEventListener('click', () => {
			if (thisMonth === 0) {
				thisYear--
				thisMonth = 11
			} else {
				thisMonth--
			}
			createCalender()
		})

		btnNext.addEventListener('click', () => {
			if (thisMonth === 11) {
				thisYear++
				thisMonth = 0
			} else {
				thisMonth++
			}
			createCalender()
		})


	})
})

observerWorkspace.observe(workspace, {
	childList: true,
	// subtree: true
})

//TODO create a calendar 
//TODO create a add epic functionality
//TODO when you click it itwill show you prompt ask you
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