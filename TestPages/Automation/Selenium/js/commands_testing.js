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

function pushStateToHistory () {
	let ele = document.querySelector('.push-state-link');
	ele.classList.add('hidden');
	history.pushState({'selectorToHide': '.push-state-link'},
		"pushedPage", "pushedPage.html");
}
window.onpopstate = function(event) {
	document.querySelectorAll('.hidden').forEach((e) => {
		e.classList.remove('hidden');
	});
	if (event.state && event.state.selectorToHide) {
		document.querySelectorAll(event.state.selectorToHide)
			.forEach((e) => {
				e.classList.add('hidden');
			});
	}
};