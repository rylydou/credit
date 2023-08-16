<script lang="ts">
	// Reset CSS
	import '@unocss/reset/tailwind-compat.css'
	// Atomic CSS
	import 'uno.css'
	// Custom CSS
	import '$lib/styles.css'
</script>

<slot />

<style lang="postcss">
	:global(html) {
		--bg: white;
		--fg: black;
		--bg: #ffffe3;
		--fg: #10100e;

		--apply: select-none h-full font-sans bg-bg color-fg;

		-webkit-tap-highlight-color: transparent;
	}

	:global(body) {
		--apply: h-full;
	}
</style>
