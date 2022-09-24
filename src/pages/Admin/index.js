import React, { useCallback, useState } from 'react'
import { default as Header } from 'components/NewHeader'
import { useAdminData } from './hooks'
import { CircularProgress as Loader } from '@material-ui/core'
import { config } from './utils'
import _map from 'lodash/map'
import _has from 'lodash/has'
import ContentCard from './components/ContentCard'
import UserCard from './components/UserCard'
import { deleteDocumentByAdmin } from './utils'
import { useHistory, useParams } from 'react-router-dom'

const VIEWS = {
	Posts: 'POSTS',
	Users: 'USERS',
	Polls: 'POLLS',
	Events: 'EVENTS',
	Stories: 'STORIES'
}

function Admin() {
	const { loading, data } = useAdminData()
	const { id } = useParams()
	const history = useHistory()
	const [view, setView] = useState(VIEWS.Posts)

	if (!_has(config.admins, id)) {
		history.goBack()
	}

	const renderContent = () => {
		switch (view) {
			case VIEWS.Posts:
				return (
					<>
						{_map(data?.posts, (post) => (
							<ContentCard
								type='post'
								key={post.id}
								id={post.id}
								{...post.content}
								callback={deleteDocumentByAdmin}
							/>
						))}
					</>
				)

			case VIEWS.Users:
				return (
					<div className='grid grid-cols-3 gap-4'>
						{_map(data?.users, (user) => (
							<UserCard uid={user.id} {...user.content} />
						))}
					</div>
				)

			case VIEWS.Polls:
				return <></>

			case VIEWS.Stories:
				return (
					<>
						{_map(data?.stories, (story) => (
							<ContentCard
								type='story'
								key={story.id}
								{...story.content}
								callback={deleteDocumentByAdmin}
							/>
						))}
					</>
				)

			case VIEWS.Events:
				return <></>

			default:
				return null
		}
	}

	const onSelectOption = useCallback(
		(_event) => {
			const { target } = _event
			setView(target.value)
		},
		[setView]
	)

	return (
		<div className='bg-body_blue h-screen w-screen overflow-scroll py-24'>
			<Header />
			<div className='flex items-center justify-between mb-12 px-24'>
				<p className='text-primary text-white text-3xl'>Admin</p>
				<select
					defaultValue={VIEWS.Posts}
					className='bg-component_core text-secondary text-white p-2 outline-none rounded pl-4 cursor-pointer'
					onChange={onSelectOption}
				>
					<option value={VIEWS.Users}>Users</option>
					<option value={VIEWS.Posts}>Posts</option>
					<option value={VIEWS.Stories}>Stories</option>
				</select>
			</div>
			<div className='flex flex-col gap-y-6 w-full px-24'>
				{loading ? (
					<div className='m-auto text-white flex flex-col items-center'>
						<Loader className='m-auto' color='inherit' />
						<p className='text-primary-02 mt-3'>Loading content</p>
					</div>
				) : (
					renderContent()
				)}
			</div>
		</div>
	)
}

export default Admin
