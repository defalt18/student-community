import React, { useState } from 'react'

import Sidebar from 'components/NewSidebar'
import Header from 'components/NewHeader'
import { VIEWS } from './fixtures/home-model'

import useHomeData from './hooks/useHomeData'
import PageLoader from 'components/PageLoader'
import { useToggle } from 'react-use'
import Dialog from 'components/Dialog'
import _isEmpty from 'lodash/isEmpty'
import { useLocation } from 'react-router-dom'
import Greetings from './components/Greetings'

const Feed = React.lazy(() => import('./components/Feed'))
const UpcomingEvent = React.lazy(() => import('./components/EventFeed'))
const Clubs = React.lazy(() => import('./components/Clubs'))
const Polls = React.lazy(() => import('./components/Polls'))
const Events = React.lazy(() => import('./components/Events'))
const Academic = React.lazy(() => import('./components/Academic'))

function NewHome(props) {
	const { user } = props
	const location = useLocation()
	const [greet, toggle] = useToggle(!_isEmpty(location.state))
	const [view, navigator] = useState(VIEWS.HOME)
	const { loading, events, polls, ...rest } = useHomeData()

	const renderContent = () => {
		switch (view) {
			case VIEWS.HOME:
				return (
					<>
						<Feed loading={loading} {...rest} user={user} />
						<UpcomingEvent
							loading={loading}
							events={events}
							userdata={rest?.userdata}
							user={user}
						/>
					</>
				)

			case VIEWS.CLUBS:
				return <Clubs content={rest?.clubs} />

			case VIEWS.ACADEMIC:
				return <Academic />

			case VIEWS.POLL:
				return (
					<Polls loading={loading} polls={polls} userdata={rest?.userdata} />
				)

			case VIEWS.EVENTS:
				return (
					<Events loading={loading} events={events} userdata={rest?.userdata} />
				)

			default:
				return null
		}
	}
	return (
		<>
			<div className='w-screen min-h-screen bg-body_blue flex'>
				<Header />
				<Sidebar view={view} navigator={navigator} />
				{loading ? (
					<PageLoader type='home' />
				) : (
					<React.Suspense fallback={<PageLoader type='home' />}>
						{renderContent()}
					</React.Suspense>
				)}
			</div>
			<Dialog open={greet} toggle={toggle}>
				<Greetings toggle={toggle} />
			</Dialog>
		</>
	)
}

export default React.memo(NewHome)
