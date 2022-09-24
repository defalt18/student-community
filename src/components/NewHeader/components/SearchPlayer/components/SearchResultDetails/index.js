import React, { useCallback, useState } from 'react'
import _map from 'lodash/map'
import UserCard from 'components/UserCards'
import { CircularProgress as Loader } from '@material-ui/core'
import Button from 'components/Button'
import { fetchSearchResults } from 'pages/Home/utils/home-utils'
import _isEmpty from 'lodash/isEmpty'
import { useAsync, useToggle } from 'react-use'

const LoaderStyles = {
	color: '#fff',
	margin: '0'
}

function SearchResultDetails(props) {
	const { searchString, userdata } = props
	const [fetching, toggle] = useToggle(false)
	const [content, setContent] = useState(null)

	// TODO : Write a Search Function based on updated firebase
	const searchFn = useCallback(
		async (string) => {
			toggle()
			const data = await fetchSearchResults(string)
			setContent(data)
			toggle()
		},
		[setContent, toggle]
	)

	useAsync(() => searchFn(searchString), [searchString])

	const onMouseDown = useCallback((_event) => _event.preventDefault(), [])

	const renderRecent = () => {
		if (_isEmpty(content) || searchString === '')
			return (
				<p className='text-secondary text-text_placeholder'>
					Nothing to show...
				</p>
			)
		if (fetching) return <Loader style={LoaderStyles} />
		return <UserCard {...content[0]} type='recent' userdata={userdata} />
	}

	const renderResults = () => {
		if (_isEmpty(content) || searchString === '')
			return (
				<p className='text-secondary text-text_placeholder'>
					Nothing to show...
				</p>
			)
		if (fetching) return <Loader style={LoaderStyles} />
		return (
			<div className='flex flex-col gap-y-2'>
				{_map(content, (user) => (
					<UserCard {...user} userdata={userdata} />
				))}
			</div>
		)
	}

	return (
		<div
			onMouseDown={onMouseDown}
			className='relative top-6 mx-auto min-h-50 w-120 bg-body_blue border border-header_border_blue rounded p-3'
		>
			<div className='mt-2'>
				<p className='text-tertiary text-text_placeholder my-2'>
					Search results
				</p>
				{renderResults()}
				<div className='flex justify-between items-center my-2'>
					<p className='text-tertiary text-text_placeholder'>Recent</p>
					<Button className='text-tertiary'>CLEAR ALL</Button>
				</div>
				{renderRecent()}
			</div>
		</div>
	)
}

export default React.memo(SearchResultDetails)
