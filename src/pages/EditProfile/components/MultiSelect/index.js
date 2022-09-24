import React from 'react'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import _isEmpty from 'lodash/isEmpty'

const InputWrapper = styled('div')`
	width: 100%;
	border: 0.5px solid rgba(255, 255, 255, 0.5);
	background-color: #000613;
	border-radius: 4px;
	padding: 0.75rem;
	display: flex;
	flex-wrap: wrap;

	& input {
		font-size: 14px;
		color: white;
		background-color: #000613;
		padding: 4px 6px;
		width: 0;
		min-width: 30px;
		flex-grow: 1;
		border: 0;
		margin: 0;
		outline: 0;
	}
`

const Tag = ({ label, onDelete, ...props }) => (
	<div
		{...props}
		className='text-secondary bg-header_blue rounded text-white flex items-center gap-x-2 px-2'
	>
		<span>{label}</span>
		<CloseIcon onClick={onDelete} className='cursor-pointer' />
	</div>
)

const ListBox = styled('ul')`
	width: 58.3%;
	margin: 2px 0 0;
	padding: 0;
	position: absolute;
	list-style: none;
	background-color: #000613;
	overflow: auto;
	max-height: 250px;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 1;

	& li {
		padding: 5px 12px;
		display: flex;

		& span {
			flex-grow: 1;
		}

		& svg {
			color: transparent;
		}
	}

	& li[aria-selected='true'] {
		background-color: #16213e;
		font-weight: 600;

		& svg {
			color: #fff;
		}
	}

	& li[data-focus='true'] {
		background-color: #001439;
		cursor: pointer;

		& svg {
			color: #fff;
		}
	}
`

function MultiSelect(props) {
	const {
		getRootProps,
		getInputProps,
		getTagProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		value,
		focused,
		setAnchorEl
	} = useAutocomplete({
		defaultValue: [],
		multiple: true,
		options: SKILLS,
		getOptionLabel: (option) => option
	})

	const { onChange: formikChange, placeholder, error } = props

	formikChange({ target: { name: 'skills', value } })

	return (
		<div>
			<div {...getRootProps()}>
				<InputWrapper
					ref={setAnchorEl}
					className={focused ? 'focused gap-2' : 'gap-2'}
				>
					{value.map((option, index) => (
						<Tag label={option} {...getTagProps({ index })} />
					))}

					<input
						{...getInputProps()}
						placeholder={placeholder}
						className='text-secondary'
					/>
				</InputWrapper>
			</div>
			{groupedOptions.length > 0 ? (
				<ListBox {...getListboxProps()}>
					{groupedOptions.map((option, index) => (
						<li {...getOptionProps({ option, index })}>
							<span>{option}</span>
							<CheckIcon fontSize='small' />
						</li>
					))}
				</ListBox>
			) : null}
			{!_isEmpty(error) && (
				<p className='text-secondary text-red-400'>{error}</p>
			)}
		</div>
	)
}

export default React.memo(MultiSelect)

const SKILLS = [
	'App Development',
	'UX design',
	'SEO/SEM marketing',
	'Blockchain',
	'Industrial design',
	'Creativity',
	'Web Development',
	'Cloud computing',
	'Artificial intelligence',
	'Machine Learning',
	'Video Editing'
]
