document.getElementById('newEntryForm').onsubmit = async (ev) => {
	ev.preventDefault();

	const token = sessionStorage.getItem('token');

	const res = await fetch('/api/auth/verify', {
		headers: { Authorization: token },
	});

	if (!res.ok) {
		return window.location.assign("/login")
	}

	const resUserInfo = await fetch('api/auth/info', {
		headers: { Authorization: token },
	});
	const userInfo = await resUserInfo.json();

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

	formData.append('userID', userInfo.userID);	

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