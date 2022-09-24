module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.html',
		'./src/**/*.js',
		'./src/**/*.jsx',
		'./public/**/*.html'
	],
	theme: {
		extend: {
			fontFamily: {
				poppins_medium: "'Poppins Medium'",
				poppins_head: "'Poppins Head'",
				poppins_subtext: "'Poppins Subtext'",
				prompt_medium: "'Prompt Medium'",
				prompt_head: "'Prompt Head'",
				prompt_subtext: "'Prompt Subtext'"
			},
			colors: {
				light_blue: '#4a7cff',
				darker_blue: '#1b57f3',
				body_blue: '#000613',
				header_blue: '#16213E',
				header_blue_secondary: '#29376A',
				component_blue_full: '#21293E',
				component_blue: 'rgba(33, 41, 62, 0.5)',
				text_placeholder: '#C4C4C4',
				red_abort: '#FF5A5A',
				favourite: '#FF3535',
				dark_blue: '#001439',
				header_border_blue: '#283A68',
				component_secondary: 'rgba(33, 46, 82, 0.1)',
				component_core: '#212E52',
				component_secondary_dark: 'rgba(33, 46, 82, 0.5)',
				outline_blue: '#7DACF9',
				outline_dark: '#1B57F3',
				app_white: '#E8F0FD'
			}
		}
	},
	variants: {
		extend: {
			width: ['responsive', 'hover', 'focus']
		}
	},
	plugins: []
}
