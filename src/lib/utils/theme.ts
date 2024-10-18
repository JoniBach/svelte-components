export function initTheme() {
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			document.documentElement.setAttribute('data-theme', savedTheme);
		}
	}
}
