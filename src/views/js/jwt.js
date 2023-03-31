window.jwt = jwt;
window.loggedIn = false;

async function jwt(ev) {
	const exp = sessionStorage.getItem('expires');

	if (exp == null) return;

	if (Date.now() >= exp) {
		return sessionStorage.removeItem('expires');
	}

	const res = await fetch('');
}

jwt();
