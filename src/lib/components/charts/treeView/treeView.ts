import * as d3 from 'd3';

interface TreeNode {
	name: string;
	children?: TreeNode[];
}

interface ChartConfig {
	data: TreeNode;
	width: number;
	height: number;
}

/**
 * Initializes the SVG element without any background.
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
		.style('border', `1px solid #ccc`) // Light gray border
		.style('border-radius', '4px');
}

/**
 * Creates the tree view with nodes and links.
 */
export function createTreeView(container: HTMLElement, config: ChartConfig): void {
	const { data, width, height } = config;

	const svg = createSvg(container, width, height);
	const margin = { top: 20, right: 90, bottom: 30, left: 90 };
	const chartWidth = width - margin.left - margin.right;
	const chartHeight = height - margin.top - margin.bottom;

	const root = d3.hierarchy(data);
	const treeLayout = d3.tree<TreeNode>().size([chartHeight, chartWidth]);
	treeLayout(root);

	// Group to center the tree in the SVG
	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	// Draw links (lines connecting nodes)
	g.selectAll('.link')
		.data(root.links())
		.enter()
		.append('path')
		.attr('class', 'link')
		.attr(
			'd',
			d3
				.linkHorizontal()
				.x((d) => d.y)
				.y((d) => d.x) as any
		)
		.attr('fill', 'none')
		.attr('stroke', '#aaa') // Light gray for links
		.attr('stroke-width', 2);

	// Draw nodes
	const node = g
		.selectAll('.node')
		.data(root.descendants())
		.enter()
		.append('g')
		.attr('class', 'node')
		.attr('transform', (d) => `translate(${d.y},${d.x})`);

	// Draw circles for nodes
	node
		.append('circle')
		.attr('r', 6)
		.attr('fill', '#3498db') // Default blue color for nodes
		.style('transition', 'fill 0.3s ease')
		.on('mouseover', function () {
			d3.select(this).attr('fill', '#e74c3c'); // Red color on hover
		})
		.on('mouseout', function () {
			d3.select(this).attr('fill', '#3498db'); // Back to blue on mouse out
		});

	// Add text labels for nodes
	node
		.append('text')
		.attr('dy', '.35em')
		.attr('x', (d) => (d.children ? -10 : 10))
		.style('text-anchor', (d) => (d.children ? 'end' : 'start'))
		.style('font-size', '12px')
		.style('fill', 'var(--color-text)') // Dark gray for text
		.text((d) => d.data.name);
}
