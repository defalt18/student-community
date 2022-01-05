import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Suggs from '../../Suggs'
import {
	Header,
	Sidebar,
	CarouselMain,
	CarouselAdd,
	Post
} from '../../components'
import './Home.css'
import Cal from '../../assets/images/Calendar.svg'
import Story from './Story'
import _isEmpty from 'lodash/isEmpty'
import Welcome from '../../components/Modal/WelcomeModal.js'
import Storycreate from './Storycreate'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import { useAsync } from 'react-use'
import { getUserDetailsById } from '../../services/user-utils'
import { fetchAllStories } from '../../services/story-utils'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

function Home({ imgs, user }) {
	const [stories, setStories] = useState(undefined)

	const { data: posts } = useFirestoreCollectionData(
		useFirestore().collection('posts').orderBy('timestamp', 'desc')
	)

	const { status, data: events } = useFirestoreCollectionData(
		useFirestore().collection('events').where('isFinished', '==', false)
	)

	const upcomingEvent = _orderBy(events, ['date'], ['desc'])[0]

	const { value: userdata } = useAsync(() => getUserDetailsById(user?.uid))

	useEffect(() => {
		const listener = fetchAllStories(setStories)
		return () => listener()
	}, [setStories])

	const shows = _find(stories ?? [], ({ id }) => user.uid === id)

	return (
		<div className='app'>
			<Header uimg={imgs} />
			<CssBaseline />
			<Sidebar />
			{userdata?.firstLogin ? <Welcome uid={user.uid} /> : <></>}
			<div className='appmain'>
				<div className='appleft'>
					<div style={{ margin: '20px', overflowX: 'scroll' }}>
						<div
							className='appitem welcome'
							style={{
								margin: 0,
								background: 'linear-gradient(to left, #141e30, #243b55)',
								boxShadow: '0 0 5px 0 rgba(0,0,0,0.75)'
							}}
						>
							<h1>
								{userdata?.firstLogin ? (
									<span> Welcome {userdata?.Name}</span>
								) : (
									<span> Welcome back {userdata?.Name}</span>
								)}
							</h1>
						</div>
						
						<div
							className='appitem'
							style={{
								margin: '20px 0',
								marginBottom: '10px',
								background: 'rgba(0,150,255,0.1)'
							}}
						>
							<div
								style={{
									background: 'transparent',
									display: 'flex',
									gap: '15px',
									width: '100%',
									flexWrap: 'no-wrap'
								}}
							>
								{shows ? <></> : <Storycreate img={imgs} />}
								{stories?.map(({ id, tale }) => (
									<Story key={id} storyData={tale} />
								))}
							</div>
						</div>
					</div>
					<div className='carouselItem' style={{ borderRadius: '25px' }}>
						<CarouselMain style={{ borderRadius: '25px' }} />
					</div>
					<div
						style={{
							display: 'flex'
						}}
					>
						<div style={{ width: '100%' }}>
							{_map(posts, (post, index) => (
								<div
									className='appitem'
									style={{
										padding: 0,
										background: 'transparent',
										margin: 15,
										borderRadius: 8
									}}
									key={index}
								>
									<Post
										postData={{ ...post, postId: post.NO_ID_FIELD }}
										userdata={userdata}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='appright'>
					<div className='wrapper-main'>
						<div
							className='carouselItem'
							style={{
								padding: 0,
								backgroundColor: 'transparent'
							}}
						>
							<div
								className='carouselItem'
								style={{ borderRadius: '25px', margin: 0 }}
							>
								<CarouselAdd style={{ borderRadius: '25px' }} />
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								gap: '10px',
								alignItems: 'center',
								margin: '0 20px'
							}}
						>
							<img src={Cal} alt='' height='35px' />
							<h2 style={{ margin: 0 }}>Upcoming Event</h2>
						</div>
						<div
							className='appitem'
							style={{
								padding: 0,
								overflow: 'hidden',
								position: 'relative',
								background: 'transparent',
								borderRadius: '10px'
							}}
						>
							<div
								style={{
									height: '100%',
									width: '2%',
									background: 'rgb(0,150,255)',
									position: 'absolute',
									left: 10,
									top: '0',
									borderRadius: '25px'
								}}
							></div>
							<div
								style={{
									padding: '0 1%',
									paddingLeft: '7%',
									paddingRight: '3%',
									width: '100%'
								}}
							>
								<div
									style={{
										background: 'rgba(0,150,255,0.1)',
										borderRadius: '10px',
										padding: '10px',
										margin: '0',
										width: '100%',
										display: 'flex',
										gap: '20px',
										alignItems: 'center'
									}}
								>
									{status === 'success' && !_isEmpty(upcomingEvent) ? (
										<>
											<img
												src={upcomingEvent[0].poster}
												style={{
													height: '100%',
													width: '25%',
													borderRadius: '10px'
												}}
											/>
											<div>
												<h3 style={{ margin: 0 }}>{upcomingEvent.name}</h3>
												<h4 style={{ margin: 0 }}>
													Venue : {upcomingEvent.venue}
												</h4>
												<h4 style={{ margin: 0 }}>
													Time : {upcomingEvent.time} hrs
												</h4>
											</div>
										</>
									) : (
										<h2>No Upcoming Events :(</h2>
									)}
								</div>
							</div>
						</div>
						<Suggs user={user} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Home)
