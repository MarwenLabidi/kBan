var kanbanBoardDATA = {}



var projectName = null;
var epicName = null;
var startDate = null;
var endDate = null;
var KboardName = null;
var cardKanbanContent = null;
var comment = null;
var bugName = null;

//statistic for report section
//TODO get all of them from database
var NumberOFopenBugs = 10
var NumberOFdoneBugs = 10
var NumberOFbackLog = 10
var NumberOFinProgress = 10
var NumberOFdone = 10




const SubmitFun = () => {
	projectName = inx;
	// Qual.successd('DONE');
	// setTimeout(() => {
	close_qual()
	// }, 1000);
}
const endDateF = () => {
	endDate = inx
	setTimeout(() => {
		close_qual()
	}, 1000);
}
const startDateF = () => {
	startDate = inx;
	Qual.confirmd("When Are You Gonna finish this ", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"END", //blue button string
		"", // cancel button string
		"endDateF", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"date", //type of input you want whether a text ,password or number
		"Enter finish date" //Placeholder text of input field
	)
}
const addEpic = () => {
	epicName = inx;
	Qual.confirmd("When Are You Gonna Start this ", //For heading
		"", //For sub heading
		inf, //icon variable we can define our own also by giving th link in double quotes
		"START", //blue button string
		"", // cancel button string
		"startDateF", //function name that is to be called on click on blue button
		"", //function name that is to be called on click on cancel button
		"date", //type of input you want whether a text ,password or number
		"Enter start date" //Placeholder text of input field
	)
}

const createKboardPopUp = () => {
	KboardName = inx;
	close_qual();

}

const createcardKanban = () => {
	cardKanbanContent = inx;
	close_qual();
}

const addComment = () => {
	comment = inx;
	close_qual();
}

const addBug = () => {
	bugName = inx;
	close_qual();
}









// the add comments button functions 

function waitUntilReturnName(value, vl) {
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

function functionName(e) {
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
		//add comment to the card
		const li = document.createElement('li')
		li.innerHTML = comments
		e.path[2].children[3].append(li)
		comment = null
		//count the number of commnet
		let currentNumberOFComments = +e.path[2].children[2].children[0].textContent
		currentNumberOFComments++
		e.path[2].children[2].children[0].textContent = currentNumberOFComments + ''

		//add the comments to the arrData
		//get the kanban boaard of this card
		let kbanBoardListSelectedValue = kbanBoardList.options[kbanBoardList.selectedIndex].value



		// get the place (backlog,inprogress,done) of this card
		let theplaceDropit = e.path[3].getAttribute('id')
		theplaceDropit = theplaceDropit.charAt(0).toUpperCase() + theplaceDropit.substring(1);

		let constetncard = e.path[2].children[0].textContent
		kanbanBoardDATA[kbanBoardListSelectedValue][theplaceDropit].forEach((card, index) => {
			if (card.constent == constetncard) {
				card.commenst.push(comments)
			}
		})
	})

}