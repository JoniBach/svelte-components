import * as d3 from 'd3';

interface Feature {
	type: 'Feature';
	properties: Record<string, unknown>;
	geometry: {
		type: string;
		coordinates: number[][][];
	};
}

interface FeatureCollection {
	type: 'FeatureCollection';
	features: Feature[];
}
interface Margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface MapConfig {
	width: number;
	height: number;
	geoData: FeatureCollection; // GeoJSON data for regions
	colorScheme: (t: number) => string;
	title: string; // Title label for the map
	dataSource: string; // Data source label for the map
	margin: Margin; // Margins around the SVG content
}

/**
 * Initializes the SVG element with a responsive viewBox.
 */
export function createSvg(
	container: HTMLElement,
	width: number,
	height: number,
	margin: Margin
): d3.Selection<SVGSVGElement, unknown, null, undefined> {
	return d3
		.select(container)
		.append('svg')
		.attr('width', '100%')
		.attr('height', 'auto')
		.attr('viewBox', `0 0 ${width} ${height}`) // Sets responsive viewBox
		.style('background-color', 'var(--color-panel)')
		.style('border', `1px solid var(--color-border)`)
		.style('border-radius', '4px');
}

// The rest of the functions (createProjection, addTitleLabel, addSourceLabel, drawRegions, and createGeoMap)
// remain the same and will use the fixed `width` and `height` passed into viewBox for responsiveness.

/**
 * Creates a projection fitted to the SVG container and respects margins.
 */
export function createProjection(
	geoData: FeatureCollection,
	width: number,
	height: number,
	margin: Margin
): d3.GeoProjection {
	return d3.geoNaturalEarth1().fitExtent(
		[
			[margin.left, margin.top],
			[width - margin.right, height - margin.bottom]
		],
		geoData
	);
}

/**
 * Adds a title label at the top of the map.
 */
export function addTitleLabel(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	width: number,
	margin: Margin,
	title: string
): void {
	svg
		.append('text')
		.attr('x', width / 2)
		.attr('y', margin.top / 2) // Positions title within top margin
		.attr('text-anchor', 'middle')
		.style('font-size', 'var(--typography-large)')
		.style('fill', 'var(--color-text)')
		.text(title);
}

/**
 * Adds a data source label at the bottom of the map.
 */
export function addSourceLabel(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	width: number,
	height: number,
	margin: Margin,
	dataSource: string
): void {
	svg
		.append('text')
		.attr('x', width / 2)
		.attr('y', height - margin.bottom / 2) // Positions source label within bottom margin
		.attr('text-anchor', 'middle')
		.style('font-size', 'var(--typography-tiny)')
		.style('fill', 'var(--color-text)')
		.text(`Data source: ${dataSource}`);
}

/**
 * Draws paths for each region in the GeoJSON data and adds a tooltip.
 */
export function drawRegions(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	geoData: FeatureCollection,
	projection: d3.GeoProjection,
	colorScheme: (t: number) => string
): void {
	const path = d3.geoPath().projection(projection);

	// Create tooltip div
	const tooltip = d3
		.select('body')
		.append('div')
		.style('position', 'absolute')
		.style('padding', '4px 8px')
		.style('background', 'var(--color-tooltip-bg)')
		.style('border', `1px solid var(--color-border)`)
		.style('border-radius', '4px')
		.style('font-size', 'var(--typography-small)')
		.style('color', 'var(--color-text)')
		.style('visibility', 'hidden');

	svg
		.append('g')
		.selectAll('path')
		.data(geoData.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('fill', colorScheme(0.6))
		.attr('stroke', 'var(--color-border)')
		.attr('stroke-width', 0.5)
		.style('transition', 'fill 0.3s ease')
		.on('mouseover', function (event, d) {
			const name = d.properties?.name || 'Unknown';
			d3.select(this).attr('fill', colorScheme(0.8));
			tooltip.style('visibility', 'visible').text(name);
		})
		.on('mousemove', function (event) {
			tooltip.style('top', `${event.pageY + 10}px`).style('left', `${event.pageX + 10}px`);
		})
		.on('mouseout', function () {
			d3.select(this).attr('fill', colorScheme(0.6));
			tooltip.style('visibility', 'hidden');
		});
}

/**
 * Main function to create the entire geo map with title and source labels.
 */
export function createGeoMap(container: HTMLElement, config: MapConfig): void {
	const { width, height, geoData, colorScheme, title, dataSource, margin } = config;

	const svg = createSvg(container, width, height, margin);
	const projection = createProjection(geoData, width, height, margin);

	addTitleLabel(svg, width, margin, title);
	addSourceLabel(svg, width, height, margin, dataSource);
	drawRegions(svg, geoData, projection, colorScheme);
}
