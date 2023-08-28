import type { AccountTransaction } from '$lib/models'
import { create_storage, type Storage } from '$lib/storage'
import { derived, get, writable } from 'svelte/store'

export const version = 1

export let storage: Storage
export async function initialize(): Promise<void> {
	storage = create_storage({
		version,
		local_forage_options: { storeName: 'test_account', },
	})

	storage.track('next_id', next_id, 1)
	storage.track('name', account_name, 'Unknown')
	storage.track('currency', account_currency, 'USD')
	storage.track('transactions', transactions, [])
	storage.track('default_as_income', default_as_income, false)
	storage.load_all()
}

export const next_id = writable(1)

export const account_name = writable('Test account')

export const transactions = writable<AccountTransaction[]>([])
export const amount = derived(transactions, (transactions) => {
	let sum = 0.00
	for (let transaction of transactions) {
		sum += transaction.amount
	}
	return sum
})

export const account_currency = writable('USD')
export const format = derived(account_currency, (account_currency) => new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: account_currency,
}))
export const format_signed = derived(account_currency, (account_currency) => new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: account_currency,
	signDisplay: 'exceptZero'
}))

export const format_group = derived(format, () => {
	const ch = get(format).format(1_337.69).charAt(2)
	console.log('Group format character', ch)
	return ch
})
export const format_point = derived(format, () => {
	const ch = get(format).format(1_337.69).charAt(6)
	console.log('Point format character', ch)
	return ch
})

export const default_as_income = writable(false)
