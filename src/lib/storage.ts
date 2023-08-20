import localforage from 'localforage'
import { get } from 'svelte/store'
import type { Writable } from 'svelte/types/runtime/store'

export interface Storage {
	magic: string
	version: number
	local_forage: LocalForage
	stores: Map<string, [Writable<any>, any]>

	readonly track: <T>(key: string, store: Writable<T>, fallback: T) => void
	readonly save: <T>(key: string, store: Writable<T>) => Promise<void>
	readonly load: <T>(key: string, store: Writable<T>, fallback: T) => void
	readonly save_all: () => Promise<void>
	readonly load_all: () => Promise<void>

	on_upgrade_needed?: (from: number, to: number) => boolean
}

export interface StorageOptions {
	local_forage_options?: LocalForageOptions
	magic?: string
	version?: number
}

export function create_storage(options: StorageOptions): Storage {
	options.local_forage_options = {
		name: 'Credit',
		driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
		...options.local_forage_options,
	}

	const local_forage = localforage.createInstance(options.local_forage_options)

	let storage: Storage = {
		local_forage,
		magic: options.magic || '__VERSION__',
		version: options.version || 1,
		stores: new Map(),

		track<T>(key: string, store: Writable<T>, fallback: T) {
			let is_initial = true
			store.subscribe(() => {
				if (is_initial) {
					is_initial = false
					return
				}
				this.save(key, store)
			})
			this.stores.set(key, [store, fallback])
		},

		async save<T>(key: string, store: Writable<T>) {
			const value = get(store)
			console.log('STORAGE: Saving', value, 'to', key)
			await this.local_forage.setItem<T>(key, value)
		},

		async load<T>(key: string, store: Writable<T>, fallback: T) {
			const value = await this.local_forage.getItem<T>(key) || fallback
			store.set(value)
		},

		async save_all() {
			for (let [key, [store, fallback]] of this.stores) {
				await this.save(key, store)
			}
		},

		async load_all() {
			console.log('STORAGE: Loading all tracked stores')
			const version = await this.local_forage.getItem<number>(this.magic) || 0
			if (version > this.version) {
				console.error('Cannot load stored data. The data is from a newer version')
				return
			}
			// TODO properly implement on_upgrade_needed error handling
			if (this.on_upgrade_needed) {
				for (let index = version; index < this.version; index++) {
					if (!this.on_upgrade_needed(index, index + 1)) break
				}
			}

			await this.local_forage.setItem(this.magic, this.version)

			for (let [key, [store, fallback]] of this.stores) {
				this.load(key, store, fallback)
			}
		},
	}
	return storage
}
