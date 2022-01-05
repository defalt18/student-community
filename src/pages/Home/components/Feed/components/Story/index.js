import React, { useCallback, useRef } from 'react'
import { CircularProgress as Loader } from '@material-ui/core'
import _map from 'lodash/map'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import _head from 'lodash/head'
import uuid from 'react-uuid'
import { createStory } from 'services/story-utils'
import { useToggle } from 'react-use'
import Dialog from 'components/Dialog'
import CreateStoryDialog from './createStoryDialog'
import { Smiley } from 'components/Icons'
 import CreatePostDialog from '../../../../../../components/NewHeader/components/CreatePostDialog'

function Stories(props) {
	const { stories, loading, userdata, user } = props
	// const { NO_ID_FIELD: uid } = userdata
	// const inputRef = useRef()
	// const [, setImage] = React.useState(null)
	const [postAction, toggle] = useToggle(false)

	
	// const storyData = React.useMemo(
	// 	() => ({
	// 		id: uuid(),
	// 		creator: {
	// 			name: userdata?.username,
	// 			image: userdata?.image,
	// 			uid: uid
	// 		},
	// 		image: null,
	// 		timestamp: Date.now()
	// 	}),
	// 	[userdata?.username, userdata?.image, uid]
	// )

	// const onCreate = useCallback(
	// 	async (files) => {
	// 		if (files) {
	// 			const storyContent = { ...storyData, image: files }
	// 			await createStory(storyContent.id, storyContent)
	// 		} else alert('add an image')
	// 	},
	// 	[storyData]
	// )

	const onClickStory = useCallback((storyId) => {
		const shareTab = window.open(`/show/stories/${storyId}`, '_blank')
		shareTab.focus()
	}, [])

	// const handleChange = useCallback(
	// 	(_event) => {
	// 		const files = _head(_event.target.files)
	// 		setImage(files)
	// 		onCreate(files)
	// 	},
	// 	[setImage, onCreate]
	// )

	const isPosted = useCallback(
		(storyList) => {
			for (let story in storyList) {
				if (storyList[story]?.creator?.uid === user?.uid) return 1
			}
			return 0
		},
		[user?.uid]
	)

	// const onPrompt = useCallback(() => {
	// 	inputRef.current.click()
	// }, [inputRef])

	return (
		<div className='p-5 bg-component_blue rounded'>
			<div className='flex flex-row gap-x-4 overflow-x-scroll text-white items-center w-full'>
				{loading ? (
					<Loader className='mx-auto' color='inherit' />
				) : (
					<>
						{!isPosted(stories) && (
							<Button
							 text='Create Story'
							 	callback={toggle}
							 	className='flex flex-col gap-y-3 items-center'
							 >

								{/* <input
									ref={inputRef}
									type='file'
									accept='image/*'
									className='hidden'
									onChange={handleChange}
								/> */}
								
								<Avatar src={userdata.image} variant='story' size='medium' />
								<p className='text-secondary-03 text-white truncate'>
									{userdata.username}
								</p>
							</Button>
							
						)}
						{_map(stories, (story) => (
							<Button
								key={story.id}
								className='flex flex-col gap-y-3 items-center'
								callback={() => onClickStory(story.id)}
							>
								<Avatar
									src={story.creator.image}
									variant='display'
									size='medium'
								/>
								<p className='text-secondary-03 text-white truncate'>
									{story.creator.name}
								</p>
							</Button>
						))}
					</>
				)}
				{postAction && (
				<Dialog open={postAction} toggle={toggle}  >
					<CreateStoryDialog toggle={toggle}  userdata={userdata} />
				</Dialog>
			)}
		
			</div>
		</div>
	)
}

export default React.memo(Stories)
