document.getElementById('form').onsubmit = async (ev) => {
	ev.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	const url = ev.target.action;

	const formData = new FormData();

	formData.append('username', username);
	formData.append('password', password);

	const res = await fetch(url, {
		method: 'post',
		body: formData,
	});

	if (res.ok) {
		const { token, expires } = await res.json();

		sessionStorage.setItem('token', token);
		sessionStorage.setItem('expires', expires);

		return window.location.replace('/');
	}

	ev.target.reset();

	const errorContainer = document.getElementById('error-container');

	errorContainer.innerText = await res.text();
};
