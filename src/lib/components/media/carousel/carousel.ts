// carousel.js (or .ts, but keeping it .js for simplicity)

export function nextSlide(currentIndex: number, groupLength: number) {
	return (currentIndex + 1) % groupLength;
}

export function prevSlide(currentIndex: number, groupLength: number) {
	return (currentIndex - 1 + groupLength) % groupLength;
}

export function startAutoSlide(
	auto: boolean,
	interval: number,
	updateCurrentIndex: (indexUpdater: (currentIndex: number) => number) => void,
	setIntervalId: (id: number) => void,
	groupLength: number
) {
	if (auto) {
		const id = setInterval(() => {
			updateCurrentIndex((currentIndex: number) => nextSlide(currentIndex, groupLength));
		}, interval);
		setIntervalId(id);
	}
}

export function stopAutoSlide(intervalId: any) {
	clearInterval(intervalId);
}

export function handleTouchStart(
	event: TouchEvent,
	setStartX: (x: number) => void,
	setIsDragging: (isDragging: boolean) => void,
	stopAutoSlide: () => void
) {
	setStartX(event.touches[0].clientX);
	setIsDragging(true);
	stopAutoSlide();
}

export function handleTouchMove(
	event: TouchEvent,
	isDragging: boolean,
	setEndX: (x: number) => void
) {
	if (!isDragging) return;
	setEndX(event.touches[0].clientX);
}

export function handleTouchEnd(
	startX: number,
	endX: number,
	isDragging: boolean,
	auto: boolean,
	interval: number,
	groupLength: number,
	currentIndex: number,
	nextSlideFn: (currentIndex: number, groupLength: number) => number,
	prevSlideFn: (currentIndex: number, groupLength: number) => number,
	startAutoSlideFn: (
		auto: boolean,
		interval: number,
		updateCurrentIndex: (indexUpdater: (currentIndex: number) => number) => void,
		setIntervalId: (id: number) => void,
		groupLength: number
	) => void,
	stopAutoSlideFn: () => void
) {
	if (!isDragging) return;

	const distance = endX - startX;

	let newIndex = currentIndex;
	if (distance > 50) {
		newIndex = prevSlideFn(currentIndex, groupLength);
	} else if (distance < -50) {
		newIndex = nextSlideFn(currentIndex, groupLength);
	}

	if (auto) {
		startAutoSlideFn(
			auto,
			interval,
			(indexUpdater) => indexUpdater(currentIndex),
			stopAutoSlideFn,
			groupLength
		);
	}

	return newIndex;
}

export function handleMouseDown(
	event: MouseEvent,
	setStartX: (x: number) => void,
	setIsDragging: (isDragging: boolean) => void,
	stopAutoSlide: () => void
) {
	setStartX(event.clientX);
	setIsDragging(true);
	stopAutoSlide();
}

export function handleMouseMove(
	event: MouseEvent,
	isDragging: boolean,
	setEndX: (x: number) => void
) {
	if (!isDragging) return;
	setEndX(event.clientX);
}

export function handleMouseUp(
	startX: number,
	endX: number,
	isDragging: boolean,
	auto: boolean,
	interval: number,
	groupLength: number,
	currentIndex: number,
	nextSlideFn: (currentIndex: number, groupLength: number) => number,
	prevSlideFn: (currentIndex: number, groupLength: number) => number,
	startAutoSlideFn: (
		auto: boolean,
		interval: number,
		updateCurrentIndex: (indexUpdater: (currentIndex: number) => number) => void,
		setIntervalId: (id: number) => void,
		groupLength: number
	) => void,
	stopAutoSlideFn: () => void
) {
	if (!isDragging) return;

	const distance = endX - startX;

	let newIndex = currentIndex;
	if (distance > 50) {
		newIndex = prevSlideFn(currentIndex, groupLength);
	} else if (distance < -50) {
		newIndex = nextSlideFn(currentIndex, groupLength);
	}

	if (auto) {
		startAutoSlideFn(
			auto,
			interval,
			(indexUpdater) => indexUpdater(currentIndex),
			stopAutoSlideFn,
			groupLength
		);
	}

	return newIndex;
}
