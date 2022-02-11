	var projectName = null;
	const SubmitFun = () => {
		projectName = inx;
		Qual.successd('DONE');
		setTimeout(() => {
			close_qual()
		},1000);
	}