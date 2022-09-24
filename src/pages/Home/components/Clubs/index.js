import React, { useCallback } from 'react'
import MediaContainer from 'components/Media'
import _map from 'lodash/map'
import Button from 'components/Button'
import { useHistory } from 'react-router-dom'

function Clubs(props) {
	const { content } = props
	const history = useHistory()

	const headToPage = useCallback(
		(id) => {
			history.push(`/${id}/new-profile`)
		},
		[history]
	)
	return (
		<div className='pt-32 text-white px-12 h-screen overflow-scroll pb-20 w-10/12 flex-1'>
			<div className='flex w-full'>
				<div className='w-1/2'>
					<p className='prompt-h2 text-darker_blue'>DAIICT</p>
					<p className='prompt-h2 text-darker_blue'>Clubs</p>
					<p className='text-secondary my-6'>
						Students take and learn the best available from the community itself
						making the campus a vibrant place to nurture and grow into. These
						little clubs make the college an organism as with its own city to
						breed into!
					</p>
				</div>
				<div className='w-1/2'>
					{/*Vector Image*/}
					<MediaContainer />
				</div>
			</div>
			<div className='mt-24 w-full'>
				<div className='grid grid-cols-3 gap-6'>
					{_map(content, (club) => (
						<div
							id={club.NO_ID_FIELD}
							className='bg-header_blue rounded p-3 flex flex-col items-center justify-center'
						>
							<MediaContainer src={club.image} className='h-60 object-cover' />
							<p className='text-primary text-white mb-6 mt-4'>
								{club.username}
							</p>
							<p className='text-secondary text-white self-center text-center w-8/12'>
								{club.bio}
							</p>
							<Button
								variant='outline'
								text='View club page'
								callback={() => headToPage(club.NO_ID_FIELD)}
								className='px-4 py-1 mt-8 text-secondary'
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default React.memo(Clubs)
