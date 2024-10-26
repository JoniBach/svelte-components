export function nextSlide(currentIndex, groupLength) {
	if (groupLength === 0) return 0; // Handle empty group
	return (currentIndex + 1) % groupLength;
}

export function prevSlide(currentIndex, groupLength) {
	if (groupLength === 0) return 0; // Handle empty group
	return (currentIndex - 1 + groupLength) % groupLength;
}

export function startAutoSlide(auto, interval, updateCurrentIndex, setIntervalId, groupLength) {
	if (auto && groupLength > 0) {
		const id = setInterval(() => {
			updateCurrentIndex((currentIndex) => nextSlide(currentIndex, groupLength));
		}, interval);
		setIntervalId(id);
	}
}

export function stopAutoSlide(intervalId) {
	clearInterval(intervalId);
}

export function handleTouchStart(event, setStartX, setIsDragging, stopAutoSlide) {
	setStartX(event.touches[0].clientX);
	setIsDragging(true);
	stopAutoSlide();
}

export function handleTouchMove(event, isDragging, setEndX) {
	if (!isDragging) return;
	setEndX(event.touches[0].clientX);
}

export function handleTouchEnd(
	startX,
	endX,
	isDragging,
	auto,
	interval,
	groupLength,
	currentIndex,
	nextSlideFn,
	prevSlideFn,
	startAutoSlideFn,
	stopAutoSlideFn
) {
	if (!isDragging) return currentIndex;

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

export function handleMouseDown(event, setStartX, setIsDragging, stopAutoSlide) {
	setStartX(event.clientX);
	setIsDragging(true);
	stopAutoSlide();
}

export function handleMouseMove(event, isDragging, setEndX) {
	if (!isDragging) return;
	setEndX(event.clientX);
}

export function handleMouseUp(
	startX,
	endX,
	isDragging,
	auto,
	interval,
	groupLength,
	currentIndex,
	nextSlideFn,
	prevSlideFn,
	startAutoSlideFn,
	stopAutoSlideFn
) {
	if (!isDragging) return currentIndex;

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
