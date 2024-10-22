<script lang="ts">
	import Footer from './Footer.svelte';

	const group = [
		// Company Information
		{
			label: 'Company Information',
			id: 'company-info',
			group: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Investor Relations', href: '/investors' },
				{ label: 'Newsroom', href: '/newsroom' },
				{ label: 'Press', href: '/press' },
				{ label: 'Sustainability', href: '/sustainability' },
				{ label: 'Social Responsibility', href: '/social-responsibility' }
			]
		},

		// Customer Support
		{
			label: 'Customer Support',
			id: 'customer-support',
			group: [
				{ label: 'Contact Us', href: '/contact' },
				{ label: 'Help Center', href: '/help-center' },
				{ label: 'FAQ', href: '/faq' },
				{ label: 'Shipping Info', href: '/shipping-info' },
				{ label: 'Returns & Refunds', href: '/returns-refunds' },
				{ label: 'Billing Support', href: '/billing-support' },
				{ label: 'Store Locator', href: '/store-locator' },
				{ label: 'COVID-19 Resources', href: '/covid-19-resources' }
			]
		},

		// Legal and Policies
		{
			label: 'Legal and Policies',
			id: 'legal-policies',
			group: [
				{ label: 'Privacy Policy', href: '/privacy-policy' },
				{ label: 'Terms of Service', href: '/terms-of-service' },
				{ label: 'Community Guidelines', href: '/community-guidelines' },
				{ label: 'Accessibility', href: '/accessibility' },
				{ label: 'Cookie Preferences', href: '/cookie-preferences' },
				{ label: 'Trust & Safety', href: '/trust-safety' },
				{ label: 'Content Policy', href: '/content-policy' },
				{ label: 'Legal Notices', href: '/legal-notices' },
				{ label: 'User Agreements', href: '/user-agreements' }
			]
		},

		// Programs and Partnerships
		{
			label: 'Programs',
			id: 'programs-partnerships',
			group: [
				{ label: 'Affiliate Program', href: '/affiliate-program' },
				{ label: 'Partnerships', href: '/partnerships' },
				{ label: 'Events', href: '/events' },
				{ label: 'Referral Program', href: '/referral-program' },
				{ label: 'Gift Cards', href: '/gift-cards' }
			]
		},

		// Resources
		{
			label: 'Resources',
			id: 'resources',
			group: [
				{ label: 'Blog', href: '/blog' },
				{ label: 'Careers FAQs', href: '/careers-faqs' },
				{ label: 'Investor FAQs', href: '/investor-faqs' },
				{ label: 'Developer API', href: '/developer-api' },
				{ label: 'API Documentation', href: '/api-documentation' },
				{ label: 'Mobile App', href: '/mobile-app' },
				{ label: 'Career Development', href: '/career-development' },
				{ label: 'Vendor Resources', href: '/vendor-resources' },
				{ label: 'Open Source', href: '/open-source' }
			]
		}
	];

	const props = {
		label: '!!!',
		group
	};
</script>

<Footer {...props} />
