import localForage from "localforage"
import { derived, get, writable } from 'svelte/store'

export const version_major = 1
export const version_minor = 0

export let store: LocalForage
export async function initialize(): Promise<void> {
	store = localForage.createInstance({
		name: 'Credit',
		storeName: 'session',
		driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE, localForage.WEBSQL],
	})
	await store.ready()
}
