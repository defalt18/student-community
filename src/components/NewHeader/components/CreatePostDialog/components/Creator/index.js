import React, { useCallback, useRef, useState } from 'react'
import _head from 'lodash/head'
import uuid from 'react-uuid'
import { uploadImageInDirectory } from 'services/user-utils'
import { createPost } from 'services/post-utils'
import Button from 'components/Button'
import TextEditor from 'components/TextEditor'
import { Photo } from 'components/Icons'
import { VIEWS } from '../../types'
import MediaContainer from '../../../../../Media'
import { useToggle } from 'react-use'
import PageLoader from '../../../../../PageLoader'

function Creator(props) {
	const { userdata, toggleView, toggle } = props

	const attachmentInput = useRef()

	const postData = React.useMemo(
		() => ({
			creator: {
				name: userdata?.username,
				image: userdata?.image
			},
			caption: '',
			image: '',
			performance: {
				comments: {},
				likes: {}
			},
			creatorId: userdata?.NO_ID_FIELD,
			timestamp: Date.now()
		}),
		[userdata]
	)

	const [caption, setCaption] = useState('')
	const [postImage, setAttachments] = useState(undefined)
	const [loading, toggleLoading] = useToggle(false)
	const handleChange = useCallback(
		(content, delta, source, editor) => {
			const html = editor.getHTML()
			setCaption(html)
		},
		[setCaption]
	)

	const onClick = useCallback(() => {
		attachmentInput.current.click()
	}, [attachmentInput])

	const onAttachmentUpload = useCallback(
		(_event) => {
			const image = _head(_event.target.files)
			setAttachments(image)
		},
		[setAttachments]
	)

	const onUploadPost = useCallback(async () => {
		const postID = uuid()
		if (caption !== `<p>Type Something</p>`) {
			toggleLoading()
			const imageURL = await uploadImageInDirectory('posts', postID, postImage)
			const postContent = {
				...postData,
				caption: caption,
				image: imageURL ?? '',
				id: postID
			}
			try {
				await createPost(postContent, postID)
			}
			catch (error) {
				console.log(error);
			}

			toggleView(VIEWS.Success)
		} else alert('Add a caption!')
	}, [postData, postImage, caption, toggleView, toggleLoading])

	if (loading) return <PageLoader type='loading' />

	return (
		<>
			<div className='flex justify-between items-center mb-4 w-full outline-none'>
				<p className='prompt-text text-white'>Create Post</p>
				<Button
					variant='outline'
					text='Discard'
					size='medium'
					callback={toggle}
				/>
			</div>
			<TextEditor
				className='rounded outline-none text-secondary text-white bg-header_blue mb-4 w-full'
				value={caption}
				onChange={handleChange}
				defaultValue='Type Something'
			/>
			{postImage && (
				<div className='border border-outline_dark border-opacity-40 p-3 rounded w-full mb-4'>
					<p className='text-secondary text-white mb-2'>Attached photo</p>
					<MediaContainer
						src={URL.createObjectURL(postImage)}
						className='rounded h-24 w-24 object-cover'
					/>
				</div>
			)}
			<div className='border border-outline_dark border-opacity-40 p-3 rounded w-full'>
				<p className='text-secondary text-white mb-2'>Add to your post :</p>
				<button
					className='bg-header_blue grid place-items-center rounded h-24 w-24'
					onClick={onClick}
				>
					<div>
						<Photo fill='#16213E' />
						<input
							ref={attachmentInput}
							type='file'
							className='hidden'
							accept='image/*'
							onChange={onAttachmentUpload}
						/>
						<p className='text-secondary text-outline_blue'>Photo</p>
					</div>
				</button>

			</div>
			<Button
				variant='filled'
				text='Upload Post'
				size='medium'
				className='mt-8'
				callback={onUploadPost}
			/>
		</>
	)

}
export default React.memo(Creator)
