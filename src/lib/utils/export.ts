import { toPng, toBlob } from 'html-to-image';

const EXPORT_OPTIONS = {
	pixelRatio: 4,
	quality: 1,
	skipFonts: false,
	// Exclude UI controls that overlap the card in the DOM
	filter: (node: HTMLElement) => {
		return !node.classList?.contains('export-exclude');
	}
} satisfies Parameters<typeof toPng>[1];

/**
 * Export the given DOM node as a PNG download.
 * Called twice: first to warm up font/image cache, second to capture.
 */
export async function exportAsPng(node: HTMLElement, filename = 'comment.png'): Promise<void> {
	// First pass: warms up SVG foreignObject font rendering cache
	await toPng(node, EXPORT_OPTIONS);
	// Second pass: actual capture
	const dataUrl = await toPng(node, EXPORT_OPTIONS);

	const link = document.createElement('a');
	link.download = filename;
	link.href = dataUrl;
	link.click();
}

/**
 * Copy the given DOM node as a PNG to the clipboard.
 */
export async function copyToClipboard(node: HTMLElement): Promise<void> {
	// First pass: warm up cache
	await toBlob(node, EXPORT_OPTIONS);
	// Second pass: actual capture
	const blob = await toBlob(node, EXPORT_OPTIONS);

	if (!blob) {
		throw new Error('Failed to generate image blob');
	}

	await navigator.clipboard.write([
		new ClipboardItem({ 'image/png': blob })
	]);
}
