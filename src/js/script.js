let dataBases = await indexedDB.databases()
components = await import('./ajaj.js')
const workspace = document.querySelector('.workspace')
const rightbar = document.querySelector('.rightbar')
const project = document.querySelector('#project')
const aside = document.querySelector('aside')
const main = document.querySelector('main')
calendar = await import('./calendar.js')



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


//--> load data from indexDB
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
		//   : send the name to the service worker
		PROJECTNAME = Name
		navigator.serviceWorker.controller.postMessage({
			nameDataBase: PROJECTNAME,
		});

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
						// send epics to the service worker
						allEpicsInThisProject.push(epic)
						navigator.serviceWorker.controller.postMessage({
							epics: allEpicsInThisProject,
						});

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
						// SEND STARTDATYCOLOR ENDDAYCOLOR AND COLORARR TOO THE SERVICE WORKER
						navigator.serviceWorker.controller.postMessage({
							start: startDaysToColorArr,
							end: endDaysToColorArr,
							color: colorArr
						});

						epicTaskHtml.style.backgroundColor = color

						epicTask.append(epicTaskHtml.cloneNode(true))
						runOneTime(firstDayMth, evrySingleDays)()
						colorSelectedDays(thisMonth + 1, thisYear)(+startDayMonthYear.day, +startDayMonthYear.month, +startDayMonthYear.year)(+endDayMonthYear.day, +endDayMonthYear.month, +endDayMonthYear.year)(color)
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
				// ADD KBAN BOARD TO SERVIEC WORKER

				navigator.serviceWorker.controller.postMessage({
					kban: kanbanBoardDATA,
				});
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
				// ADD KBAN BOARD TO SERVIEC WORKER

				navigator.serviceWorker.controller.postMessage({
					kban: kanbanBoardDATA,
				});
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
							// ADD KBAN BOARD TO SERVIEC WORKER

							navigator.serviceWorker.controller.postMessage({
								kban: kanbanBoardDATA,
							});
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
								// ADD KBAN BOARD TO SERVIEC WORKER

								navigator.serviceWorker.controller.postMessage({
									kban: kanbanBoardDATA,
								});
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
								// ADD KBAN BOARD TO SERVIEC WORKER

								navigator.serviceWorker.controller.postMessage({
									kban: kanbanBoardDATA,
								});

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
							// ADD KBAN BOARD TO SERVIEC WORKER

							navigator.serviceWorker.controller.postMessage({
								kban: kanbanBoardDATA,
							});


							// delete it from backlog
							kanbanBoardDATA[kboardNameSelected].Backlog.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Backlog.delete(obj);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
								}
							})
							kanbanBoardDATA[kboardNameSelected].Done.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Done.delete(obj);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
								}
							})
							kanbanBoardDATA[kboardNameSelected].InProgress.forEach((elm => {
								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kboardNameSelected].InProgress.delete(elm);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
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
								// ADD KBAN BOARD TO SERVIEC WORKER

								navigator.serviceWorker.controller.postMessage({
									kban: kanbanBoardDATA,
								});
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
								// ADD KBAN BOARD TO SERVIEC WORKER

								navigator.serviceWorker.controller.postMessage({
									kban: kanbanBoardDATA,
								});

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
							// ADD KBAN BOARD TO SERVIEC WORKER

							navigator.serviceWorker.controller.postMessage({
								kban: kanbanBoardDATA,
							});

							// delete it from backlog
							kanbanBoardDATA[kboardNameSelected].Backlog.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Backlog.delete(obj);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
								}
							})
							kanbanBoardDATA[kboardNameSelected].InProgress.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].InProgress.delete(obj);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
								}
							})
							kanbanBoardDATA[kboardNameSelected].Done.forEach((elm => {
								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kboardNameSelected].Done.delete(elm);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
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
								// ADD KBAN BOARD TO SERVIEC WORKER

								navigator.serviceWorker.controller.postMessage({
									kban: kanbanBoardDATA,
								});
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
								// ADD KBAN BOARD TO SERVIEC WORKER

								navigator.serviceWorker.controller.postMessage({
									kban: kanbanBoardDATA,
								});

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
							// ADD KBAN BOARD TO SERVIEC WORKER

							navigator.serviceWorker.controller.postMessage({
								kban: kanbanBoardDATA,
							});


							// delete it from backlog
							kanbanBoardDATA[kboardNameSelected].InProgress.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].InProgress.delete(obj);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
								}
							})
							kanbanBoardDATA[kboardNameSelected].Done.forEach((obj) => {
								if (obj.constent == cardContent) {
									kanbanBoardDATA[kboardNameSelected].Done.delete(obj);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
								}
							})
							kanbanBoardDATA[kboardNameSelected].Backlog.forEach((elm => {
								if (checkMeImExist[elm.constent]) {
									kanbanBoardDATA[kboardNameSelected].Backlog.delete(elm);
									// ADD KBAN BOARD TO SERVIEC WORKER

									navigator.serviceWorker.controller.postMessage({
										kban: kanbanBoardDATA,
									});
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
	

})

observerWorkspace.observe(workspace, {
	childList: true,
	subtree: true
})



// TODO check the database if is full or do a delete technique 


// TODO add promodoro timer feature song effect : your voice and always work in the background : maybe its like a flowing button you can always press on it and i show you time and cool an animation AND THERE IS  LITTLE BUTTON FOR CONFIGURATION SHOW YOU TIME LOAD AND INPUT FOR TIME BREAK

//TODO  voice controll button like timer : create instruction page another html page open you click to instruction 

