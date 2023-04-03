document.getElementById('form').onsubmit = async ev => {
	ev.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const role = document.getElementById('role').value;

	const url = ev.target.action;

	const formData = new FormData();

	formData.append('username', username);
	formData.append('password', password);
	formData.append('role', role);

	const res = await fetch(url, {
		method: 'post',
		body: formData,
	});

	if (res.ok) {
		return window.location.replace('/login.html');
	}

	ev.target.reset();

	const errorContainer = document.getElementById('error-container');

	errorContainer.innerText = await res.text();
};
