function redirectTo(link,method) {
	return (method == 'replace') ? window.location.replace(link) : window.open(link);
}