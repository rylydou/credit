<script lang="ts">
	import { amount, format, format_point } from '$lib/store/account'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

	const tween = tweened($amount, {
		duration: 1000,
		delay: 500,
		easing: cubicOut,
	})
	$: {
		$tween = $amount
	}

	$: segs = $format.format($tween).split($format_point, 2)
	$: whole = segs[0]
	$: fract = segs[1]
</script>

<header
	class="fixed top-0 z-100 flex justify-center items-center max-w-sm w-full h-16 p-4 bg-gradient-(linear from-bg to-transparent)"
>
	<h1 class="flex items-center drop-shadow drop-shadow-color-bg">
		<div class="font-mono">
			<span class="text-2xl">{whole}</span><span class="text-sm">.{fract}</span>
		</div>
	</h1>
</header>
