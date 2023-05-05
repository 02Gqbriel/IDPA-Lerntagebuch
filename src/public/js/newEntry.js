<<<<<<< HEAD
document.getElementById('newEntryForm').onsubmit = async (ev) => {
=======
ocument.getElementById('newEntryForm').onsubmit = async (ev) => {
>>>>>>> 419b98f8a307155f70394b4c8d684a01570f268b
	ev.preventDefault();

	const token = sessionStorage.getItem('token');

	const res = await fetch('/api/auth/verify', {
		headers: { Authorization: token },
	});

	if (!res.ok) {
		return window.location.assign("/login")
	}

	const title = document.getElementById('entryTitle').value;

	const url = ev.target.action;

	const formData = new FormData();

	formData.append('title', title);

    var date = new Date(); 
    var dateFormat = date.getFullYear + "-" + (date.getMonth()+1) + "-" + date.getDate();
    formData.append('date', dateFormat);

    var currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);
    formData.append('subject', parseInt(urlParams.get('id'))); 
	

	const resCreateEntry = await fetch('/api/entry/create', {
		headers: { Authorization: token },
		method: 'post',
		body: formData
	});

	if (resCreateEntry.ok) {
		return window.location.replace(`/entries?id=${urlParams.get('id')}`);
	}

	ev.target.reset();

	const errorContainer = document.getElementById('error-container');

	errorContainer.innerText = await resCreateEntry.text();
};