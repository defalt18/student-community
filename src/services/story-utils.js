import { db, storage } from '../lib/firebase.prod'
import _reduce from 'lodash/reduce'
import { uploadImageInDirectory } from './user-utils'
import { differenceInDays } from 'date-fns'

const SUCCESS = 'Successful'

const deleteOldStories = async (storyIds) => {
	await _reduce(
		storyIds,
		async (_, id) => {
			await db.collection('stories').doc(id).delete()
		},
		[]
	)
	return SUCCESS
}

const isOld = (story) => {
	const { timestamp } = story.data()
	const current = new Date(Date.now())
	const storyTime = new Date(timestamp)
	const oldStory =
		(current.getTime() - storyTime.getTime()) / (1000 * 3600 * 24)
	return Math.floor(oldStory) > 0
}

export const fetchAllStories = (setter) => {
	// const collection = await db.collection('stories').get();
	let oldStories = []
	const listener = db
		.collection('stories')
		.orderBy('timestamp', 'desc')
		.onSnapshot((stories) =>
			setter(
				_reduce(
					stories.docs,
					(stories, story) => {
						if (!isOld(story))
							return [...stories, { id: story.id, tale: story.data() }]
						else {
							oldStories = [...oldStories, story.id]
							return [...stories]
						}
					},
					[]
				)
			)
		)
	deleteOldStories(oldStories).then(() => console.log('Old stories deleted'))
	return listener
}

export const createStory = async (storyID, storyData) => {
	const url = await uploadImageInDirectory('stories', storyID, storyData.image)
	try {
		await db
			.collection('stories')
			.doc(storyID)
			.set({ ...storyData, image: url })
	} catch (error) { console.log(error); }
}

export const deleteOldData = async (allStories) => {
	let data = []
	await allStories.reduce(async (finalStories, story) => {
		const isOld = differenceInDays(Date.now(), story.timestamp) > 0
		if (isOld) {
			const pictureRef = await storage.refFromURL(story.image)
			await pictureRef.delete()
			await db.collection('stories').doc(story.id).delete()
			return finalStories
		}
		data = [...data, story]
		return finalStories
	}, [])
	return data
}
