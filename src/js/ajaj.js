const stringToHTML =  string=> new DOMParser().parseFromString(string, 'text/html').body.firstChild



const cardAdd=await fetch('./src/html/card-add.html')
const cardAddString=await cardAdd.text()
export const cardAddHtml=stringToHTML(cardAddString)

const sideBarRights = await fetch('./src/html/sideBar-right.html')
const sideBarRightString=await sideBarRights.text()
export const sideBarRightHtml=stringToHTML(sideBarRightString)


const card_projectNames = await fetch('./src/html/card_projectNames.html')
const card_projectNamesString=await card_projectNames.text()
export const card_projectNamesHtml=stringToHTML(card_projectNamesString)


const roadmap = await fetch('./src/html/roadmap.html')
const roadmapString=await roadmap.text()
export const roadmapHtml=stringToHTML(roadmapString)

const kanbanboard = await fetch('./src/html/kanban-board.html')
const kanbanboardString=await kanbanboard.text()
export const kanbanboardHtml=stringToHTML(kanbanboardString)


const bugsTemplate = await fetch('./src/html/bugsTemplate.html')
const bugsTemplateString=await bugsTemplate.text()
export const bugsTemplateHtml=stringToHTML(bugsTemplateString)


const bugbar = await fetch('./src/html/bug-bar.html')
const bugbarString=await bugbar.text()
export const bugbarHtml=stringToHTML(bugbarString)

const report = await fetch('./src/html/report.html')
const reportString=await report.text()
export const reportHtml=stringToHTML(reportString)

const epic= await fetch('./src/html/epicRoadmap.html')
const epicString=await epic.text()
export const epicHtml=stringToHTML(epicString)
// export const epicHtmlSecondChild=epicHtml.childNodes[1]

