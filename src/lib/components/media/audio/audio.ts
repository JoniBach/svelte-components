import * as d3 from 'd3';

export async function fetchAudioData(url, svgElement, setAudioBuffer, height, width) {
	try {
		const audioContext = new AudioContext();
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
		setAudioBuffer(audioBuffer);
		drawWaveform(audioBuffer, svgElement, height, width);
	} catch (error) {
		console.error('Error loading audio:', error);
	}
}

function drawWaveform(buffer, svgElement, height, width) {
	const rawData = buffer.getChannelData(0);
	const samples = 5000;
	const blockSize = Math.floor(rawData.length / samples);
	const waveform = new Float32Array(samples);

	for (let i = 0; i < samples; i++) {
		const blockStart = blockSize * i;
		let sum = 0;
		for (let j = 0; j < blockSize; j++) {
			sum += rawData[blockStart + j];
		}
		waveform[i] = sum / blockSize;
	}

	const xScale = d3
		.scaleLinear()
		.domain([0, samples])
		.range([0, typeof width === 'string' ? svgElement.clientWidth : width]);

	const yScale = d3
		.scaleLinear()
		.domain([Math.min(...waveform), Math.max(...waveform)])
		.range([height, 0]);

	const line = d3
		.line()
		.x((d, i) => xScale(i))
		.y((d) => yScale(d))
		.curve(d3.curveLinear);

	const svg = d3
		.select(svgElement)
		.attr('viewBox', `0 0 ${typeof width === 'string' ? svgElement.clientWidth : width} ${height}`)
		.attr('preserveAspectRatio', 'none')
		.attr('width', typeof width === 'string' ? '100%' : width)
		.attr('height', `${height}px`);

	svg.selectAll('*').remove();
	svg
		.append('path')
		.datum(waveform)
		.attr('d', line)
		.attr('fill', 'none')
		.attr('stroke', 'var(--color-primary)')
		.attr('stroke-width', 2);

	const zeroAmplitudeY = yScale(0);
	svg
		.append('line')
		.attr('x1', 0)
		.attr('x2', typeof width === 'string' ? svgElement.clientWidth : width)
		.attr('y1', zeroAmplitudeY)
		.attr('y2', zeroAmplitudeY)
		.attr('stroke', 'var(--color-border)')
		.attr('stroke-width', 1)
		.attr('stroke-dasharray', '4, 2');
}

export async function togglePlayPause(audioElement, isPlaying, setIsPlaying) {
	if (!audioElement) return;

	try {
		if (isPlaying) {
			audioElement.pause();
			setIsPlaying(false);
		} else {
			await audioElement.play();
			setIsPlaying(true);
		}
	} catch (error) {
		console.error('Error playing/pausing audio:', error);
	}
}

export function updateWaveformProgress(audioElement, svgElement, audioBuffer, width, height) {
	if (!audioBuffer || !audioElement) return;

	const currentTime = audioElement.currentTime;
	const duration = audioElement.duration;
	if (isNaN(currentTime) || isNaN(duration)) return;

	const progress = currentTime / duration;
	const totalWidth = typeof width === 'string' ? svgElement.clientWidth : width;
	const widthProgress = totalWidth * progress;

	const svg = d3.select(svgElement);
	svg.selectAll('.progress-line').remove();

	svg
		.append('line')
		.attr('class', 'progress-line')
		.attr('x1', widthProgress)
		.attr('x2', widthProgress)
		.attr('y1', 0)
		.attr('y2', height)
		.attr('stroke', 'var(--color-accent)')
		.attr('stroke-width', 2);
}

export function seek(event, svgElement, audioElement, audioBuffer, width) {
	if (!audioElement || !audioBuffer) return;

	const boundingRect = svgElement.getBoundingClientRect();
	const clickX = event.clientX - boundingRect.left;
	const duration = audioElement.duration;
	const newTime = (clickX / (typeof width === 'string' ? boundingRect.width : width)) * duration;
	audioElement.currentTime = newTime;
}
