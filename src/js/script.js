let dataBases = await indexedDB.databases()
const workspace = document.querySelector('.workspace')
// let projectName = null
const rightbar = document.querySelector('.rightbar')
const project = document.querySelector('#project')
let prevSibling = null

const {
	cardAddHtml
} = await import('./ajaj.js')

project.addEventListener('click', () => {
	workspace.innerHTML = ''
	workspace.append(cardAddHtml)

})
project.click()

// if (dataBases.length > 0) {
// 	//TODO  if the data base not empty add project cards
// 	const Names = []
// 	const {
// 		card_projectNamesHtml
// 	} = await import('./ajaj.js')
// 	dataBases.forEach(db => {
// 		Names.push(db.name)
// 		workspace.append(card_projectNamesHtml.cloneNode(true))
// 	})
// 	const cardNames = [...document.querySelectorAll('.cardName')]
// 	for (let index = 0; index < Names.length; index++) {
// 		cardNames[index].innerText = Names[index]
// 	}
// 	//TODO when you click to any project card it will show you seconde side bar and show you the data
// 	//TODO  if you click oneof them
// }

//style card-Add
const cardAdd = document.querySelector('.cardAdd')
if (cardAdd) {
	prevSibling = cardAdd.previousElementSibling;
}
if (!prevSibling) {
	workspace.style.gridTemplateColumns = '1fr 1fr 1fr'
}

//TODO when you click the add card card show prompt asking the name of the project
cardAdd.addEventListener('click',  () => {

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
})
// FIXME FIGURE OUT A SOLUTION FOR THIS
setTimeout(() => {
	console.log(projectName)
}, 5000);
//TODO when you submit the name it will show you the seconde side barr(roadmap kanban board and bugs)for the project
//TODO create a data base
// let projectName = localStorage.getItem('projectName');
// localStorage.clear();
// if (projectName) {
// 	const {
// 		sideBarRightHtml
// 	} = await import('./ajaj.js')
// 	rightbar.append(sideBarRightHtml)
// }

//create data base
// var db = new Dexie(projectName);
// db.version(1).stores({
// 	Roadmap: `epics,color,startDay,finishDay,startMonth,finshMonth,year`,
// 	kanban: `backlog,inProgress,done`,
// 	bugs: `opened,closed`,
// });
// await db.Roadmap.bulkPut([{
// 	// epics: "UX design",
// 	// color: "red",
// 	// startDay: "10 ",
// 	// finishDay: "15 ",
// 	// startMounth: "February",
// 	// finshMonth: "March",
// 	// year: "2022",
// }])


// }
//TODO if you click roadmap show roadmap component
const Roadmap = document.querySelector('.Roadmap')
if (Roadmap !== null) {
	const {
		roadmapHtml
	} = await import('./ajaj.js')

	Roadmap.addEventListener('click', () => {
		workspace.innerHTML = ''
		workspace.append(roadmapHtml)
	})
}
//TODO  else if you click the kanban it will show ou kanban
const KanbanBoard = document.querySelector('.KanbanBoard')
if (KanbanBoard !== null) {
	const {
		kanbanboardHtml
	} = await import('./ajaj.js')
	KanbanBoard.addEventListener('click', () => {
		workspace.innerHTML = ''
		workspace.append(kanbanboardHtml)


	})
}
//TODO  else it will show you bugs component
const Bugs = document.querySelector('.Bugs')
if (Bugs !== null) {
	const {
		bugsTemplateHtml
	} = await import('./ajaj.js')
	Bugs.addEventListener('click', () => {
		workspace.innerHTML = ''
		workspace.append(bugsTemplateHtml)

	})
}
//TODO create functionality of roadmap
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



// TODO create the report functionality
// const reports = document.querySelector('.reports')
// const report=document.querySelector('#report')
// 	const {
// 		reportHtml
// 	} = await import('./ajaj.js')
// 	report.addEventListener('click', () => {
// 		workspace.innerHTML = ''
// 		workspace.append(reportHtml)

// 	})

// TODO count the task open and in progress done and bugs and calcule the percent of each tasks


// TODO use pwa pluging and use the offline data base and use service worker with index dbTODO5 use background sync TODO6 crete instal button functionality