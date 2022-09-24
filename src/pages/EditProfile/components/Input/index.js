import React, { useCallback } from 'react'
import c from 'classnames'
import _isEmpty from 'lodash/isEmpty'

function Input(props) {
	const { classes, icon = <></>, error = '', type, ...rest } = props

	const onFocus = useCallback((_event) => {
		const element = _event.target
		element.type = 'date'
	}, [])

	const onBlur = useCallback((_event) => {
		const element = _event.target
		element.type = 'text'
	}, [])

	return (
		<div className={c('flex flex-col gap-y-2 w-full', classes?.container)}>
			<div className='flex gap-x-2 border border-white border-opacity-50 rounded p-2'>
				{type === 'date' ? (
					<input
						onFocus={onFocus}
						onBlur={onBlur}
						className={c(
							'text-secondary-02 outline-none background-inherit text-white w-full',
							classes?.input
						)}
						{...rest}
					/>
				) : (
					<input
						className={c(
							'text-secondary-02 outline-none background-inherit text-white w-full',
							classes?.input
						)}
						type={type}
						{...rest}
					/>
				)}
				{icon}
			</div>
			{!_isEmpty(error) && (
				<p className='text-secondary text-red-400'>{error}</p>
			)}
		</div>
	)
}

export default Input
