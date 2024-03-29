import * as React from 'react'

function PeopleIcon(props) {
	return (
		<svg
			width={18}
			height={18}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M12.06 13.68h-.54v3.96a.36.36 0 01-.36.36H6.84a.36.36 0 01-.36-.36v-3.96h-.54a.9.9 0 01-.9-.9v-2.52A3.06 3.06 0 017.366 7.3a2.52 2.52 0 113.276 0 3.06 3.06 0 012.318 2.96v2.52a.9.9 0 01-.9.9zm-7.74-.9v-2.52a3.766 3.766 0 011.872-3.254 3.074 3.074 0 01-.295-2.484 3.163 3.163 0 00-.31-.101 2.52 2.52 0 10-3.276 0A3.06 3.06 0 000 7.38V9.9a.9.9 0 00.893.9h.547v3.96a.36.36 0 00.36.36h3.6a.36.36 0 00.36-.36v-.36a1.62 1.62 0 01-1.44-1.62zm11.354-8.36a2.52 2.52 0 10-3.268 0 3.107 3.107 0 00-.303.102 3.076 3.076 0 01-.295 2.484 3.766 3.766 0 011.872 3.254v2.52a1.62 1.62 0 01-1.44 1.62v.367a.36.36 0 00.36.36h3.6a.36.36 0 00.36-.36V10.8h.54a.9.9 0 00.9-.9V7.38a3.06 3.06 0 00-2.326-2.96z'
				fill='#fff'
			/>
		</svg>
	)
}

export default PeopleIcon
