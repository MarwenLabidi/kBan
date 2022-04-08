
// report 
let fontColor = "white"
let black = "hsl(215, 0%, 25%)"
let white = "hsl(76, 100%, 100%)"


const red = "#FF0000"
const green = "#3CB371"
const orange = "#FFC000"
const blue = "#008080"


let backgroundColor = black

//statistic for report section
var NumberOFopenBugs = 0
var NumberOFdoneBugs = 0
var NumberOFbackLog = 0
var NumberOFinProgress = 0
var NumberOFdone = 0







const report = document.querySelector('#report')
const reports = document.querySelector('.reports')
const workspace = document.querySelector('.workspace')

const {
	reportHtml
} = await import('./ajaj.js')

report.addEventListener('click', function () {

	// get the backlog and in progress and done numbers of every kboard
	const getBacklogInprogressDoneNumber = () => {
		//convet the object to array first
		const arr = Object.values(kanbanBoardDATA);



		arr.forEach((board) => {
			NumberOFbackLog += board.Backlog.size


			NumberOFinProgress += board.InProgress.size


			NumberOFdone += board.Done.size



		})

	}

	getBacklogInprogressDoneNumber()
	// get the open bugs and closed bugs
	const getOpenClosedBugNumber = () => {
		allBugsInThisProject.forEach((bug) => {
			if (bug.bugStatus == 'open') {
				NumberOFopenBugs++

			} else {
				NumberOFdoneBugs++
			}
		})

	}
	getOpenClosedBugNumber()
	
	let openBugs = (NumberOFopenBugs / (NumberOFdoneBugs + NumberOFopenBugs)) * 100
	let doneBugs = (NumberOFdoneBugs / (NumberOFdoneBugs + NumberOFopenBugs)) * 100
	let backLog = (NumberOFbackLog / (NumberOFbackLog + NumberOFinProgress + NumberOFdone)) * 100
	let inProgress = (NumberOFinProgress / (NumberOFbackLog + NumberOFinProgress + NumberOFdone)) * 100
	let done = (NumberOFdone / (NumberOFbackLog + NumberOFinProgress + NumberOFdone)) * 100


	if (PROJECTNAME == null) {
		alert('Please select a project first')
		return
	} else {
		if (NumberOFdone == 0 && NumberOFinProgress == 0 && NumberOFbackLog == 0 && NumberOFdoneBugs == 0 && NumberOFopenBugs == 0) {
			alert('there is no statistique available ');
			return;
		}
	}


	workspace.innerHTML = ''
	workspace.append(reportHtml)
	const projectname =document.querySelector('.pn')
	projectname.innerHTML=PROJECTNAME

	CanvasJS.addColorSet("progress",
		[ //colorSet Array

			orange,
			blue,
			green,
		]);
	CanvasJS.addColorSet("bugs",
		[ //colorSet Array

			red,
			green,
		]);

	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		colorSet: "progress",
		backgroundColor: backgroundColor,

		title: {
			text: "Progress",
			horizontalAlign: "center",
			fontColor: fontColor,
		},
		data: [{
			indexLabelFontColor: fontColor,
			// indexLabelPlacement: "inside",
			type: "pie",
			startAngle: 60,
			innerRadius: 60,
			indexLabelFontSize: 17,
			indexLabel: "{label} - #percent%",
			toolTipContent: "<b>{label}:</b> {y} (#percent%)",
			dataPoints: [{
					y: backLog,
					label: "BACKLOG",

				},
				{
					y: inProgress,
					label: "IN PROGRESS",
				},
				{
					y: done,
					label: "DONE",

				},

			]
		}]
	});
	chart.render();
	var chartBugs = new CanvasJS.Chart("bugs", {
		animationEnabled: true,
		colorSet: "bugs",
		backgroundColor: backgroundColor,

		title: {
			text: "Bugs",
			horizontalAlign: "center",
			fontColor: fontColor,

		},
		data: [{
			// indexLabelPlacement: "inside",
			indexLabelFontColor: fontColor,

			type: "pie",
			startAngle: 60,
			innerRadius: 60,
			indexLabelFontSize: 17,
			indexLabel: "{label} - #percent%",
			toolTipContent: "<b>{label}:</b> {y} (#percent%)",
			dataPoints: [{
					y: openBugs,
					label: "open"
				},
				{
					y: doneBugs,
					label: "DONE"
				},
			]
		}]
	});
	chartBugs.render();
})