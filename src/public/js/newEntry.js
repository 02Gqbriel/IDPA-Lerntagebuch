ocument.getElementById('newEntryForm').onsubmit = async (ev) => {
	ev.preventDefault();

	const token = sessionStorage.getItem('token');

	const res = await fetch('/api/auth/verify', {
		headers: { Authorization: token },
	});

	if (!res.ok) {
		return window.location.assign("/login")
	}

	const title = document.getElementById("title")

    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const currentDate = `${year}-${month}-${day}`

    //const subjectID = ???;

	const url = ev.target.action;

	const formData = new FormData();

	formData.append('title', title);
    formData.append('date', currentDate);
    formData.append('subject', subjectID);

	

	const resCreate = await fetch('/api/entry/create', {
		headers: { Authorization: token },
		method: 'post',
		body: formData
		
	});

	if (resCreate.ok) {
		return window.location.replace('/');
	}

	ev.target.reset();

	const errorContainer = document.getElementById('error-container');

	errorContainer.innerText = await resCreate.text();
};