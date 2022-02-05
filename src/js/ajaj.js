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

