document.getElementById('newSubjectForm').onsubmit = async (ev) => {
	ev.preventDefault();

	const subjectName = document.getElementById('subjectName').value;

	const url = ev.target.action;

	const res = await fetch(url, {
		method: 'post',
		body: subjectName,
	});

	if (res.ok) {
		return window.location.replace('/subjects');
	}

	ev.target.reset();

	const errorContainer = document.getElementById('error-container');

	errorContainer.innerText = await res.text();
};