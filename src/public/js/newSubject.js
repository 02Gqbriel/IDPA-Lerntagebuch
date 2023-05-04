document.getElementById('newSubjectForm').onsubmit = async (ev) => {
	ev.preventDefault();

	const token = sessionStorage.getItem('token');

	const res = await fetch('/api/auth/verify', {
		headers: { Authorization: token },
	});

	if (!res.ok) {
		return window.location.assign("/login")
	}

	const name = document.getElementById('subjectName').value;

	const url = ev.target.action;

	const formData = new FormData();

	formData.append('name', name);
	

	const resCreate = await fetch('/api/subject/create', {
		headers: { Authorization: token },
		method: 'post',
		body: formData
		
	});

	if (resCreate.ok) {
		return window.location.replace('/subjects');
	}

	ev.target.reset();

	const errorContainer = document.getElementById('error-container');

	errorContainer.innerText = await resCreate.text();
};