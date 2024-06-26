import * as React from 'react'

function LogoutIcon(props) {
	return (
		<svg
			width={18}
			height={18}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M10 0H8v10h2V0zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0116 9c0 3.87-3.13 7-7 7A6.995 6.995 0 014.58 3.58L3.17 2.17A8.932 8.932 0 000 9a9 9 0 0018 0c0-2.74-1.23-5.18-3.17-6.83z'
				fill='#fff'
			/>
		</svg>
	)
}

export default LogoutIcon
