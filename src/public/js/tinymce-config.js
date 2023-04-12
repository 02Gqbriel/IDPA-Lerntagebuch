tinymce.init({
	selector: '#tinymce',
	base_url: '/tinymce',
	suffix: '.min',
	promotion: false,
	plugins: ['autolink', 'autosave', 'searchreplace', 'save'],
	toolbar:
		'undo redo | styles | bold italic | link image | alignleft aligncenter alignright alignjustify | outdent indent | autosave | searchreplace | save | restoredraft',
	auto_focus: 'element1',
	resize: false,
	height: '100%',
});
