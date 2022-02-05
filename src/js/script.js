let dataBases = await indexedDB.databases()
const workspace = document.querySelector('.workspace')
let projectName = null
const rightbar = document.querySelector('.rightbar')


if (dataBases.length > 0) {
	//TODO  if the data base not empty add project cards
	const Names = []
	const {
		card_projectNamesHtml
	} = await import('./ajaj.js')
	dataBases.forEach(db => {
		Names.push(db.name)
		workspace.append(card_projectNamesHtml.cloneNode(true))
	})
	const cardNames = [...document.querySelectorAll('.cardName')]
	for (let index = 0; index < Names.length; index++) {
		console.log(Names[index])
		console.log(cardNames[index])
		cardNames[index].innerText = Names[index]
	}
	//TODO when you click to any project card it will show you seconde side bar and show you the data
	//TODO  if you click oneof them

}


//TODO add add-card component to the main page
const {
	cardAddHtml
} = await import('./ajaj.js')

workspace.append(cardAddHtml)

//TODO when you click the add card card show prompt asking the name of the project
const cardAdd = document.querySelector('.cardAdd')
let prevSibling = cardAdd.previousElementSibling;
if(!prevSibling){
	workspace.style.display='flex'
}

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
	);
})


//TODO when you submit the name it will show you the seconde side barr(roadmap kanban board and bugs)for the project
//TODO create a data base
projectName = localStorage.getItem('projectName');
localStorage.clear();
//FIXME change the if statemetn from project name to get fromthe database
if (projectName) {
	const {
		sideBarRightHtml
	} = await import('./ajaj.js')
	rightbar.append(sideBarRightHtml)

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

	
}
//TODO if you click roadmap show roadmap component
//TODO  else if you click the kanban it will show ou kanban
//TODO  else it will show you bugs component
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
// TODO count the task open and in progress done and bugs and calcule the percent of each tasks


// TODO use pwa pluging and use the offline data base and use service worker with index dbTODO5 use background sync TODO6 crete instal button functionality