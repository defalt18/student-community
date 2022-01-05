import React, { useState } from 'react'
import CreateStoryAndText from './CreateStoryAndText'
import Greetings from  '../../../../../../components/NewHeader/components/CreatePostDialog/components/Greetings'
import { VIEWS } from  '../../../../../../components/NewHeader/components/CreatePostDialog/types'
import { Smiley } from 'components/Icons'

function CreateStoryDialog(props) {
	const { toggle, userdata } = props
	const [view, toggleView] = useState(VIEWS.Creation)

	const renderContent = () => {
		switch (view) {
			case VIEWS.Creation:
				return (
					<CreateStoryAndText
						userdata={userdata}
						toggle={toggle}
						toggleView={toggleView}
					/>
				)

			case VIEWS.Success:
				return (
					<>
						<Smiley />
						<p className='prompt-h2 text-outline_blue mt-8 mb-3'>Yayy!!</p>
						<p className='prompt-h4 text-white'>Story successfully uploaded</p>
					</>
				)

			default:
				return null
		}
	}
	return (
		<div className='rounded bg-body_blue p-8 flex flex-col items-center border border-outline_blue border-opacity-40 w-525'>
			{renderContent(<Smiley/>)}
		</div>
	)
}

export default React.memo(CreateStoryDialog)
