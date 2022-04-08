let dataBases = await indexedDB.databases()
const components = await import('./ajaj.js')
const workspace = document.querySelector('.workspace')
const rightbar = document.querySelector('.rightbar')
const project = document.querySelector('#project')
const aside = document.querySelector('aside')
const main = document.querySelector('main')


let btnPrevious = null


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

const getDayMonthYear = (date) => {
	const dateArr = date.split('-')
	return {
		day: dateArr[2],
		month: dateArr[1],
		year: dateArr[0]
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



function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
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
		PROJECTNAME = Name

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
		epicName = null
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


const observerWorkspace = new MutationObserver((mutations) => {

	//ROADMAP FUNCTIONLITY
	const epicButton = document.querySelector('#epicButton')
	btnPrevious = document.querySelector('.btn_previous')
	btnNext = document.querySelector('.btn_next')

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
				epicName = null
				waitUntilReturnName(startDate, 'startDate').then((sDate) => {
					waitUntilReturnName(endDate, 'endDate').then((eDate) => {
						allEpicsInThisProject.push(epic)

						const startDayMonthYear = getDayMonthYear(sDate)
						const endDayMonthYear = getDayMonthYear(eDate)

						firstDayMth = calendar.getFirstDaysOfSpesificMonth(thisMonth, thisYear)
						const epicTask = document.querySelector('.epic_task')
						let epicTaskHtml = components.epicHtml

						epicTaskHtml.childNodes[0].innerHTML = epic
						color = g.next().value
						epicName = null
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


		buttonNewKboard.addEventListener('click', () => {
			let x = true
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
				//dont't create the kban if the name is already exist
				let kbanBoardoptions = [...kbanBoardList.options]
				if (kbanBoardoptions.length > 0) {
					kbanBoardoptions.forEach((option => {
						if (option.value === nameKBOARD) {
							x = false
						}
					}))

				}
				if (!x) {
					// alert("the name of this kboard is exist..");
					KboardName = null
					return
				}



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
			})
		})

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
				card.children[2].children[0].textContent = 0
				card.children[3].innerHTML = '<hr>'
				Backlog.append(card.cloneNode(true))
				// register the content of each options in object and load it when you picked option
				//get the selected kanban from the list
				let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
				kanbanBoardDATA[kbanBoardListSelectedValue].Backlog.add({
					constent: contentCard,
					commenst: []
				})
				cardKanbanContent = null
			})
		})
		allCardBoard = [...document.querySelectorAll('.cardBoard')]

		if (allCardBoard) {
			allCardBoard.forEach((card, index) => {

				//*delete card
				card.childNodes[5].childNodes[7].addEventListener('click', (e) => {
					card.remove()
					allCardBoard = [...document.querySelectorAll('.cardBoard')]

					// DELETE THAT CARD FROM ARRAY DATA
					//get the current board || the place:backglog inprogress done || delete from set the elemets
					let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value
					// get the place (backlog,inprogress,done) of this card
					let theplaceDropit = e.path[3].getAttribute('id')
					theplaceDropit = theplaceDropit.charAt(0).toUpperCase() + theplaceDropit.substring(1);
					let constetncard = card.childNodes[1].textContent

					kanbanBoardDATA[kbanBoardListSelectedValue][theplaceDropit].forEach((card, index) => {
						if (card.constent == constetncard) {

							kanbanBoardDATA[kbanBoardListSelectedValue][theplaceDropit].delete(card)
						}

					})




				})


				//*show comment
				card.childNodes[5].childNodes[3].addEventListener('click', (e) => {
					e.path[2].children[3].style.display = 'block'
					setTimeout(() => {
						e.path[2].children[3].style.display = 'none'
					}, 5000);
				})


				// drag and drop functionality
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

						//->the place where you drop it
						let theplaceDropit = backlogInprogressDone.innerText.split('')[0]

						//->selected or current kanban board list
						let kboardNameSelected = kbanBoardList.options[kbanBoardList.selectedIndex].value

						//-->the card you drag
						// 
						//-> card content
						let cardContent = dragable.children[0].textContent


						// -> arr of all the htlm comment element of the draged card
						let allCommentsOfDragableCard = [...dragable.children[3].children]
						allCommentsOfDragableCard.shift()

						//-->all the elements i whrere u drop it arr
						let childCards = [...backlogInprogressDone.children]
						childCards.shift()
						// 
						// --> the next card 
						let nextCard = null
						childCards.forEach((childCard, index) => {
							if (childCard.children[0].textContent == dragable.children[0].textContent) {
								nextCard = childCards[index + 1]
							}
						})
						//-> implement the functionality of adding and ch ngig the data inside the array
						if (theplaceDropit == '⏳') {
							let cardtoMveinArr = {
								constent: null,
								commenst: null
							}
							//change the current card in the arrdatat to the in progress 
							cardtoMveinArr['constent'] = cardContent
							if (nextCard == null) {
								kanbanBoardDATA[kboardNameSelected].InProgress.add(cardtoMveinArr)
							} else {
								//--> convert set to array 
								let originalSet = kanbanBoardDATA[kboardNameSelected].InProgress


								let convertedSetToArr = Array.from(kanbanBoardDATA[kboardNameSelected].InProgress);



								//-> change the card position in the array
								const changeCardPositionInDATAarr = (element, nextElement) => {
									//find next elemt index
									let indexOFNextElement = null
									convertedSetToArr.forEach((el, index) => {
										if (el.constent == nextElement) {
											indexOFNextElement = index
										}
									})
									if (indexOFNextElement == null) {
										convertedSetToArr.push({
											constent: element,
											commenst: []
										})
									} else {
										convertedSetToArr.splice(indexOFNextElement, 0, {
											constent: element,
											commenst: []
										})
									}
								}
								changeCardPositionInDATAarr(cardContent, nextCard.children[0].textContent)

								//-> convet array to set
								kanbanBoardDATA[kboardNameSelected].InProgress = new Set(convertedSetToArr)

							}

							cardtoMveinArr['commenst'] = [...allCommentsOfDragableCard]
							const cardCommensts = cardtoMveinArr.commenst.map((el, index) => {
								if (index = 0) {
									return
								} else {
									return el.textContent
								}
							})
							cardtoMveinArr['commenst'] = cardCommensts
							let shiiit = JSON.parse(JSON.stringify(cardtoMveinArr))
							kanbanBoardDATA[kboardNameSelected].InProgress.add(shiiit)


							// delete it from backlog
							kanbanBoardDATA[kboardNameSelected].Backlog.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Backlog.delete(obj);
								}
							})
							kanbanBoardDATA[kboardNameSelected].Done.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Done.delete(obj);
								}
							})
							kanbanBoardDATA[kboardNameSelected].InProgress.forEach((elm => {
								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kboardNameSelected].InProgress.delete(elm);
								}
								checkMeImExist[elm.constent] = true
							}))
							checkMeImExist = {}


						} else if (theplaceDropit == '✅') {
							let cardtoMveinArr = {
								constent: null,
								commenst: null
							}
							//change the current card in the arrdatat to the in progress 
							cardtoMveinArr['constent'] = cardContent
							if (nextCard == null) {
								kanbanBoardDATA[kboardNameSelected].InProgress.add(cardtoMveinArr)
							} else {
								//--> convert set to array 
								let originalSet = kanbanBoardDATA[kboardNameSelected].Done


								let convertedSetToArr = Array.from(kanbanBoardDATA[kboardNameSelected].Done);



								//-> change the card position in the array
								const changeCardPositionInDATAarr = (element, nextElement) => {
									//find next elemt index
									let indexOFNextElement = null
									convertedSetToArr.forEach((el, index) => {
										if (el.constent == nextElement) {
											indexOFNextElement = index
										}
									})
									if (indexOFNextElement == null) {
										convertedSetToArr.push({
											constent: element,
											commenst: []
										})
									} else {
										convertedSetToArr.splice(indexOFNextElement, 0, {
											constent: element,
											commenst: []
										})
									}
								}
								changeCardPositionInDATAarr(cardContent, nextCard.children[0].textContent)

								//-> convet array to set
								kanbanBoardDATA[kboardNameSelected].Done = new Set(convertedSetToArr)

							}
							cardtoMveinArr['commenst'] = [...allCommentsOfDragableCard]
							const cardCommensts = cardtoMveinArr.commenst.map((el, index) => {
								if (index = 0) {
									return
								} else {
									return el.textContent
								}
							})
							cardtoMveinArr['commenst'] = cardCommensts
							let shiiit = JSON.parse(JSON.stringify(cardtoMveinArr))
							kanbanBoardDATA[kboardNameSelected].Done.add(shiiit)

							// delete it from backlog
							kanbanBoardDATA[kboardNameSelected].Backlog.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Backlog.delete(obj);
								}
							})
							kanbanBoardDATA[kboardNameSelected].InProgress.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].InProgress.delete(obj);
								}
							})
							kanbanBoardDATA[kboardNameSelected].Done.forEach((elm => {
								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kboardNameSelected].Done.delete(elm);
								}
								checkMeImExist[elm.constent] = true
							}))
							checkMeImExist = {}

						} else {
							let cardtoMveinArr = {
								constent: null,
								commenst: null
							}
							//change the current card in the arrdatat to the in progress 
							cardtoMveinArr['constent'] = cardContent
							if (nextCard == null) {
								kanbanBoardDATA[kboardNameSelected].Backlog.add(cardtoMveinArr)
							} else {
								//--> convert set to array 
								let originalSet = kanbanBoardDATA[kboardNameSelected].Backlog


								let convertedSetToArr = Array.from(kanbanBoardDATA[kboardNameSelected].Backlog);



								//-> change the card position in the array
								const changeCardPositionInDATAarr = (element, nextElement) => {
									//find next elemt index
									let indexOFNextElement = null
									convertedSetToArr.forEach((el, index) => {
										if (el.constent == nextElement) {
											indexOFNextElement = index
										}
									})
									if (indexOFNextElement == null) {
										convertedSetToArr.push({
											constent: element,
											commenst: []
										})
									} else {
										convertedSetToArr.splice(indexOFNextElement, 0, {
											constent: element,
											commenst: []
										})
									}
								}
								changeCardPositionInDATAarr(cardContent, nextCard.children[0].textContent)

								//-> convet array to set
								kanbanBoardDATA[kboardNameSelected].Backlog = new Set(convertedSetToArr)

							}

							cardtoMveinArr['commenst'] = [...allCommentsOfDragableCard]
							const cardCommensts = cardtoMveinArr.commenst.map((el, index) => {
								if (index = 0) {
									return
								} else {
									return el.textContent
								}
							})
							cardtoMveinArr['commenst'] = cardCommensts
							let shiiit = JSON.parse(JSON.stringify(cardtoMveinArr))
							kanbanBoardDATA[kboardNameSelected].Backlog.add(shiiit)


							// delete it from backlog
							kanbanBoardDATA[kboardNameSelected].InProgress.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].InProgress.delete(obj);
								}
							})
							kanbanBoardDATA[kboardNameSelected].Done.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Done.delete(obj);
								}
							})
							kanbanBoardDATA[kboardNameSelected].Backlog.forEach((elm => {
								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kboardNameSelected].Backlog.delete(elm);
								}
								checkMeImExist[elm.constent] = true
							}))
							checkMeImExist = {}

						}


					}, 10);
					e.preventDefault()
					const dragable = document.querySelector('.dragging')

					let childCardexpectMe = [...backlogInprogressDone.children]
					childCardexpectMe.shift()


					let minC = getCardToInsertBeforItOtherCard(childCardexpectMe, e.clientY)

					if (childCardexpectMe.length > 0) {
						backlogInprogressDone.insertBefore(dragable, minC)
					} else {
						backlogInprogressDone.appendChild(dragable)
					}


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
				//---> create the bugs data
				allBugsInThisProject.push({
					bugName: bug,
					bugStatus: "open",
					bugOpenDate: new Date().toLocaleDateString(),
					bugClosedDate: `on going`
				})
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
									//--->the name of delete it bug
									// console.log('the name ', getBUGS[index].children[0].children[0].children[0].innerText);
									function deleteBug(name) {
										allBugsInThisProject.forEach((bug, index) => {

											if (name == bug.bugName) {
												allBugsInThisProject.splice(index, 1)
											} else {
												return
											}
										})

									}
									deleteBug(getBUGS[index].children[0].children[0].children[0].innerText)



									getBUGS[index].remove()
									getBUGS[index].childNodes[3].childNodes[1].remove()

								}
							}, {
								once: true
							})
							//change status
							getBUGS[index].childNodes[3].childNodes[1].childNodes[1].addEventListener('click', () => {
								if (getBUGS[index].childNodes[3].childNodes[1]) {
									//---> the closed date of the bug
									// console.log('getBUGS[index]: ', getBUGS[index].children[2].innerText);
									function changeBugStatus(name, closedDate) {
										allBugsInThisProject.forEach((bug, index) => {

											if (name == bug.bugName) {
												bug.bugClosedDate = closedDate
											} else {
												return
											}
										})
									}
									changeBugStatus(getBUGS[index].children[0].children[0].children[0].innerText, new Date().toLocaleDateString())

									optionsdamn[index].style.display = 'none'
									getBUGS[index].childNodes[7].innerHTML = 'closed'
									getBUGS[index].classList.add('closegreenclass')

									let s = document.querySelectorAll('#shit')
									s[index].innerHTML = new Date().toLocaleDateString()


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


// TODO instal button functionality

//TODO create white theme for the app : dark mode white mode

//TODO use proxy object to send the data to service workers

//TODO  create a delete button at the first page and you have the chose to delete one or mutltiple : it show you pop up to pick widh check box


// TODO check the database if is full or do a delete technique 

