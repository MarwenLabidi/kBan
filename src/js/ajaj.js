const stringToHTML = string => new DOMParser().parseFromString(string, 'text/html').body.firstChild


import cardAddString from '/src/html/card-add.html?raw';
export const cardAddHtml = stringToHTML(cardAddString)

import sideBarRightString from '/src/html/sideBar-right.html?raw';
export const sideBarRightHtml = stringToHTML(sideBarRightString)


import card_projectNamesString from '/src/html/card_projectNames.html?raw';
export const card_projectNamesHtml = stringToHTML(card_projectNamesString)


import roadmapString from '/src/html/roadmap.html?raw';
export const roadmapHtml = stringToHTML(roadmapString)

import kanbanboardString from '/src/html/kanban-board.html?raw';
export const kanbanboardHtml = stringToHTML(kanbanboardString)


import bugsTemplateString from '/src/html/bugsTemplate.html?raw';
export const bugsTemplateHtml = stringToHTML(bugsTemplateString)


import bugbarString from '/src/html/bug-bar.html?raw';
export const bugbarHtml = stringToHTML(bugbarString).childNodes[1].childNodes[1]


import reportString from '/src/html/report.html?raw';
export const reportHtml = stringToHTML(reportString)

import epicString from '/src/html/epicRoadmap.html?raw';
export const epicHtml = stringToHTML(epicString)

import cardBoardkanbanString from '/src/html/card-Board-kanban.html?raw';
export const cardBoardkanbanHtml = stringToHTML(cardBoardkanbanString)