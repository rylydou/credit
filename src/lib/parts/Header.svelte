<script lang="ts">
	import { amount, format } from '$lib/store'

	$: segs = $format.format($amount).split('.', 2)
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
