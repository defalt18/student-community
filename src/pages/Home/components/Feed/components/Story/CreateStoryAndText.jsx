import React, { useCallback, useRef, useState } from 'react'
import _head from 'lodash/head'
import uuid from 'react-uuid'
import { uploadImageInDirectory } from 'services/user-utils'
import { createPost } from 'services/post-utils'
import Button from 'components/Button'
import TextEditor from 'components/TextEditor'
import { Photo } from 'components/Icons'
import { VIEWS } from '../../../../../../components/NewHeader/components/CreatePostDialog/types'
import { createStory } from 'services/story-utils'
import _map from 'lodash/map'

function CreateStoryAndText(props) {

	const { userdata, user, toggleView, toggle  } = props
	const { NO_ID_FIELD: uid } = userdata
	const inputRef = useRef()
	const [disabled, setDisabled] = useState(false)
	const [active, setActive] = useState(1)
	const [caption, setCaption] = useState('')
	const [storyImage, setAttachments] = useState(null)

	const attachmentInput = useRef()

	const storyData = React.useMemo(
		() => ({
			id: uuid(),
			creator: {
				name: userdata?.username,
				image: userdata?.image,
				uid: uid
			},
			// image: null,
			timestamp: Date.now()
		}),
		[userdata?.username, userdata?.image,userdata?.caption, uid]
	)
	const onUploadStory =
	 useCallback(
		async (storyImage) => {
				const storyContent = { ...storyData, image: storyImage}
				try {
					await createStory(storyContent.id, storyContent)
				} catch (error) { console.log(error); }
				toggleView(VIEWS.Success)
		},
		[storyData]
	)
	const isPosted = useCallback(
		(storyList) => {
			for (let story in storyList) {
				if (storyList[story]?.creator?.uid === user?.uid) return 1
			}
			return 0
		},
		[user?.uid]
	)
	const onPrompt = useCallback(() => {
		inputRef.current.click()
	}, [inputRef])

	const onClick = useCallback(() => {
		attachmentInput.current.click()
	}, [attachmentInput])

	const onAttachmentUpload = useCallback(
		(_event) => {
			const images = _head(_event.target.files)
			setAttachments(images)
			setActive(2)
			setDisabled(true)
			// onUploadStory(images)
		},
		[setAttachments, onUploadStory]
	)

	const renderContent = () => {
		switch (active) {
			case 1:
				return (
					<>
					{caption !== ""?

						(<div className='border border-outline_dark border-opacity-40 rounded p-2 h-50 w-full'>
								<div>
									<p className='justify-items-center grid text-white'>Preview</p>
								</div>
								<div className='p-2 break-words text-sm m-1 text-center grid text-white bg-darker_blue h-72 max-h-full w-64'>

										<p dangerouslySetInnerHTML={{ __html: caption }}></p>

								</div>
					</div>
					):
					( 
					<div className='border border-outline_dark border-opacity-40 rounded p-2 text-sm m-2 grid justify-items-center text-white bg-header_blue w-full'>
						<p>Preview</p>
					</div>
					)}
					</>)


			case 2:
				return (
						<>
								
								{caption !== '' ?
							(
								<div className='border border-outline_dark border-opacity-40 rounded p-2 text-sm m-2 grid justify-items-center text-white bg-header_blue w-full'>
										<p>Preview</p>
										{storyImage && <img className='object-cover w-48'
										src={URL.createObjectURL(storyImage)} />}
								<p className='text-center overflow-x-scroll w-64' dangerouslySetInnerHTML={{ __html: caption }}></p>
								</div>
							):
							( 
							<div className='border border-outline_dark border-opacity-40 rounded p-2 text-sm m-2 grid justify-items-center text-white bg-header_blue w-full'>
							<p>Preview</p>
							{storyImage && 
							<img 
							className='object-cover w-48'
							src={URL.createObjectURL(storyImage)} />}
							{/* <p dangerouslySetInnerHTML={{ __html: caption }}></p> */}
							</div>
							)}
						</>)

			default:
				return null
		}
	}

	return (
		<>
		<div className='flex justify-between items-center mb-4 w-full'>
			<p className='prompt-text text-white'>Create Story</p>
			<Button
				variant='outline'
				text='Discard'
				size='medium'
				callback={toggle}
			/>
		</div>
		<div className='flex gap-4 p-2 rounded w-full'>
			<div className='flex flex-col w-full '>
			<div className='border border-outline_dark border-opacity-40 p-2 m-2 w-full'>
				<button
					className='bg-header_blue grid place-items-center rounded p-4 w-full'
					onClick={onClick}
					disabled={disabled}
				>
					{active === 2 ? (
						<p className='text-secondary text-outline_blue py-6'>Photo Selected</p>
					) : (
						<>
							<Photo fill='#16213E' />
							<input
								ref={attachmentInput}
								type='file'
								className='hidden'
								accept='image/*'
								onChange={onAttachmentUpload}
							/>
							<p className='text-secondary text-outline_blue'>Upload Photo</p>
						</>
					)}
				</button>
				</div>
				<div >
					<textarea 
					className='placeholder-blue-50 rounded border-outline_dark text-secondary text-white bg-header_blue mx-2 mt-2 h-40 p-2 w-full'
					rows="5"
					cols="15" 
					maxlength="50"
					placeholder="Type Something..."
					onChange={event => setCaption(event.target.value)}>

					</textarea>
					<p className='pl-7 text-xs text-outline_blue'>Max 50 characters allowed </p>
				</div>
   
			</div>
	 
			
			{renderContent()}
			
		</div>
		<Button
				variant='filled'
				text='Upload Story'
				size='medium'
				className='mt-8'
				callback={onUploadStory}
			/>  
	</>
	)
}

export default React.memo(CreateStoryAndText)
