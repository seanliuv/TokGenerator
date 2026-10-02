export default defineBackground(() => {
	if (!import.meta.env.CHROME) return;

	const sidePanel = (
		browser as typeof browser & {
			sidePanel?: {
				setPanelBehavior: (options: { openPanelOnActionClick: boolean }) => Promise<void>;
			};
		}
	).sidePanel;

	void sidePanel?.setPanelBehavior({ openPanelOnActionClick: true }).catch((error: unknown) => {
		console.error('Failed to set side panel behavior', error);
	});
});
