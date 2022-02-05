


const SubmitFun=()=> {
	let projectName = inx;
	localStorage.setItem('projectName', projectName);

	setTimeout(() => {
		
		window.location.reload();
	}, 1000);

}
