(async () => {
	const root = document.getElementById('root');

	const token = sessionStorage.getItem('token');

	if (token == undefined) {
		root.innerHTML = `
                    <div id="not-logged-in">
                        <h1>Bitte einloggen um einen Eintrag auswählen zu können!</h1>
                    </div>
                `;
	}

	const res = await fetch('/api/auth/verify', {
		headers: { Authorization: token },
	});

	if (res.ok) {
		root.innerHTML = `
                    <div>
                        <h1>eingeloggt</h1>
                    </div>
                `;
	} else {
		root.innerHTML = `
                    <div id="not-logged-in">
                        <h1>Bitte einloggen um einen Eintrag auswählen zu können!</h1>
                    </div>
                `;
	}
})();
