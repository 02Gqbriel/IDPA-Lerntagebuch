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
	height: '85%',
	language: 'de',
	hidden_input: true,
	setup: function (editor) {
		editor.on('init', async function (e) {
			const [id] = window.location.pathname.split('/').reverse();

			if (id === 'test') {
				return;
			}

			const token = sessionStorage.getItem('token');

			const resEntry = await fetch('/api/entry/get?id=' + id, {
				headers: { Authorization: token },
			});

			const { title, content, date, subjectID } = await resEntry.json();

			const titleElement = document.getElementById('title');

			titleElement.innerText = title;

			const dateElement = document.getElementById('date');

			dateElement.innerText = date;

			editor.setContent(content);

			const resSubject = await fetch('/api/subject/get?id=' + subjectID, {
				headers: { Authorization: token },
			});

			if (!resSubject) {
				console.log(resSubject);
			}

			const json = await resSubject.json();

			const subjectEl = document.getElementById('subject');

			subjectEl.innerText = json.name;
		});
	},
});
