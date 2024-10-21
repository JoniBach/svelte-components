<script>
	let isMenuOpen = false;

	// On mount, set the theme from localStorage if available
</script>

<header>
	<div class="logo">MyWebsite</div>
	<nav>
		<ul class="menu {isMenuOpen ? 'open' : ''}">
			<li><a on:click>Change Theme</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background-color: #333;
		color: white;
		max-height: 20px;
	}

	nav {
		display: flex;
		align-items: center;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.menu {
		display: flex;
		list-style: none;
		gap: 20px;
		margin: 0;
		padding: 0;
	}

	.menu li {
		padding: 5px 0;
	}

	.menu li a {
		color: white;
		text-decoration: none;
		font-size: 1rem;
	}

	.menu li a:hover {
		color: #ddd;
	}

	.burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		cursor: pointer;
	}

	.burger div {
		width: 25px;
		height: 3px;
		background-color: white;
	}

	/* Responsive menu */
	@media (max-width: 768px) {
		.menu {
			position: absolute;
			top: 60px;
			right: 0;
			flex-direction: column;
			background-color: #333;
			width: 200px;
			padding: 20px;
			transform: translateX(100%);
			transition: transform 0.3s ease-in-out;
		}

		.menu.open {
			transform: translateX(0);
		}

		.burger {
			display: flex;
		}
	}
</style>
