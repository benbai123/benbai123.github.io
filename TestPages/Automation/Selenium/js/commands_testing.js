function markTestingArea (e) {
	e.classList.add('testing-area');
}
function unmarkAllTestingAreas () {
	let eles = document.querySelectorAll(".testing-area");
	eles.forEach((e) => {
		e.classList.remove('testing-area');
	});
}