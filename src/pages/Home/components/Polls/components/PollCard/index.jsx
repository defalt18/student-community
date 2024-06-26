import React, { useCallback } from 'react'
import _map from 'lodash/map'
import { useToggle } from 'react-use'
import Avatar from 'components/Avatar'
import { updatePoll } from 'services/poll-utils'
import _has from 'lodash/has'
import { useAuthListener } from 'hooks'
import { Link } from 'react-router-dom'
import { noop } from 'lodash'

function PollCard(props) {
	const { user } = useAuthListener()
	const { NO_ID_FIELD, userdata, ...pollContent } = props
	const { name, options, totalVotes, creator, performance, responses } =
		pollContent

	const [showResults, toggle] = useToggle(_has(responses, user.uid))
	const styles = useCallback(
		(option) => ({
			zIndex: -1,
			width: !showResults
				? '100%'
				: `${(performance[option] * 100) / totalVotes}%`
		}),
		[showResults, performance, totalVotes]
	)

	const answerPoll = useCallback(
		async (id) => {
			const perf = { ...performance, [id]: performance[id] + 1 }
			const updatedPoll = {
				...pollContent,
				performance: perf,
				totalVotes: totalVotes + 1,
				responses: { ...responses, [user.uid]: id }
			}
			await updatePoll(NO_ID_FIELD, updatedPoll)
			toggle()
		},
		[
			user.uid,
			responses,
			performance,
			totalVotes,
			toggle,
			NO_ID_FIELD,
			pollContent
		]
	)

	const onClick = React.useCallback(() => {
		return !showResults ? toggle : noop
	}, [toggle, showResults])

	return (
		<div className='bg-component_core bg-opacity-20 p-8 flex rounded'>
			<div className='w-7/12'>
				<p className='text-primary text-white mb-4' onClick={onClick}>
					{name}
				</p>
				<div className='flex flex-col gap-y-3'>
					{_map(options, (option) => (
						<div
							key={option}
							className={
								'p-2 px-4 w-full rounded text-secondary relative rounded z-0 flex items-center justify-between font-bold'
							}
						>
							<span>{option}</span>
							<button
								style={styles(option)}
								onClick={() => answerPoll(option)}
								disabled={showResults}
								className='bg-header_blue absolute top-0 bottom-0 left-0 right-0 p-2 rounded'
							/>
							{showResults && (
								<span>
									{Math.round((performance[option] * 100) / totalVotes)}%
								</span>
							)}
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col ml-auto'>
				<div className='bg-header_blue py-2 px-5 rounded text-center'>
					{totalVotes} votes
				</div>
				<Link
					to={`/${creator.uid}/new-profile`}
					className='mt-auto text-outline_blue flex gap-x-4 items-center'
				>
					<span className='text-secondary-03'>Uploaded by {creator.name}</span>
					<Avatar src={creator.image} variant='normal' size='small' />
				</Link>
			</div>
		</div>
	)
}

export default React.memo(PollCard)
