
(function() {
	let form = document.querySelector('#contact-form');
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		let fields = {};
		form.querySelectorAll('input, textarea').forEach(inp => {
			if(inp.type == 'submit') return;
			let m = inp.name.match(/^([a-zA-Z0-9_]+)\[([a-zA-Z0-9_]+)\]$/);
			if(m) {
				let [fld, key] = m.slice(1);
				if(!(fld in fields)) fields[fld] = [];

				if(inp.matches(':checked')) {
					fields[fld].push(key);
				}
			} else {
				let key = inp.name;
				fields[key] = inp.value;
			}
		});
		let subject = 'Rezervacija termina';
		let body = Object.keys(fields).filter(f => f != 'message').map(fld => 
			`${fld}: ` + ((val) =>
					(typeof val == 'string' ? val : val.join(', '))
				)(fields[fld])
		).join('\n') + `\nPoruka:\n${fields['message']}`;
		location.href = `mailto:info@babybloomphotography.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	});
})();

