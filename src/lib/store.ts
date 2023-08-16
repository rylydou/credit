import { derived, writable } from 'svelte/store'
import Dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
Dayjs.extend(weekOfYear)

export const account_name = writable('Test account')

export const transactions = writable([
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
	{ name: 'Birthday money from Anita', amount: +170.00 },
	{ name: 'Unrailed! (on sale)', amount: -5.00 },
	{ name: 'Pikuniku (on sale)', amount: -3.00 },
	{ name: 'Tunic (on sale)', amount: -20.00 },
	{ name: 'Code camp summer work', amount: +225.00 },
])
export const amount = derived(transactions, (transactions) => {
	let sum = 0.00
	for (let transaction of transactions) {
		sum += transaction.amount
	}
	return sum
})

export const account_currency = writable('USD')
export const currency_format = derived(account_currency, (account_currency) => new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: account_currency,
}))
export const currency_format_signed = derived(account_currency, (account_currency) => new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: account_currency,
	signDisplay: 'exceptZero'
}))
