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
let color = null


const waitUntilReturnName = (value, vl) => {
	return new Promise((resolve, reject) => {
		const waitUntilReturn = setInterval(() => {
			value = eval(vl)
			if (value !== null) {
				clearInterval(waitUntilReturn)
				resolve(value)
			}
		}, 2000)
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

const generateRandomBrightestHSLColor = () => {
	return "hsla(" + ~~(360 * Math.random()) + "," +
		"70%," +
		"80%)"
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

//FIXME: add the half of the height to the position expected
const getCardToInsertBeforItOtherCard = (allCard, mousePosition) => {
	if (allCard.length === 0) {
		return
	}
	const aftercard = allCard.filter(card => {
		return card.getBoundingClientRect().top > mousePosition
	})
	return aftercard[0]
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
		aside.style.minWidth = '300px'
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
		observerWorkspace.observe(workspace, {
			childList: true,
			subtree: true
		})
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
		//TODO add color fucntion days and get the data from indexdb
	})
	Roadmap.click()
	KanbanBoard.addEventListener('click', () => {
		observerWorkspace.observe(workspace, {
			childList: true,
			subtree: true
		})
		workspace.style.gridTemplateColumns = '1fr'
		workspace.innerHTML = ''
		workspace.append(components.kanbanboardHtml)
	})
	Bugs.addEventListener('click', () => {
		observerWorkspace.observe(workspace, {
			childList: true,
			subtree: true
		})
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
	aside.style.minWidth = '100px'
	rightbar.style.display = 'none'
	workspace.innerHTML = ''
	workspace.append(components.reportHtml)

})
const observerWorkspace = new MutationObserver((mutations) => {

	//ROADMAP FUNCTIONLITY
	const epicButton = document.querySelector('#epicButton')
	btnPrevious = document.querySelector('.btn_previous')
	btnNext = document.querySelector('.btn_next')
	if (btnPrevious || btnNext) {
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
			//TODO add color fucntion days and get the data from indexdb
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
			//TODO add color fucntion days and get the data from indexdb
		})
	}
	if (epicButton) {
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
						//NOTE send epic sDate  and eDate to the servece worker
						const startDayMonthYear = getDayMonthYear(sDate)
						const endDayMonthYear = getDayMonthYear(eDate)
						firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
						const epicTask = document.querySelector('.epic_task')
						let epicTaskHtml = components.epicHtml
						epicTaskHtml.childNodes[1].innerHTML = epic
						color = generateRandomBrightestHSLColor()
						epicTaskHtml.style.backgroundColor = color
						epicTask.append(epicTaskHtml.cloneNode(true))
						runOneTime(firstDayMth, evrySingleDays)()
						colorSelectedDays(thisMonth + 1, thisYear)(+startDayMonthYear.day, +startDayMonthYear.month, +startDayMonthYear.year)(+endDayMonthYear.day, +endDayMonthYear.month, +endDayMonthYear.year)(color)
						//NOTE send all the data to the service worker to color when there is a colorfull
						//TODO add data attribute to he epic task {debutdate and findate and month....} when you dlete it you know the days to uncolor it
						//?show the options in the epic task
						const epic3dots = document.querySelectorAll('.epic3dots')
						const options = document.querySelectorAll('.options')
						const epicH3 = document.querySelectorAll('.epicH3')
						let indexOfChosenEpic = null
						if (epic3dots) {
							epic3dots.forEach((epic3dot, index) => {
								epic3dot.addEventListener('click', () => {
									options[index].style.display = 'block'
									let indexOfChosenEpic = index
									setTimeout(() => {
										options[index].style.display = 'none'
									}, 2000);
									options[indexOfChosenEpic].firstChild.addEventListener('click', () => {
										//TODO create a kanban board from the epic
										// console.log('create kanban from epic');
										options[index].style.display = 'none'
										indexOfChosenEpic = null
									})
									options[indexOfChosenEpic].lastChild.addEventListener('click', () => {
										// console.log('delete epic');
										options[index].style.display = 'none'
										epicH3[index].remove()
										//TODO delete the color in the calendar call color function with gray color
										//TODO delete the epic from the indexdb
										indexOfChosenEpic = null
									})
								});
							})
						}
						//FIXME delete epic task create a function 
						startDate = null
						epicName = null
						endDate = null
					})
				})
			})
		})
	}
	//KANBAN FUNCTIONALITY
	const nameKboard = document.querySelector('#nameKboard')
	const buttonNewKboard = document.querySelector('#newKboard')
	const kbanBoardList = document.querySelector('#kbanBoardList')
	const Backlog = document.querySelector('#Backlog')
	const InProgress = document.querySelector('#inProgress')
	const Done = document.querySelector('#done')
	if (buttonNewKboard) {
		buttonNewKboard.addEventListener('click', () => {
			observerWorkspace.observe(workspace, {
				childList: true,
				subtree: true
			})
			Qual.confirmd("NEW KBOARD ", //For heading
				"", //For sub heading
				inf, //icon variable we can define our own also by giving th link in double quotes
				"CREATE", //blue button string
				"", // cancel button string
				"createKboardPopUp", //function name that is to be called on click on blue button
				"", //function name that is to be called on click on cancel button
				"string", //type of input you want whether a text ,password or number
				"Enter the name of kBoard" //Placeholder text of input field
			)
			waitUntilReturnName(KboardName, 'KboardName').then((nameKBOARD) => {
				nameKboard.innerHTML = nameKBOARD
				//TODO send it to servie worker and create table
			})
		})
		// TODO get the kanban board list from the service worker @kanbanBoardlist
		const nameKBOARDFromDB = `hello` //!FIXME get the name of the kanban board from the service worker
		const optionListKboard = [...kbanBoardList.children]
		optionListKboard.forEach((option) => {
			if (option.value === nameKBOARDFromDB) {
				option.selected = true
				//TODO load the data [kbanBoardList.value] in the board from service worker
				const addCardKbanBoardInProgress = document.querySelector('#addCardKbanBoardInProgress')
				addCardKbanBoardInProgress.addEventListener('click', () => {
					observerWorkspace.observe(workspace, {
						childList: true,
						subtree: true
					})
					//TODO create kban first or choose from the list : impement this sooner befor you  create the card
					Qual.confirmd("NEW CARD ", //For heading
						"", //For sub heading
						inf, //icon variable we can define our own also by giving th link in double quotes
						"CREATE", //blue button string
						"", // cancel button string
						"createcardKanban", //function name that is to be called on click on blue button
						"", //function name that is to be called on click on cancel button
						"string", //type of input you want whether a text ,password or number
						"Enter the content of the card" //Placeholder text of input field
					)
					waitUntilReturnName(cardKanbanContent, 'cardKanbanContent').then((contentCard) => {
						let card = components.cardBoardkanbanHtml
						card.children[0].innerHTML = contentCard
						Backlog.append(card.cloneNode(true))
						//TODO add this canban card to the service worker
						cardKanbanContent = null
					})
				})
				const allCardBoard = document.querySelectorAll('.cardBoard')
				const AllComments = document.querySelectorAll('.comments')
				const showComment = document.querySelectorAll('.showComment')
				//TODO delete card and add comment 
				if (allCardBoard) {
					allCardBoard.forEach((card, index) => {
						//*delete card
						AllComments[index].children[3].addEventListener('click', () => {
							card.remove()
						})
						//*add comment
						AllComments[index].children[2].addEventListener('click', () => {
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
								//TODO add this comment to the data base 
								const li = document.createElement('li')
								li.innerHTML = comments
								showComment[index].append(li)
								comment = null
							})
						})
						//*show comment
						AllComments[index].children[1].addEventListener('click', () => {
							showComment[index].style.display = 'block'
							setTimeout(() => {
								showComment[index].style.display = 'none'
							}, 5000);
						})
						//* the number of comments
						AllComments[index].children[0].addEventListener('click', () => {
							//TODO get the numberrof comment and add it [change p inner text]
							// console.log('delete card');	
						})
						//NOTE drag and drop functionality
						card.addEventListener('dragstart', (e) => {
							//TODO ADD CLASS TO THE CARD : change opacity andmake a cool animatiom
							card.classList.add('dragging')
						})
						card.addEventListener('dragend', (e) => {
							//TODO REMOVE CLASS FROM THE CARD
							card.classList.remove('dragging')
						})
					})
					const backlogInprogressDones = [Backlog, InProgress, Done]
					// let cardDomRec = []
					backlogInprogressDones.forEach((backlogInprogressDone) => {
						backlogInprogressDone.addEventListener('dragover', (e) => {
							e.preventDefault()
							observerWorkspace.disconnect()
							// cardDomRec.length = 0
						})
						backlogInprogressDone.addEventListener('drop', (e) => {
							e.preventDefault()
							const dragable = document.querySelector('.dragging')
							// backlogInprogressDone.appendChild(dragable)
							console.log(`drop in ${backlogInprogressDone.id}`);
							//TODO send card iformation to the service worker 
							//TODO SEND THE POSIONN OF EEACH CARD TO THE DATABASE
							let childCardexpectMe = [...backlogInprogressDone.children]
							// let cardDomRec = []
							childCardexpectMe.shift()
							console.log(childCardexpectMe);
							console.log(e.clientY);
							let minC = getCardToInsertBeforItOtherCard(childCardexpectMe, e.clientY)
							console.log(minC);
							if (childCardexpectMe.length > 0) {
								backlogInprogressDone.insertBefore(dragable, minC)
							} else {
								backlogInprogressDone.appendChild(dragable)
							}
							//TODO make the change in the database
						})
					})
				}
			}
		})
	}
	//BUGS FUNCTIONALITY
	const bugAddButton = document.querySelector('#bugAddButton')
	const tbody = document.querySelector('tbody')
	if (bugAddButton) {
		//TODO desconenet mutation observer 
		observerWorkspace.disconnect()
		// observerWorkspace.observe(workspace, {
				// 	childList: true,
				// 	subtree: true
				// })
		bugAddButton.addEventListener('click', () => {
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
				BUG.childNodes[3].childNodes[1].innerHTML = new Date().toLocaleDateString()
				BUG.childNodes[5].innerHTML = "on going"
				BUG.childNodes[7].innerHTML = "open"
				tbody.append(BUG.cloneNode(true))
				bugName = null
				let getBUGS = [...document.querySelectorAll('.BUG')]
				let options3dot = [...document.querySelectorAll('.options3dot')]
				//FIXME delete bugs options
				//TODO get the parent element of the bug option and add it in the begin
				if (getBUGS) {
					options3dot.forEach((o3dot, index) => {
						o3dot.addEventListener('click', () => {							
							getBUGS[index].childNodes[3].insertBefore(components.bugOptionHtml, getBUGS[index].childNodes[3].childNodes[1]);
							getBUGS[index].childNodes[3].childNodes[1].setAttribute('id', `bugOption${index}`)
							//delete
							getBUGS[index].childNodes[3].childNodes[1].childNodes[3].addEventListener('click', () => {
								if (getBUGS[index].childNodes[3].childNodes[1]) {
									getBUGS[index].remove()
									getBUGS[index].childNodes[3].childNodes[1].remove()
								}
							},{once:true})
							//change status
							getBUGS[index].childNodes[3].childNodes[1].childNodes[1].addEventListener('click', () => {
								if (getBUGS[index].childNodes[3].childNodes[1]) {
									getBUGS[index].childNodes[3].childNodes[1].remove()
									//TODO send it to the database
									if (getBUGS[index].childNodes[7].textContent == 'open') {
										getBUGS[index].childNodes[7].innerHTML = 'closed'
										console.log('assign closed');
									} else {
										getBUGS[index].childNodes[7].innerHTML = 'open'
										console.log('assign open');
									}
								}
							},{once:true})
						})
					})
				}
			})
		})
	}




})

observerWorkspace.observe(workspace, {
	childList: true,
	subtree: true
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




//TODO create functionality of bugs: it will show you a promp and when the bug is open the color is red and when you close it the color become green
//TODO CReate delete functionality

// TODO count the task open and in progress done and bugs and calcule the percent of each tasks


// TODO use pwa pluging and use the offline data base and use service worker with index dbTODO5 use background sync TODO6 crete instal button functionality

// TODO voice controll : a button to active voice controll and when you talk it show your voice and there is a little note beside the button when you click it show the instruction 

//TODO  create a delete function to the cards of the projects in the first page

// FIXME chen to toggle the show comment in kba boared and in the three point in epic and in the bugs and look for other

// TODO add delete button in the first project cards and add clear all project functionality