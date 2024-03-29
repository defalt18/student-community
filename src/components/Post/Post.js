import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Firebase, db } from '../../lib/firebase.prod'
import { Link } from 'react-router-dom'
import { useAuthListener } from '../../hooks'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import _xor from 'lodash/xor'
import _map from 'lodash/map'
import { useAsync } from 'react-use'
import { getMinimalUserById } from '../../services/user-utils'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

const options = ['Delete']

const ITEM_HEIGHT = 48

function Post({ pid, lclss, usernm, text, img, likes, comments }) {
	const { user } = useAuthListener()
	const [comms, setComms] = useState([])
	const [conimg, setcon] = useState('')
	const [usrimg, setUsrimg] = useState('')
	const [commpost, setCommpost] = useState('')
	const [like, setlik] = useState([])
	const [val, setVal] = useState(false)
	const [dum, setd] = useState(0)

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		db.collection('posts')
			.doc(pid)
			.collection('comments')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setComms(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						comm: doc.data()
					}))
				)
			})

		db.collection('users')
			.doc(user?.uid)
			.onSnapshot((snapshot) => {
				setUsrimg(snapshot.data().image)
			})

		db.collection('users')
			.doc(user?.uid)
			.collection('likes')
			.onSnapshot((snapshot) => {
				setlik(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						likes: doc.data()
					}))
				)
			})

		for (let y = 0; y < like.length; y++) if (like[y].id === pid) setVal(true)

		db.collection('users')
			.doc(lclss)
			.onSnapshot((snapshot) => setcon(snapshot.data().image))

		setd(dum + 1)
	}, [conimg.length, like.length])

	function sendcomm() {
		if (commpost) {
			db.collection('posts').doc(pid).collection('comments').add({
				name: user.displayName,
				img: usrimg,
				text: commpost,
				timestamp: Firebase.firestore.FieldValue.serverTimestamp()
			})

			db.collection('users')
				.doc(lclss)
				.collection('Notifs')
				.add({
					text: user.displayName + ' commented on your post',
					timestamp: Firebase.firestore.FieldValue.serverTimestamp()
				})

			var m = Number(comments) + 1
			db.collection('posts')
				.doc(pid)
				.update({ comments: Number(m) })

			setCommpost('')
			document.getElementById('commbox').value = ''
		}
	}

	function likethepost() {
		var getbut = document.getElementsByClassName(pid)
		if (getbut[0] !== undefined) {
			var j = Number(likes) + 1

			db.collection('posts')
				.doc(pid)
				.update({ likes: Number(j) })

			db.collection('users')
				.doc(user.uid.toString())
				.collection('likes')
				.doc(pid)
				.set({ liked: 1 })

			db.collection('users')
				.doc(lclss)
				.collection('Notifs')
				.add({
					text: user.displayName + ' liked your post',
					timestamp: Firebase.firestore.FieldValue.serverTimestamp()
				})
		} else {
			var m = Number(likes) - 1
			db.collection('posts')
				.doc(pid)
				.update({ likes: Number(m) })

			db.collection('users')
				.doc(user.uid.toString())
				.collection('likes')
				.doc(pid)
				.delete()

			setVal(false)
		}
	}

	function opencomment() {
		var tp = document.getElementById(pid)
		if (tp.style.display === 'none') tp.style.display = 'flex'
		else tp.style.display = 'none'
	}

	return (
		<div style={{ position: 'relative' }}>
			<div
				className='appitem'
				style={{
					margin: '0',
					display: 'flex',
					borderRadius: '20px',
					flex: '1',
					padding: '0',
					overflow: 'hidden',
					boxShadow: '0 0 5px 0 rgba(0,0,0,0.75)'
				}}
			>
				<div
					className='postleft'
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						flex: '1',
						flexDirection: 'column',
						color: 'lightgray'
					}}
				>
					<div
						className='leftpost_head'
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.75rem',
							padding: '0.75rem',
							backgroundColor: 'rgba(0,0,0,0.5)',
							borderTopLeftRadius: '20px'
						}}
					>
						<Link
							to={`/profile/${lclss}`}
							style={{
								textDecoration: 'none',
								color: 'lightgray',
								display: 'flex',
								alignItems: 'center',
								gap: '0.75rem',
								borderTopLeftRadius: '20px'
							}}
						>
							<Avatar
								src={
									conimg !== ''
										? conimg
										: 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg'
								}
							/>
							<h4 style={{ margin: '0' }}>{usernm}</h4>
						</Link>
						{lclss === user.uid ? (
							<div style={{ marginLeft: 'auto' }}>
								<IconButton
									aria-label='more'
									aria-controls='long-menu'
									aria-haspopup='true'
									onClick={handleClick}
								>
									<MoreVertIcon style={{ color: 'white' }} />
								</IconButton>
								<Menu
									id='long-menu'
									anchorEl={anchorEl}
									keepMounted
									open={open}
									onClose={handleClose}
									PaperProps={{
										style: {
											maxHeight: ITEM_HEIGHT * 4.5,
											width: '15ch',
											background: 'rgba(55,55,55)'
										}
									}}
								>
									{options.map((option) => (
										<MenuItem
											onClick={() => {
												db.collection('posts').doc(pid).delete()
											}}
											style={{
												color: 'white',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												width: 'auto'
											}}
											key={option}
											selected={option === ''}
											onClick={handleClose}
										>
											<DeleteRoundedIcon
												onClick={() => {
													db.collection('posts').doc(pid).delete()
												}}
											/>{' '}
											<p
												onClick={() => {
													db.collection('posts').doc(pid).delete()
												}}
												style={{ margin: 0 }}
											>
												{option}
											</p>
										</MenuItem>
									))}
								</Menu>
							</div>
						) : (
							<></>
						)}
					</div>
					<div
						className='leftpost_middle'
						style={{ padding: ' 0 1rem', lineHeight: '1.5rem' }}
					>
						{/* <p style={{ textAlign: 'left' }}>{text}</p> */}
						<p
							dangerouslySetInnerHTML={{
								__html: `${text}`
							}}
						/>
					</div>
					<div className='space' style={{ height: '4rem' }}></div>
					<div
						className='leftpost_bottom'
						style={{
							display: 'flex',
							gap: '1rem',
							padding: '1rem',
							alignItems: 'center',
							position: 'absolute',
							bottom: '0',
							width: '100%'
						}}
					>
						{val ? (
							<FavoriteIcon onClick={likethepost} fontSize='medium' />
						) : (
							<FavoriteBorderOutlinedIcon
								className={pid}
								onClick={likethepost}
								fontSize='medium'
							/>
						)}
						<p style={{ margin: '0' }}>{likes}</p>
						<ChatBubbleOutlineIcon fontSize='medium' onClick={opencomment} />
						<p style={{ margin: '0' }}> {comms.length} </p>
					</div>
				</div>
				<div
					className='postright'
					style={{
						maxHeight: '30rem',
						padding: '0',
						maxWidth: '20rem',
						backgroundColor: 'black'
					}}
				>
					<img
						id='psimage'
						src={img === '' ? null : img}
						alt=''
						style={{
							objectFit: 'cover',
							height: '100%',
							width: '100%',
							borderTopRightRadius: '20px',
							borderBottomRightRadius: '20px'
						}}
					/>
				</div>
			</div>
			<div
				id={pid}
				className='appitem'
				style={{
					margin: '5px 0',
					display: 'none',
					flex: '1',
					padding: '0',
					overflow: 'auto',
					flexDirection: 'column',
					maxHeight: '40vh'
				}}
			>
				{comms.map(({ id, comm }) => (
					<div
						key={id}
						style={{
							display: 'flex',
							padding: '0px 10px',
							gap: '10px',
							alignItems: 'center',
							width: '100%'
						}}
					>
						<Avatar src={comm.img} style={{ height: '25px', width: '25px' }} />
						<p style={{ fontWeight: 'bold' }}>{comm.name}</p>
						<p>{comm.text}</p>
					</div>
				))}
				<div
					className='writecomm'
					style={{
						display: 'flex',
						padding: '10px',
						gap: '10px',
						alignItems: 'center',
						width: '100%',
						position: 'sticky',
						bottom: '0',
						background: 'rgba(17,17,18)'
					}}
				>
					<Avatar src={usrimg} style={{ height: '25px', width: '25px' }} />
					<input
						onChange={(e) => setCommpost(e.target.value)}
						type='text'
						id='commbox'
						value={commpost}
						placeholder='Write your comment here...'
						style={{
							width: '100%',
							color: 'white',
							border: 'none',
							background: 'none',
							padding: '5px'
						}}
					/>
					<button
						id='commbottom'
						onClick={sendcomm}
						style={{ display: 'none' }}
					></button>
					<label
						for='commbottom'
						id='sendbut'
						style={{
							marginLeft: 'auto',
							borderRadius: '10px',
							padding: '0px',
							border: '0px solid',
							color: 'white',
							background: 'transparent'
						}}
					>
						<SendRoundedIcon fontSize='small' style={{ cursor: 'pointer' }} />
					</label>
				</div>
			</div>
		</div>
	)
}

function TestPost({ postData, userdata }) {
	const {
		postId,
		caption,
		imageUrl = undefined,
		comments,
		likes,
		UID,
		username,
		timestamp
	} = postData

	const { value: postUser } = useAsync(() => getMinimalUserById(UID))

	const { user } = useAuthListener()

	const [comment, setComment] = useState({
		name: userdata?.firstname + ' ' + userdata?.lastname,
		text: ''
	})

	const [visibility, setVisibility] = useState(false)

	const onClickLike = React.useCallback(async () => {
		await db
			.collection('posts')
			.doc(postId)
			.update({ ...postData, likes: _xor(likes, [userdata.uid]) })
	}, [postId, postData, userdata, likes])

	const onClickComment = React.useCallback(async () => {
		comment.text !== '' &&
			(await db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.add(comment))
		setComment({ ...comment, text: '' })
	}, [postId, comment])

	const onCommentChange = React.useCallback(
		(event) => {
			const { value } = event.target
			setComment({ ...comment, text: value })
		},
		[setComment, comment]
	)

	const issueDelete = React.useCallback(async () => {
		await db.collection('posts').doc(postId).delete()
	}, [postId])

	const { data: postedComments } = useFirestoreCollectionData(
		useFirestore().collection('posts').doc(postId).collection('comments')
	)

	return (
		<>
			<div
				className='appitem'
				style={{
					margin: 0,
					overflow: 'hidden',
					borderRadius: 8,
					padding: 0,
					backgroundColor: '#23272a'
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: '10px',
						justifyContent: 'space-between'
					}}
				>
					<Link
						to={`/profile/${UID}`}
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<Avatar
							src={postUser?.image}
							style={{ marginRight: 10, height: 25, width: 25 }}
						/>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<span
								style={{
									color: 'white',
									fontWeight: 'bold',
									margin: 0,
									marginBottom: 0,
									fontSize: 'small'
								}}
							>
								{username}
							</span>
							<span style={{ margin: 0, color: 'gray', fontSize: 12 }}>
								{new Date(timestamp?.toDate()).toDateString()}
							</span>
						</div>
					</Link>
					{user?.uid === UID && (
						<div
							onClick={issueDelete}
							style={{
								padding: '5px 10px',
								borderRadius: 8,
								color: '#da4a5b',
								cursor: 'pointer',
								background: 'rgba(218,74,91,0.1)'
							}}
						>
							Delete
						</div>
					)}
				</div>
				<pre
					className='caption-text'
					style={{ margin: 0, marginBottom: 0, padding: '10px 15px' }}
				>
					{caption}
				</pre>
				{imageUrl && (
					<img
						src={imageUrl}
						style={{
							objectFit: 'cover',
							width: '100%',
							maxHeight: 250,
							marginBottom: 10,
							padding: '0 10px'
						}}
					/>
				)}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						paddingBottom: 10
					}}
				>
					<IconButton onClick={onClickLike} style={{ color: 'white' }}>
						{/*{ likes.includes(userdata?.id) > 0 ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon /> } */}
						<FavoriteBorderOutlinedIcon fontSize='small' />
					</IconButton>
					<span>{likes}</span>
					<IconButton style={{ color: 'white' }}>
						<ChatBubbleOutlineIcon
							fontSize='small'
							onClick={() => setVisibility(!visibility)}
						/>
					</IconButton>
					<span>{postedComments?.length}</span>
				</div>
				<div
					style={{ display: `${visibility ? '' : 'none'}`, padding: '0 15px' }}
				>
					<div>
						{_map(postedComments?.slice(0, 4), (comment, index) => (
							<div
								key={index}
								style={{
									display: 'flex',
									gap: 10,
									paddingBottom: 10
								}}
							>
								<p style={{ fontWeight: 'bold', margin: 0 }}>
									{comment.name} :
								</p>
								<p style={{ margin: 0 }}>{comment.text}</p>
							</div>
						))}
					</div>
					<div
						style={{
							display: 'flex',
							gap: 10,
							alignItems: 'center',
							backgroundColor: 'transparent',
							padding: '10px 0px'
						}}
					>
						<Avatar src={userdata?.image} style={{ height: 20, width: 20 }} />
						<input
							type='text'
							style={{
								border: 'none',
								background: 'transparent',
								color: 'white',
								width: '100%'
							}}
							onChange={onCommentChange}
							value={comment.comment}
							placeholder='Write a comment'
						/>
						<SendRoundedIcon
							onClick={onClickComment}
							style={{ marginLeft: 'auto' }}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default TestPost
