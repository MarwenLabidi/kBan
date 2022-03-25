const black = "hsl(215, 0%, 25%)"
const white = "hsl(76, 100%, 100%)"
const red = "#FF0000"
const green = "#3CB371"
const orange = "#FFC000"
const blue = "#008080"

let fontColor = "white"
let backgroundColor = black


let openBugs = (NumberOFopenBugs/(NumberOFdoneBugs+ NumberOFopenBugs))*100
let doneBugs = (NumberOFdoneBugs/(NumberOFdoneBugs+ NumberOFopenBugs))*100
let backLog = (NumberOFbackLog/(NumberOFbackLog+NumberOFinProgress+NumberOFdone))*100
let inProgress = (NumberOFinProgress/(NumberOFbackLog+NumberOFinProgress+NumberOFdone))*100
let done = (NumberOFdone/(NumberOFbackLog+NumberOFinProgress+NumberOFdone))*100


const report = document.querySelector('#report')
const reports = document.querySelector('.reports')
const workspace = document.querySelector('.workspace')

const {
	reportHtml
} = await import('./ajaj.js')

report.addEventListener('click', function () {

	workspace.innerHTML = ''
	workspace.append(reportHtml)

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