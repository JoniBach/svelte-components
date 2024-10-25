import * as d3 from 'd3';

interface HeatmapData {
	x: string;
	y: string;
	value: number;
}

interface ChartConfig {
	data: HeatmapData[];
	width: number;
	height: number;
	colorScheme: (t: number) => string;
	xLabel: string;
	yLabel: string;
}

/**
 * Initializes the SVG element.
 */
function createSvg(
	container: HTMLElement,
	width: number,
	height: number
): d3.Selection<SVGSVGElement, unknown, null, undefined> {
	return d3
		.select(container)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.style('border', '1px solid #ccc')
		.style('border-radius', '4px');
}

/**
 * Creates a heatmap with color intensity based on values.
 */
export function createHeatmap(container: HTMLElement, config: ChartConfig): void {
	const { data, width, height, colorScheme, xLabel, yLabel } = config;
	const margin = { top: 40, right: 20, bottom: 60, left: 60 };
	const chartWidth = width - margin.left - margin.right;
	const chartHeight = height - margin.top - margin.bottom;

	const svg = createSvg(container, width, height);
	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	// Scales for X, Y, and color intensity
	const xScale = d3
		.scaleBand()
		.domain([...new Set(data.map((d) => d.x))])
		.range([0, chartWidth])
		.padding(0.05);

	const yScale = d3
		.scaleBand()
		.domain([...new Set(data.map((d) => d.y))])
		.range([chartHeight, 0])
		.padding(0.05);

	const colorScale = d3
		.scaleSequential()
		.interpolator(colorScheme)
		.domain([0, d3.max(data, (d) => d.value) || 1]);

	// Draw the cells for the heatmap
	g.selectAll('.cell')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'cell')
		.attr('x', (d) => xScale(d.x) as number)
		.attr('y', (d) => yScale(d.y) as number)
		.attr('width', xScale.bandwidth())
		.attr('height', yScale.bandwidth())
		.attr('fill', (d) => colorScale(d.value))
		.style('stroke', '#fff')
		.style('stroke-width', '1px');

	// Add X axis
	g.append('g')
		.attr('transform', `translate(0, ${chartHeight})`)
		.call(d3.axisBottom(xScale))
		.selectAll('text')
		.attr('transform', 'rotate(-45)')
		.style('text-anchor', 'end')
		.style('font-size', '12px')
		.style('fill', 'var(--color-text)');

	// Add Y axis
	g.append('g')
		.call(d3.axisLeft(yScale))
		.selectAll('text')
		.style('font-size', '12px')
		.style('fill', 'var(--color-text)');

	// Add labels for the axes
	svg
		.append('text')
		.attr('transform', `translate(${width / 2}, ${height - 20})`)
		.style('text-anchor', 'middle')
		.style('font-size', '14px')
		.style('fill', 'var(--color-text)')
		.text(xLabel);

	svg
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', -height / 2)
		.attr('y', 20)
		.style('text-anchor', 'middle')
		.style('font-size', '14px')
		.style('fill', 'var(--color-text)')
		.text(yLabel);
}
