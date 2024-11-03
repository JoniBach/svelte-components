// src/stores/toastStore.js
import { writable } from 'svelte/store';

export const toastStore = writable([]);

let id = 0;

export const addToast = (message, type = 'info', duration = 3000) => {
	const toast = {
		id: ++id,
		message,
		type,
		duration
	};

	toastStore.update((toasts) => {
		return [...toasts, toast];
	});

	setTimeout(() => {
		removeToast(toast.id);
	}, duration);
};

export const removeToast = (id) => {
	toastStore.update((toasts) => {
		return toasts.filter((toast) => toast.id !== id);
	});
};
