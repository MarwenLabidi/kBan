	var projectName = null;
	var epicName = null;
	var startDate = null;
	var endDate = null;
	var KboardName = null;
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