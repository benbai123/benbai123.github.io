function markTestingArea (e) {
	e.classList.add('testing-area');
}
function unmarkAllTestingAreas () {
	let eles = document.querySelectorAll(".testing-area");
	eles.forEach((e) => {
		e.classList.remove('testing-area');
	});
}
function addDays (dateInp, daysToAdd) {
	let date = new Date(dateInp.valueAsDate.getTime());
	date.setDate(date.getDate()+daysToAdd);
	dateInp.valueAsDate = date;
	dateInp.onchange();
}