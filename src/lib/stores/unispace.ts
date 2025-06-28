import { readable } from 'svelte/store';

const calculateUnispace = (node: HTMLElement): number => {
	const smallerDim = Math.min(node.clientWidth, node.clientHeight);
	return smallerDim / 3.4;
};

export const unispace = readable<number>(0, (set) => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return;
	}

	const body = document.body;

	const update = () => {
		set(calculateUnispace(body));
	};

	const resizeObserver = new ResizeObserver(update);
	resizeObserver.observe(body);

	update();

	return () => {
		resizeObserver.disconnect();
	};
});