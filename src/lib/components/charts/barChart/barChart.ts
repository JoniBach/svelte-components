// barChart.ts
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
 * Initializes the SVG element
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
		.style('background-color', 'var(--color-panel)')
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
): d3.ScaleBand<string> {
	return d3
		.scaleBand()
		.domain(data.map((d) => d[accessor.x]))
		.range([margin.left, width - margin.right])
		.padding(0.1);
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
	xScale: d3.ScaleBand<string>,
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
 * Draws bars on the SVG.
 */
export function drawBars(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	data: any[],
	xScale: d3.ScaleBand<string>,
	yScale: d3.ScaleLinear<number, number>,
	height: number,
	margin: Margin,
	accessor: Accessor
): void {
	svg
		.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (d) => xScale(d[accessor.x]) as number)
		.attr('y', (d) => yScale(d[accessor.y]))
		.attr('width', xScale.bandwidth())
		.attr('height', (d) => height - margin.bottom - yScale(d[accessor.y]))
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
 * Main function to create the entire bar chart.
 */
export function createBarChart(container: HTMLElement, config: ChartConfig): void {
	const { data, width, height, margin, accessor, title, xLabel, yLabel } = config;

	const svg = createSvg(container, width, height);
	const xScale = createXScale(data, accessor, width, margin);
	const yScale = createYScale(data, accessor, height, margin);

	drawXAxis(svg, xScale, height, margin);
	drawYAxis(svg, yScale, margin);
	drawBars(svg, data, xScale, yScale, height, margin, accessor);
	addTitle(svg, width, margin, title);
	addAxisLabels(svg, width, height, margin, xLabel, yLabel);
}
