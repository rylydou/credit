import { defineConfig, presetUno, presetTypography, presetWebFonts } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
	theme: {
		colors: {
			fg: 'var(--fg)',
			bg: 'var(--bg)',
		}
	},
	presets: [
		presetUno({ dark: 'media' }),
		presetTypography(),
		presetWebFonts({
			provider: 'fontshare',
			fonts: {
				sans: ['General Sans', 'sans-serif'],
				mono: ['Nippo', 'monospace'], // 'JetBrains Mono'
			}
		}),
	],
	extractors: [
		extractorSvelte(),
	],
	transformers: [
		transformerVariantGroup(),
		transformerDirectives({
			applyVariable: ['--apply'],
		}),
	],
})
