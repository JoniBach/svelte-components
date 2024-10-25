import * as d3 from 'd3';

interface Margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface Accessor {
	x: string;
	y: string;
}

interface ChartConfig {
	data: any[];
	width: number;
	height: number;
	margin: Margin;
	accessor: Accessor;
	title: string;
	xLabel: string;
	yLabel: string;
}

/**
 * Initializes the SVG element.
 */
export function createSvg(
	container: HTMLElement,
	width: number,
	height: number
): d3.Selection<SVGSVGElement, unknown, null, undefined> {
	return d3
		.select(container)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.style('background-color', 'var(--color-pannel)')
		.style('border', `1px solid var(--color-border)`)
		.style('border-radius', '4px');
}

/**
 * Creates the X scale for the chart.
 */
export function createXScale(
	data: any[],
	accessor: Accessor,
	width: number,
	margin: Margin
): d3.ScalePoint<string> {
	return d3
		.scalePoint()
		.domain(data.map((d) => d[accessor.x]))
		.range([margin.left, width - margin.right])
		.padding(0.5);
}

/**
 * Creates the Y scale for the chart.
 */
export function createYScale(
	data: any[],
	accessor: Accessor,
	height: number,
	margin: Margin
): d3.ScaleLinear<number, number> {
	return d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d[accessor.y]) as number])
		.nice()
		.range([height - margin.bottom, margin.top]);
}

/**
 * Draws the X axis on the SVG.
 */
export function drawXAxis(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	xScale: d3.ScalePoint<string>,
	height: number,
	margin: Margin
): void {
	svg
		.append('g')
		.attr('transform', `translate(0, ${height - margin.bottom})`)
		.call(d3.axisBottom(xScale))
		.selectAll('text')
		.attr('dy', '.75em')
		.attr('dx', '-.35em')
		.attr('transform', 'rotate(-30)')
		.style('text-anchor', 'end')
		.style('font-size', 'var(--typography-small)')
		.style('fill', 'var(--color-text)');
}

/**
 * Draws the Y axis on the SVG.
 */
export function drawYAxis(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	yScale: d3.ScaleLinear<number, number>,
	margin: Margin
): void {
	svg
		.append('g')
		.attr('transform', `translate(${margin.left}, 0)`)
		.call(d3.axisLeft(yScale))
		.style('font-size', 'var(--typography-small)')
		.style('fill', 'var(--color-text)');
}

/**
 * Draws a line connecting the data points.
 */
export function drawLine(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	data: any[],
	xScale: d3.ScalePoint<string>,
	yScale: d3.ScaleLinear<number, number>,
	accessor: Accessor
): void {
	const line = d3
		.line<any>()
		.x((d) => xScale(d[accessor.x]) as number)
		.y((d) => yScale(d[accessor.y]))
		.curve(d3.curveMonotoneX);

	svg
		.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', 'var(--color-primary)')
		.attr('stroke-width', 2)
		.attr('d', line);
}

/**
 * Draws points at each data value.
 */
export function drawPoints(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	data: any[],
	xScale: d3.ScalePoint<string>,
	yScale: d3.ScaleLinear<number, number>,
	accessor: Accessor
): void {
	svg
		.selectAll('.point')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'point')
		.attr('cx', (d) => xScale(d[accessor.x]) as number)
		.attr('cy', (d) => yScale(d[accessor.y]))
		.attr('r', 4)
		.attr('fill', 'var(--color-primary)')
		.style('transition', 'fill 0.3s ease')
		.on('mouseover', function () {
			d3.select(this).attr('fill', 'var(--color-accent)');
		})
		.on('mouseout', function () {
			d3.select(this).attr('fill', 'var(--color-primary)');
		});
}

/**
 * Adds a title to the chart.
 */
export function addTitle(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	width: number,
	margin: Margin,
	title: string
): void {
	svg
		.append('text')
		.attr('x', width / 2)
		.attr('y', margin.top / 2)
		.attr('text-anchor', 'middle')
		.style('font-size', 'var(--typography-large)')
		.style('fill', 'var(--color-text)')
		.text(title);
}

/**
 * Adds labels to the X and Y axes.
 */
export function addAxisLabels(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	width: number,
	height: number,
	margin: Margin,
	xLabel: string,
	yLabel: string
): void {
	svg
		.append('text')
		.attr('x', width / 2)
		.attr('y', height - margin.bottom / 10)
		.attr('text-anchor', 'middle')
		.style('font-size', 'var(--typography-small)')
		.style('fill', 'var(--color-text)')
		.text(xLabel);

	svg
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', -height / 2)
		.attr('y', margin.left / 4)
		.attr('text-anchor', 'middle')
		.style('font-size', 'var(--typography-small)')
		.style('fill', 'var(--color-text)')
		.text(yLabel);
}

/**
 * Main function to create the entire line chart.
 */
export function createLineChart(container: HTMLElement, config: ChartConfig): void {
	const { data, width, height, margin, accessor, title, xLabel, yLabel } = config;

	const svg = createSvg(container, width, height);
	const xScale = createXScale(data, accessor, width, margin);
	const yScale = createYScale(data, accessor, height, margin);

	drawXAxis(svg, xScale, height, margin);
	drawYAxis(svg, yScale, margin);
	drawLine(svg, data, xScale, yScale, accessor);
	drawPoints(svg, data, xScale, yScale, accessor);
	addTitle(svg, width, margin, title);
	addAxisLabels(svg, width, height, margin, xLabel, yLabel);
}
