tinymce.init({
	selector: '#tinymce',
	base_url: '/tinymce',
	suffix: '.min',
	promotion: false,
	plugins: ['autolink', 'autosave', 'searchreplace', 'save'],
	toolbar:
		'undo redo | styles | bold italic | link image | alignleft aligncenter alignright alignjustify | outdent indent | autosave | searchreplace | restoredraft',
	auto_focus: 'element1',
	resize: false,
	height: '100%',
	language: 'de',
	hidden_input: true,
	setup: function (editor) {
		editor.on('init', async function (e) {
			const token = sessionStorage.getItem('token');

			const res = await fetch('/api/auth/verify', {
				headers: { Authorization: token },
			});

			if (!res.ok) {
				return window.location.assign('/login');
			}

			const [id] = window.location.pathname.split('/').reverse();

			const resEntry = await fetch('/api/entry/get?id=' + id, {
				headers: { Authorization: token },
			});

			if (!res.ok) {
				return window.location.assign('/login');
			}

			const { title, content } = await resEntry.json();

			const titleElement = document.getElementById('title');

			titleElement.innerText = title;

			editor.setContent(content);
		});
	},
});
