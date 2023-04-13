window.jwt = jwt;
window.loggedIn = false;

async function jwt(ev) {
	const exp = sessionStorage.getItem('expires');

	console.log(window.location.pathname);

	if (exp == null) {
		if (
			window.location.pathname !== '/login' &&
			window.location.pathname !== '/register'
		) {
			window.location.replace('/login');
		}
	}

	if (Date.now() / 1000 >= exp) {
		sessionStorage.removeItem('expires');
		sessionStorage.removeItem('token');
		return;
	}

	console.log(exp - Math.round(Date.now() / 1000));

	setTimeout(async () => {
		const token = sessionStorage.getItem('token');

		const res = await fetch('/api/auth/refresh', {
			headers: { Authorization: token },
		});

		const { token: tokenNew, expires } = await res.json();

		sessionStorage.setItem('token', tokenNew);
		sessionStorage.setItem('expires', expires);

		jwt();
	}, (exp - Math.round(Date.now() / 1000) - 5) * 1000);

	return;
}

jwt();