import * as d3 from 'd3';

interface Margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface Accessor {
	value: string;
	label: string;
}

interface ChartConfig {
	data: any[];
	width: number;
	height: number;
	margin: Margin;
	accessor: Accessor;
	title: string;
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
		.style('background-color', 'var(--color-panel)')
		.style('border', `1px solid var(--color-border)`)
		.style('border-radius', '4px');
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
 * Creates a pie chart with slices for each data point.
 */
export function createPieChart(container: HTMLElement, config: ChartConfig): void {
	const { data, width, height, margin, accessor, title } = config;

	const radius = Math.min(width, height) / 2 - Math.max(margin.left, margin.right);
	const color = d3.scaleOrdinal(d3.schemeCategory10);

	const svg = createSvg(container, width, height);
	addTitle(svg, width, margin, title);

	const chartGroup = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

	const pie = d3.pie<any>().value((d) => d[accessor.value]);
	const arc = d3.arc<d3.PieArcDatum<any>>().innerRadius(0).outerRadius(radius);

	const arcs = chartGroup
		.selectAll('.slice')
		.data(pie(data))
		.enter()
		.append('g')
		.attr('class', 'slice');

	arcs
		.append('path')
		.attr('d', arc)
		.attr('fill', (d, i) => color(i.toString()))
		.style('transition', 'opacity 0.3s ease')
		.on('mouseover', function () {
			d3.select(this).style('opacity', 0.8);
		})
		.on('mouseout', function () {
			d3.select(this).style('opacity', 1);
		});

	arcs
		.append('text')
		.attr('transform', (d) => `translate(${arc.centroid(d)})`)
		.attr('text-anchor', 'middle')
		.style('font-size', 'var(--typography-small)')
		.style('fill', 'var(--color-text)')
		.text((d) => d.data[accessor.label]);
}
