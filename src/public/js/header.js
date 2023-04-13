(async () => {
	const notLoggedIn = document.getElementById('not-logged-in');
	const LoggedIn = document.getElementById('logged-in');

	const token = sessionStorage.getItem('token');

	if (token == undefined) {
		notLoggedIn.classList.replace('hidden', 'flex');

		return;
	}

	const res = await fetch('/api/auth/verify', {
		headers: { Authorization: token },
	});

	if (res.ok) {
		LoggedIn.classList.remove('hidden');
	} else {
		notLoggedIn.classList.replace('hidden', 'flex');
		return;
	}

	const logout = document.getElementById('logout');

	logout.onclick = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('expires');

		window.location.reload();
	};
})();
