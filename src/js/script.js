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
let startDaysToColorArr = []
let endDaysToColorArr = []
let colorArr = []
let kanbanBoardDATA = {}

let checkMeImExist = {}


function* gen() {
	yield `hsla(203,70%,80%)`;
	yield `hsl(28, 45%, 55%)`;
	yield `hsla(299,70%,80%)`;
	yield `hsl(94, 61%, 68%)`;
	yield `hsla(53,70%,80%)`;
	yield `hsl(273, 68%, 59%)`;
	yield `hsl(39, 100%, 47%)`;
	yield `hsl(12, 98%, 64%)`;
	yield `hsl(201, 100%, 36%)`;
	yield `hsl(60, 90%, 68%)`;
	yield `hsl(342, 100%, 64%)`;
	yield `	hsl(85, 97%, 62%)`;
	yield `hsl(80, 1%, 54%)`;
	yield `hsl(55, 100%, 60%)`;
	yield `hsl(179, 78%, 75%)`;
	yield `green`;

}
let g = gen();

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

const getCardToInsertBeforItOtherCard = (allCard, mousePosition) => {
	if (allCard.length === 0) {
		return
	}
	const aftercard = allCard.filter(card => {
		return card.getBoundingClientRect().top + (card.offsetHeight / 2) > mousePosition
	})
	return aftercard[0]
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
		//!  NOTE : send the name to the service worker
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
		
		//color calendar

	let btnPrevious = document.querySelector('.btn_previous')
	let btnNext = document.querySelector('.btn_next')
	btnPrevious.click()
	btnNext.click()


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
		observerWorkspace.disconnect()
		btnPrevious.addEventListener('click', () => {
			let theOneMonth = thisMonth
			if (thisMonth === 0) {
				theOneMonth = 12;
			}

			if (startDaysToColorArr.length > 0) {
				colorDaysINCalendarNEXTbPREVIOUS(startDaysToColorArr, endDaysToColorArr, theOneMonth, thisYear)

			}



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





			let theOneMonthss = thisMonth + 2
			if (theOneMonthss === 13) {
				theOneMonthss = 12;
			}
			if (startDaysToColorArr.length > 0) {
				colorDaysINCalendarNEXTbPREVIOUS(startDaysToColorArr, endDaysToColorArr, theOneMonthss, thisYear)
			}

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

						epicTaskHtml.childNodes[0].innerHTML = epic
						color = g.next().value
						if (g.next().done) {
							g = gen()
						}
						startDaysToColorArr.push(startDayMonthYear)
						endDaysToColorArr.push(endDayMonthYear)
						colorArr.push(color)
						epicTaskHtml.style.backgroundColor = color

						epicTask.append(epicTaskHtml.cloneNode(true))
						runOneTime(firstDayMth, evrySingleDays)()
						colorSelectedDays(thisMonth + 1, thisYear)(+startDayMonthYear.day, +startDayMonthYear.month, +startDayMonthYear.year)(+endDayMonthYear.day, +endDayMonthYear.month, +endDayMonthYear.year)(color)
						//NOTE send all the data to the service worker to color when there is a colorfull
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

									//create a kanban board from the epic
									options[indexOfChosenEpic].firstChild.addEventListener('click', () => {

										document.querySelector('.KanbanBoard').click()
										setTimeout(() => {

											document.querySelector('#newKboard').click()
											close_qual();
											KboardName = epic

											options[index].style.display = 'none'
											indexOfChosenEpic = null
										}, 100)


									})
									options[indexOfChosenEpic].lastChild.addEventListener('click', () => {
										// 
										options[index].style.display = 'none'

										startDaysToColorArr.splice(indexOfChosenEpic, 1)
										endDaysToColorArr.splice(indexOfChosenEpic, 1)
										colorArr.splice(indexOfChosenEpic, 1)
										btnPrevious.click()
										btnNext.click()


										epicH3[index].remove()
										indexOfChosenEpic = null
									})
								});
							})
						}
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
		let allCardBoard = document.querySelectorAll('.cardBoard')
		// load the data when you select a kboard
		//liseten to the event when you click on list
		kbanBoardList.addEventListener('change', (e) => {
			observerWorkspace.observe(workspace, {
				childList: true,
				subtree: true
			})
			// observerWorkspace.disconnect()
			//delete all element is html with js expect one
			const allchildrenBacklog = [...Backlog.children]
			const allchildrenInProgress = [...InProgress.children]
			const allchildrenDone = [...Done.children]
			allchildrenBacklog.forEach((child, index) => {
				if (index < 1) return;
				Backlog.removeChild(child)
			})
			allchildrenInProgress.forEach((child, index) => {
				if (index < 1) return;
				InProgress.removeChild(child)
			})
			allchildrenDone.forEach((child, index) => {
				if (index < 1) return;
				Done.removeChild(child)
			})

			//get the current kboard and use foreach on it to create the cards
			let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
			nameKboard.innerHTML = kbanBoardListSelectedValue
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
				Backlog.append(card.cloneNode(true))
				allCardBoard = document.querySelectorAll('.cardBoard')
				AllComments = document.querySelectorAll('.comments')
				showComment = document.querySelectorAll('.showComment')


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
				InProgress.append(card.cloneNode(true))
				allCardBoard = document.querySelectorAll('.cardBoard')
				AllComments = document.querySelectorAll('.comments')
				showComment = document.querySelectorAll('.showComment')

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
				Done.append(card.cloneNode(true))
				allCardBoard = document.querySelectorAll('.cardBoard')
				AllComments = document.querySelectorAll('.comments')
				showComment = document.querySelectorAll('.showComment')

			})


		})


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


				//delete all element is html with js expect one
				const allchildrenBacklog = [...Backlog.children]
				const allchildrenInProgress = [...InProgress.children]
				const allchildrenDone = [...Done.children]
				allchildrenBacklog.forEach((child, index) => {
					if (index < 1) return;
					Backlog.removeChild(child)
				})
				allchildrenInProgress.forEach((child, index) => {
					if (index < 1) return;
					InProgress.removeChild(child)
				})
				allchildrenDone.forEach((child, index) => {
					if (index < 1) return;
					Done.removeChild(child)
				})



				nameKboard.innerHTML = nameKBOARD
				let optionHTML = document.createElement('option')
				optionHTML.innerHTML = nameKBOARD
				kanbanBoardDATA[nameKBOARD] = {
					Backlog: new Set(),
					InProgress: new Set(),
					Done: new Set()
				}
				kbanBoardList.append(optionHTML)
				const optionListKboard = [...kbanBoardList.children]
				if (optionListKboard.length > 0) {
					optionListKboard.forEach((option) => {
						if (option.value === nameKBOARD) {
							option.selected = true
						}
					})
				}
				KboardName = null
				//NOTE send it to servie worker and create table
			})
		})

		//NOTE load the data [kbanBoardList.value] in the board from service worker
		const addCardKbanBoardInProgress = document.querySelector('#addCardKbanBoardInProgress')
		addCardKbanBoardInProgress.addEventListener('click', () => {
			if (Object.keys(kanbanBoardDATA).length < 1) {
				alert("Create a Kban or pick one from the list.");
				return;
			}
			observerWorkspace.observe(workspace, {
				childList: true,
				subtree: true
			})
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
				// register the content of each options in object and load it when you picked option
				//get the selected kanban from the list
				let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
				kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.add({
					constent: contentCard,
					commenst: []
				})
				//NOTE add this canban card to the service worker kanbanBoardDATA
				cardKanbanContent = null
			})
		})
		allCardBoard = [...document.querySelectorAll('.cardBoard')]
	
		if (allCardBoard) {
			allCardBoard.forEach((card, index) => {
				
				//*delete card
				card.childNodes[5].childNodes[7].addEventListener('click', () => {
					card.remove()
					allCardBoard = [...document.querySelectorAll('.cardBoard')]

					//TODO DELETE THAT CARD FROM ARRAY DATA
				})
				//*add comment
				card.childNodes[5].childNodes[5].addEventListener('click', (e) => {

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

						
						//NOTE add this comment to the data base 
						const li = document.createElement('li')
						li.innerHTML = comments
						e.path[2].children[3].append(li)
						console.log('e.path[2]: ', e.path[2]);
						
						comment = null
						//FIXME delete emppty comment awhen you change kboared
						// FIXME ADD COMMNET TO ARRAY DATA 
						//get the kanban boaard of this card
						let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
						

						// get the place (backlog,inprogress,done) of this card
						let theplaceDropit = e.path[3].getAttribute('id')
						theplaceDropit = theplaceDropit.charAt(0).toUpperCase() + theplaceDropit.substring(1);
						let constetncard = card.childNodes[1].textContent

						//get the content of this card
						// get the index of this card 
						// add the comment to it
						kanbanBoardDATA[kbanBoardListSelectedValue][theplaceDropit].forEach((card, index) => {
							if (card.constent == constetncard) {
								card.commenst.push(comments)
							}
							
						})
						

					})
					//TODO get the numbeR of comment and add it [change p inner text]
				})
				//*show comment
				card.childNodes[5].childNodes[3].addEventListener('click', (e) => {
					e.path[2].children[3].style.display = 'block'
					setTimeout(() => {
						e.path[2].children[3].style.display = 'none'
					}, 5000);
				})
				
				
				//NOTE drag and drop functionality
				card.addEventListener('dragstart', (e) => {

					card.classList.add('dragging')
				})
				card.addEventListener('dragend', (e) => {

					card.classList.remove('dragging')
				})
			})

			const backlogInprogressDones = [Backlog, InProgress, Done]
			backlogInprogressDones.forEach((backlogInprogressDone) => {
				backlogInprogressDone.addEventListener('dragover', (e) => {
					e.preventDefault()
					observerWorkspace.disconnect()
				})
				backlogInprogressDone.addEventListener('drop', (e) => {

					// change the content of arr to in progress or done and delete backglog from arrddata
					setTimeout(() => {

						//the place where you drop it
						let theplaceDropit = e.path[0].innerText.split('')[0]
						//get the content of curret drage card and 
						//FIXME figure out a solution for the lastchild below
						let cardcontenttolll = backlogInprogressDone.lastChild.childNodes[1].textContent
						let cardcontentCommentss = [...backlogInprogressDone.lastChild.childNodes[7].children]
						let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
						if (theplaceDropit == '⏳') {


							let cardtoMveinArr = {
								constent: null,
								commenst: null
							}
							//change the current card in the arrdatat to the in progress 
							cardtoMveinArr['constent'] = cardcontenttolll
							kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.add(cardtoMveinArr)


							cardtoMveinArr['commenst'] = [...cardcontentCommentss]
							const cardCommensts = cardtoMveinArr.commenst.map((el, index) => {
								if (index = 0) {
									return
								} else {
									return el.textContent
								}
							})
							cardtoMveinArr['commenst'] = cardCommensts
							let shiiit = JSON.parse(JSON.stringify(cardtoMveinArr))
							kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.add(shiiit)


							// delete it from backlog
							kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.forEach((obj) => {
								if (obj.constent == cardcontenttolll) {
									kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.delete(obj);
								}
							})
							kanbanBoardDATA[kbanBoardListSelectedValue].Done.forEach((obj) => {
								if (obj.constent == cardcontenttolll) {
									kanbanBoardDATA[kbanBoardListSelectedValue].Done.delete(obj);
								}
							})


							kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.forEach((elm => {

								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.delete(elm);
								}
								checkMeImExist[elm.constent] = true
							}))


							checkMeImExist = {}



						} else if (theplaceDropit == '✅') {
							//change the current card in the arrdatat to the in progress 
							let cardtoMveinArr = {
								constent: null,
								commenst: null
							}
							cardtoMveinArr['constent'] = cardcontenttolll
							kanbanBoardDATA[kbanBoardListSelectedValue].Done.add(cardtoMveinArr)

							cardtoMveinArr['commenst'] = [...cardcontentCommentss]
							const cardCommensts = cardtoMveinArr.commenst.map((el, index) => {

								if (index = 0) {
									return
								} else {

									return el.textContent
								}
							})
							cardtoMveinArr['commenst'] = cardCommensts
							let shiiit = JSON.parse(JSON.stringify(cardtoMveinArr))

							kanbanBoardDATA[kbanBoardListSelectedValue].Done.add(shiiit)
							// delete it from in progress
							kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.forEach((obj) => {
								if (obj.constent == cardcontenttolll) {
									kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.delete(obj);
								}
							})
							//delete from backglog
							kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.forEach((obj) => {
								if (obj.constent == cardcontenttolll) {
									kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.delete(obj);
								}
							})


							kanbanBoardDATA[kbanBoardListSelectedValue].Done.forEach((elm => {

								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kbanBoardListSelectedValue].Done.delete(elm);
								}
								checkMeImExist[elm.constent] = true
							}))


							checkMeImExist = {}

						} else {
							//change the current card in the arrdatat to the in progress 
							let cardtoMveinArr = {
								constent: null,
								commenst: null
							}
							cardtoMveinArr['constent'] = cardcontenttolll
							kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.add(cardtoMveinArr)

							cardtoMveinArr['commenst'] = [...cardcontentCommentss]
							const cardCommensts = cardtoMveinArr.commenst.map((el, index) => {

								if (index = 0) {
									return
								} else {

									return el.textContent
								}
							})
							cardtoMveinArr['commenst'] = cardCommensts
							let shiiit = JSON.parse(JSON.stringify(cardtoMveinArr))

							kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.add(shiiit)
							// delete it from backlog
							kanbanBoardDATA[kbanBoardListSelectedValue].Done.forEach((obj) => {
								if (obj.constent == cardcontenttolll) {
									kanbanBoardDATA[kbanBoardListSelectedValue].Done.delete(obj);
								}
							})
							kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.forEach((obj) => {
								if (obj.constent == cardcontenttolll) {
									kanbanBoardDATA[kbanBoardListSelectedValue].InProgress.delete(obj);
								}
							})


							kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.forEach((elm => {

								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.delete(elm);
								}
								checkMeImExist[elm.constent] = true
							}))


							checkMeImExist = {}


						}

					}, 10);
					e.preventDefault()
					const dragable = document.querySelector('.dragging')

					//NOTE send card iformation to the service worker 
					//NOTE SEND THE POSIONN OF EEACH CARD TO THE DATABASE
					let childCardexpectMe = [...backlogInprogressDone.children]
					childCardexpectMe.shift()


					let minC = getCardToInsertBeforItOtherCard(childCardexpectMe, e.clientY)

					if (childCardexpectMe.length > 0) {
						backlogInprogressDone.insertBefore(dragable, minC)
					} else {
						backlogInprogressDone.appendChild(dragable)
					}
					//NOTE make the change in the database
					// checkMeImExist={}
					// 

				})
			})
		}


	}
	//BUGS FUNCTIONALITY
	const bugAddButton = document.querySelector('#bugAddButton')
	const tbody = document.querySelector('tbody')
	if (bugAddButton) {
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
				BUG.childNodes[3].childNodes[3].innerHTML = new Date().toLocaleDateString()
				BUG.childNodes[7].innerHTML = "open"
				tbody.append(BUG.cloneNode(true))
				//NOTE send numberof open bugs to database
				bugName = null
				let getBUGS = [...document.querySelectorAll('.BUG')]
				let options3dot = [...document.querySelectorAll('.options3dot')]
				let optionsdamn = [...document.querySelectorAll('.optionsdamn')]
				if (getBUGS) {
					options3dot.forEach((o3dot, index) => {
						o3dot.addEventListener('click', () => {
							optionsdamn[index].style.display = 'block'
							setTimeout(() => {
								optionsdamn[index].style.display = 'none'

							}, 2000);
							//delete
							getBUGS[index].childNodes[3].childNodes[1].childNodes[3].addEventListener('click', () => {
								if (getBUGS[index] && getBUGS[index].childNodes[3].childNodes[1]) {
									getBUGS[index].remove()
									getBUGS[index].childNodes[3].childNodes[1].remove()

									//NOTE send numberofdonebug and modifier numberofopenbugs to database
								}
							}, {
								once: true
							})
							//change status
							getBUGS[index].childNodes[3].childNodes[1].childNodes[1].addEventListener('click', () => {
								if (getBUGS[index].childNodes[3].childNodes[1]) {
									optionsdamn[index].style.display = 'none'
									getBUGS[index].childNodes[7].innerHTML = 'closed'
									getBUGS[index].classList.add('closegreenclass')

									let s = document.querySelectorAll('#shit')
									s[index].innerHTML = new Date().toLocaleDateString()


									//NOTE send it to the database
								}
							}, {
								once: true
							})
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


//FIXME : check if there is eplics if its not create epic from epicdata array and create this arr too
//-[] create a function to execute evry change of spesific varriable : (e.g.: when you add somethng to arr data if updte the dabase)


// TODO count the task open and in progress done and bugs and calcule the percent of each tasks

//TODO  create a delete function to the cards of the projects in the first page

//TODO create white theme for the app : dark mode white mode

// TODO add delete button in the first project cards and add clear all project functionality

// TODO add transition to pop up in delele and close OPTIONS in epic and in bugs

// TODO disable report until you chooose a project or you create new one

//TODO change the theme to black pwa theme instead of white

// TODO check the database if is full or do a delete technique 

// TODO instal button functionality

// TODO change the README : add the api of transfer databwtwen service wrker and app ane delete voice controll struff