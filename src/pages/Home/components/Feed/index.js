import React, { useEffect, useState } from 'react'
import _map from 'lodash/map'
import Post from './components/Post'

import { CircularProgress as Loader } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Stories from './components/Story'
import { useAsync } from 'react-use'
import { deleteOldData } from 'services/story-utils'
import { db } from '../../../../lib/firebase.prod'

const POST_PER_PAGE = 1

function Feed(props) {
	const { stories: allStories, userdata, user } = props
	const { loading = true, value: stories } = useAsync(() =>
		deleteOldData(allStories)
	)
	const greetUser = () => (
		<p className='prompt-text text-white my-8'>Welcome back</p>
	)

	const [page, setPage] = useState(1)
	const [posts, setPosts] = useState([])
	const [pageLoading, setPageLoading] = useState(true)
	useEffect(() => {
		;(async () => {
			setPageLoading(true)
			const data = await db
				.collection('posts')
				.orderBy('timestamp', 'desc')
				.limit(POST_PER_PAGE)
				.get()

			let arr = []
			data.forEach((d) => {
				arr.push(d.data())
			})

			setPosts(arr)
			setPageLoading(false)
		})()
	}, [page])

	const handleChange = (event, value) => {
		setPage(value)
	}

	return (
		<div className='h-screen pb-10 flex-1 pt-24 px-7 min-w-standard flex flex-col overflow-y-scroll'>
			<Stories
				loading={loading}
				stories={stories}
				userdata={userdata}
				user={user}
			/>
			{greetUser()}
			{pageLoading ? (
				<Loader className='mx-auto' color='inherit' />
			) : (
				<div className='flex flex-col gap-y-8'>
					{_map(posts, (post) => (
						<Post key={post.id} userdata={userdata} {...post} />
					))}
					<Pagination
						className='flex justify-center'
						color='primary'
						count={10}
						page={page}
						onChange={handleChange}
					/>
				</div>
			)}
		</div>
	)
}

export default React.memo(Feed)
