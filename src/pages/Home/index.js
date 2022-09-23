import React, { useState } from 'react'
import Feed from './components/Feed'
import UpcomingEvent from './components/EventFeed'
import Sidebar from 'components/NewSidebar'
import Header from 'components/NewHeader'
import { VIEWS } from './fixtures/home-model'
import Clubs from './components/Clubs'
import Academic from './components/Academic'
import Polls from './components/Polls'
import Events from './components/Events'
import useHomeData from './hooks/useHomeData'
import PageLoader from 'components/PageLoader'
import { useToggle } from 'react-use'
import Dialog from 'components/Dialog'
import _isEmpty from 'lodash/isEmpty'
import { useLocation } from 'react-router-dom'
import Greetings from './components/Greetings'

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
				{loading ? <PageLoader type='home' /> : renderContent()}
			</div>
			<Dialog open={greet} toggle={toggle}>
				<Greetings toggle={toggle} />
			</Dialog>
		</>
	)
}

export default React.memo(NewHome)