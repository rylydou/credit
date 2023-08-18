import { derived, get, writable } from 'svelte/store'
import Dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
Dayjs.extend(weekOfYear)

export const account_name = writable('Test account')

export const transactions = writable([
	{ summary: 'Birthday money from Anita', amount: +170.00 },
	{ summary: 'Unrailed! (on sale)', amount: -5.00 },
	{ summary: 'Pikuniku (on sale)', amount: -3.00 },
	{ summary: 'Tunic (on sale)', amount: -20.00 },
	{ summary: 'Code camp summer work', amount: +225.00 },
])
export const amount = derived(transactions, (transactions) => {
	let sum = 0.00
	for (let transaction of transactions) {
		sum += transaction.amount
	}
	return sum
})

export const account_currency = writable('USD')
export const format = derived(account_currency, (account_currency) => new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: account_currency,
}))
export const format_signed = derived(account_currency, (account_currency) => new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: account_currency,
	signDisplay: 'exceptZero'
}))

export const format_group = derived(format, () => {
	return get(format).format(1_337.69).charAt(-3)
})
export const format_point = derived(format, () => {
	return get(format).format(1_337.69).charAt(1)
})
