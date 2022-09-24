import React from 'react'
import _map from 'lodash/map'
import c from 'classnames'
import _isEmpty from 'lodash/isEmpty'

function Select(props) {
	const { placeholder, options, className, error = '', ...rest } = props
	return (
		<div className='w-full'>
			<select
				{...rest}
				className={c(
					'flex gap-x-2 border border-white border-opacity-50 w-full outline-none bg-body_blue rounded p-4',
					'form',
					className
				)}
			>
				<option value='' disabled>
					{placeholder}
				</option>
				{_map(options, (option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			{!_isEmpty(error) && (
				<p className='text-secondary text-red-400'>{error}</p>
			)}
		</div>
	)
}

export default Select
