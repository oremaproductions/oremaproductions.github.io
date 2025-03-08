function redirectTo(link,method) {
	return (method == 'replace') ? window.location.href = link : window.open(link);
}