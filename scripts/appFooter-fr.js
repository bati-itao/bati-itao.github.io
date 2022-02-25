var defFooter = document.getElementById("def-footer");
defFooter.outerHTML = wet.builder.appFooter({
	"footerSections": [{
		"href": "https://github.com/bati-itao/bati-itao.github.io",
		"text": "Contribuer à ce projet"
	}, {
		"href": "https://github.com/bati-itao/bati-itao.github.io/issues/new?title=Problem%20with%20site%3A%0A",
		"text": "Signaler un problème"
	}, {
		"href": "https://github.com/bati-itao/bati-itao.github.io/issues/new?title=Suggestion%3A%0A",
		"text": "Suggérer un changement"
	}]
});
