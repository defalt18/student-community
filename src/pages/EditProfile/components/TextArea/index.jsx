import React from 'react'
import c from 'classnames'

function TextArea(props) {
	// const showPlaceholder
	const { className, ...inputProps } = props
	return (
		<textarea
			rows={5}
			maxLength={400}
			{...inputProps}
			className={c(
				'outline-none bg-body_blue bg-opacity-50 border border-white border-opacity-50 rounded p-4 text-secondary-02 text-white w-full',
				className
			)}
		/>
	)
}

export default React.memo(TextArea)
