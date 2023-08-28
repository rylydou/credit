import { create_storage, type Storage } from '$lib/storage'
import { writable } from 'svelte/store'

export const version = 1

export let storage: Storage
export async function initialize(): Promise<void> {
	storage = create_storage({
		version,
		local_forage_options: { storeName: '_index', },
	})

	storage.track('next_id', next_id, 1)
	storage.load_all()
}

export const next_id = writable(1)
