import * as d3 from 'd3';

interface GaugeConfig {
	value: number;
	minValue: number;
	maxValue: number;
	size: number | string;
	innerColor?: string;
	outerColor?: string;
	textColor?: string;
	label: string;
}

function getCssVariableColor(color: string): string {
	return `var(--color-${color})`;
}

export function createSvg(
	container: HTMLElement,
	size: number
): d3.Selection<SVGSVGElement, unknown, null, undefined> {
	return d3
		.select(container)
		.append('svg')
		.attr('viewBox', `0 0 ${size} ${size}`)
		.style('width', '100%') // Responsive width
		.style('height', 'auto') // Maintains aspect ratio
		.style('background-color', getCssVariableColor('panel'))
		.style('border', `1px solid ${getCssVariableColor('border')}`)
		.style('border-radius', '4px');
}

export function drawBackgroundArc(
	svg: d3.Selection<SVGGElement, unknown, null, undefined>,
	radius: number,
	arcWidth: number,
	outerColor: string
) {
	const backgroundArc = d3
		.arc()
		.innerRadius(radius - arcWidth)
		.outerRadius(radius)
		.startAngle(-Math.PI / 2)
		.endAngle(Math.PI / 2);

	svg
		.append('path')
		.attr('d', backgroundArc as any)
		.style('fill', getCssVariableColor(outerColor));
}

export function drawForegroundArc(
	svg: d3.Selection<SVGGElement, unknown, null, undefined>,
	radius: number,
	arcWidth: number,
	scale: d3.ScaleLinear<number, number>,
	value: number,
	innerColor: string
) {
	const foregroundArc = d3
		.arc()
		.innerRadius(radius - arcWidth)
		.outerRadius(radius)
		.startAngle(-Math.PI / 2)
		.endAngle(scale(value));

	svg
		.append('path')
		.attr('d', foregroundArc as any)
		.style('fill', getCssVariableColor(innerColor))
		.style('transition', 'fill 0.3s ease');
}

export function displayValue(
	svg: d3.Selection<SVGGElement, unknown, null, undefined>,
	radius: number,
	value: number,
	textColor: string
) {
	svg
		.append('text')
		.attr('text-anchor', 'middle')
		.attr('y', radius * 0.2)
		.style('font-size', '20px')
		.style('fill', getCssVariableColor(textColor))
		.text(value);
}

export function displayLabel(
	svg: d3.Selection<SVGGElement, unknown, null, undefined>,
	radius: number,
	label: string,
	textColor: string
) {
	svg
		.append('text')
		.attr('text-anchor', 'middle')
		.attr('y', radius * 0.5)
		.style('font-size', '14px')
		.style('fill', getCssVariableColor(textColor))
		.text(label);
}

export function createGauge(container: HTMLElement, config: GaugeConfig): void {
	const {
		value,
		minValue,
		maxValue,
		size,
		innerColor = 'primary',
		outerColor = 'background',
		textColor = 'text',
		label
	} = config;

	// Default size when size is '100%' (e.g., 200px for reference)
	const effectiveSize = typeof size === 'string' ? 200 : size;
	const radius = effectiveSize / 2;
	const arcWidth = radius * 0.2;

	const svg = createSvg(container, effectiveSize)
		.append('g')
		.attr('transform', `translate(${radius}, ${radius})`);

	const scale = d3
		.scaleLinear()
		.domain([minValue, maxValue])
		.range([-Math.PI / 2, Math.PI / 2]);

	drawBackgroundArc(svg, radius, arcWidth, outerColor);
	drawForegroundArc(svg, radius, arcWidth, scale, value, innerColor);
	displayValue(svg, radius, value, textColor);

	if (label) {
		displayLabel(svg, radius, label, textColor);
	}
}
