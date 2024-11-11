<script lang="ts">
	import Form from './Form.svelte';

	let value = {};

	const props = [
		{
			label: '!!!',
			columns: 2,
			group: [
				{
					variant: 'text',
					name: 'name',
					label: 'Name',
					placeholder: 'Enter your name',
					valid: [
						{
							rule: ['name', 'regex', /^[a-zA-Z]+$/],
							message: 'Name must contain only letters'
						}
					]
				},
				{
					variant: 'text',
					name: 'email',
					label: 'Email',
					value: '',
					valid: [
						{
							rule: ['email', 'regex', /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
							message: 'Email must be valid'
						}
					]
				},

				{
					variant: 'radio',
					name: 'new_user',
					label: 'New User',
					value: 'yes',
					group: [
						{ value: 'yes', label: 'Yes' },
						{ value: 'no', label: 'No' }
					],
					valid: [
						{
							rule: ['new_user', 'anyMatch', ['yes', 'no']],
							message: 'New User must be either "yes" or "no"'
						}
					]
				},
				{
					variant: 'password',
					name: 'password',
					label: 'Password',
					placeholder: 'Enter your password',
					value: '',
					condition: [['new_user', '=', 'yes']],
					valid: [
						{
							rule: ['password', 'regex', /.{8,}/],
							message: 'Password must be at least 8 characters long'
						},
						{
							rule: ['password', 'regex', /[a-z]/],
							message: 'Password must contain at least one lowercase letter'
						},
						{
							rule: ['password', 'regex', /[A-Z]/],
							message: 'Password must contain at least one uppercase letter'
						},
						{
							rule: ['password', 'regex', /\d/],
							message: 'Password must contain at least one number'
						},
						{
							rule: ['password', 'regex', /[!@#$%^&*]/],
							message: 'Password must contain at least one special character'
						}
					]
				},
				{
					variant: 'checkbox',
					name: 'marketing',
					label: 'How did you hear about us?',
					value: 'yes',
					group: [
						{
							value: 'google',
							label: 'Google'
						},
						{
							value: 'facebook',
							label: 'Facebook'
						},
						{
							value: 'other',
							label: 'Other'
						}
					],
					valid: [
						{
							rule: ['marketing', 'regex', /^.{1,}$/],
							message: 'Marketing must be either "google", "facebook", or "other"'
						}
					]
				},
				{
					variant: 'textarea',
					name: 'requirements',
					label: 'Do you have any requirements?',
					placeholder: '...',
					value: '',
					valid: [
						{
							rule: ['requirements', 'regex', /^.{5,}$/],
							message: 'Password must be at least 5 characters long'
						}
					]
				},
				{
					variant: 'url',
					name: 'url',
					label: 'Link to external page',
					placeholder: 'https://example.com',
					value: '',
					valid: [
						{
							rule: ['requirements', 'regex', /^.{5,}$/],
							message: 'url must be at least 5 characters long'
						}
					]
				},
				{
					variant: 'phone',
					name: 'phone',
					label: 'Contact Number?',
					placeholder: '+4475..',
					value: '',
					valid: [
						{
							rule: ['phone', 'regex', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/],
							message: 'Mobile number must be valid'
						}
					]
				},
				{
					variant: 'number',
					name: 'house_number',
					label: 'House Number',
					placeholder: 'Enter your house number',
					value: '',
					valid: [
						{
							rule: ['house_number', 'regex', /^[0-9]+$/],
							message: 'House number must contain only numbers'
						}
					]
				},
				{
					variant: 'date',
					name: 'dob',
					label: 'Date of Birth',
					placeholder: 'YYYY-MM-DD',
					value: '',
					valid: [
						{
							rule: ['dob', 'regex', /^\d{4}-\d{2}-\d{2}$/],
							message: 'Date of Birth must be in the format YYYY-MM-DD'
						}
					]
				},
				{
					variant: 'datetime',
					name: 'booking',
					label: 'Requested booking time',
					placeholder: 'YYYY-MM-DDTHH:MM',
					value: '',
					valid: [
						{
							rule: ['datetime', 'regex', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/],
							message: 'Date and Time must be in the format YYYY-MM-DDTHH:MM'
						}
					]
				},
				{
					variant: 'file',
					name: 'file',
					label: 'Upload documents',
					value: '',
					valid: [
						{
							rule: ['file', 'fileExists', true],
							message: 'File must be uploaded'
						}
					]
				},
				{
					variant: 'rating',
					name: 'rating',
					label: 'Rate our service',
					total: 5,
					value: 0,
					valid: [
						{
							rule: ['rating', 'regex', /^[1-5]$/],
							message: 'Rating must be a number between 1 and 5'
						}
					]
				},
				{
					variant: 'slider',
					name: 'age',
					label: 'Age',
					min: 18,
					max: 100,
					step: 1,
					value: 18,
					valid: [
						{
							rule: ['age', 'regex', /^[1-9][0-9]?$/],
							message: 'Age must be a valid number between 18 and 100'
						}
					]
				},
				{
					variant: 'toggle',
					name: 'subscribe',
					label: 'Subscribe to newsletter',
					value: false,
					valid: [
						{
							rule: ['subscribe', 'boolean'],
							message: 'Subscribe must be a boolean value'
						}
					]
				}
			]
		},
		{
			label: 'demo',
			group: [
				{
					variant: 'text',
					name: 'text',
					label: 'Text Input',
					placeholder: 'Enter some text',
					valid: [
						{
							rule: ['text', 'regex', /^[a-zA-Z\s]+$/],
							message: 'Text must contain only letters and spaces'
						}
					]
				},
				{
					variant: 'text',
					name: 'email',
					label: 'Email',
					placeholder: 'Enter your email',
					valid: [
						{
							rule: ['email', 'regex', /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
							message: 'Email must be valid'
						}
					]
				},
				{
					variant: 'select',
					name: 'select',
					label: 'Select Option',
					value: 'option1',
					group: [
						{ value: 'option1', label: 'Option 1' },
						{ value: 'option2', label: 'Option 2' }
					],
					valid: [
						{
							rule: ['select', 'anyMatch', ['option1', 'option2']],
							message: 'Select must be either "Option 1" or "Option 2"'
						}
					]
				},
				{
					variant: 'radio',
					name: 'radio',
					label: 'Choose an Option',
					value: 'option1',
					group: [
						{ value: 'option1', label: 'Option 1' },
						{ value: 'option2', label: 'Option 2' }
					],
					valid: [
						{
							rule: ['radio', 'anyMatch', ['option1', 'option2']],
							message: 'Choice must be either "Option 1" or "Option 2"'
						}
					]
				},
				{
					variant: 'password',
					name: 'password',
					label: 'Password',
					placeholder: 'Enter a password',
					valid: [
						{
							rule: ['password', 'regex', /.{8,}/],
							message: 'Password must be at least 8 characters long'
						},
						{
							rule: ['password', 'regex', /[a-z]/],
							message: 'Password must contain at least one lowercase letter'
						},
						{
							rule: ['password', 'regex', /[A-Z]/],
							message: 'Password must contain at least one uppercase letter'
						},
						{
							rule: ['password', 'regex', /\d/],
							message: 'Password must contain at least one number'
						},
						{
							rule: ['password', 'regex', /[!@#$%^&*]/],
							message: 'Password must contain at least one special character'
						}
					]
				},
				{
					variant: 'json',
					name: 'json',
					label: 'Json',
					placeholder: 'Enter your json',
					valid: []
				},
				{
					variant: 'checkbox',
					name: 'checkbox',
					label: 'Select Options',
					value: 'option1',
					group: [
						{ value: 'option1', label: 'Option 1' },
						{ value: 'option2', label: 'Option 2' }
					],
					valid: [
						{
							rule: ['checkbox', 'regex', /^.{1,}$/],
							message: 'At least one option must be selected'
						}
					]
				},
				{
					variant: 'textarea',
					name: 'textarea',
					label: 'Comments',
					placeholder: 'Enter your comments',
					value: '',
					valid: [
						{
							rule: ['textarea', 'regex', /^.{5,}$/],
							message: 'Comments must be at least 5 characters long'
						}
					]
				},
				{
					variant: 'url',
					name: 'url',
					label: 'Website URL',
					placeholder: 'https://example.com',
					value: '',
					valid: [
						{
							rule: ['url', 'regex', /^https?:\/\/[^\s$.?#].[^\s]*$/],
							message: 'URL must be valid'
						}
					]
				},
				{
					variant: 'phone',
					name: 'phone',
					label: 'Phone Number',
					placeholder: '+1234567890',
					value: '',
					valid: [
						{
							rule: ['phone', 'regex', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/],
							message: 'Phone number must be valid'
						}
					]
				},
				{
					variant: 'number',
					name: 'number',
					label: 'Number Input',
					placeholder: 'Enter a number',
					value: '',
					valid: [
						{
							rule: ['number', 'regex', /^[0-9]+$/],
							message: 'Input must be a valid number'
						}
					]
				},
				{
					variant: 'date',
					name: 'date',
					label: 'Select Date',
					placeholder: 'YYYY-MM-DD',
					value: '',
					valid: [
						{
							rule: ['date', 'regex', /^\d{4}-\d{2}-\d{2}$/],
							message: 'Date must be in the format YYYY-MM-DD'
						}
					]
				},
				{
					variant: 'time',
					name: 'time',
					label: 'Select Time',
					placeholder: 'HH:MM',
					value: '',
					valid: [
						{
							rule: ['time', 'regex', /^\d{2}:\d{2}$/],
							message: 'Time must be in the format HH:MM'
						}
					]
				},
				{
					variant: 'datetime',
					name: 'datetime',
					label: 'Select Date and Time',
					placeholder: 'YYYY-MM-DDTHH:MM',
					value: '',
					valid: [
						{
							rule: ['datetime', 'regex', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/],
							message: 'Date and Time must be in the format YYYY-MM-DDTHH:MM'
						}
					]
				},
				{
					variant: 'file',
					name: 'file',
					label: 'Upload File',
					value: '',
					valid: [
						{
							rule: ['file', 'fileExists', true],
							message: 'File must be uploaded'
						}
					]
				},
				{
					variant: 'rating',
					name: 'rating',
					label: 'Rate Us',
					total: 5,
					value: 0,
					valid: [
						{
							rule: ['rating', 'regex', /^[1-5]$/],
							message: 'Rating must be between 1 and 5'
						}
					]
				},
				{
					variant: 'slider',
					name: 'slider',
					label: 'Select Range',
					min: 0,
					max: 100,
					step: 1,
					value: 0,
					valid: [
						{
							rule: ['slider', 'regex', /^[0-9]+$/],
							message: 'Slider value must be a valid number'
						}
					]
				},
				{
					variant: 'toggle',
					name: 'toggle',
					label: 'Enable Option',
					value: false,
					valid: [
						{
							rule: ['toggle', 'boolean'],
							message: 'Toggle must be true or false'
						}
					]
				}
			]
		}
	];
</script>

{#each props as props}
	<div class="demo-variant">
		<Form {...props} on:input bind:value />
	</div>
{/each}
