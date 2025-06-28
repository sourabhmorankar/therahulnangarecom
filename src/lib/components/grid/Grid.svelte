<script lang="ts">
	let zoom = 1;
	let pan = { x: 0, y: 0 };
	let isPanning = false;
	let initialPinchDistance = 0;

	const ZOOM_SPEED = 0.005;
	const MIN_ZOOM = 0.3;
	const MAX_ZOOM = 2.5;

	// --- Helper Function ---
	function getDistance(touches: TouchList): number {
		return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
	}

	// --- Mouse and Trackpad Wheel Controls ---
	function handleWheel(event: WheelEvent) {
		event.preventDefault();
		const { clientX, clientY, deltaX, deltaY, ctrlKey } = event;

		if (ctrlKey) {
			// Zooming with Ctrl + Scroll
			const oldZoom = zoom;
			const zoomFactor = 1 - deltaY * ZOOM_SPEED;
			zoom = Math.max(MIN_ZOOM, Math.min(zoom * zoomFactor, MAX_ZOOM));
			pan.x = clientX - (clientX - pan.x) * (zoom / oldZoom);
			pan.y = clientY - (clientY - pan.y) * (zoom / oldZoom);
		} else {
			// Panning with Scroll
			pan.x -= deltaX;
			pan.y -= deltaY;
		}
	}

	// --- Mouse Drag Controls ---
	function handleMouseDown() {
		isPanning = true;
	}

	function handleMouseUp() {
		isPanning = false;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isPanning) return;
		pan.x += event.movementX;
		pan.y += event.movementY;
	}

	// --- Touch Controls ---
	function handleTouchStart(event: TouchEvent) {
		if (event.touches.length === 2) {
			isPanning = false;
			initialPinchDistance = getDistance(event.touches);
		} else if (event.touches.length === 1) {
			isPanning = true;
		}
	}

	function handleTouchMove(event: TouchEvent) {
		if (event.touches.length === 2) {
			// Pinch to Zoom
			const newPinchDistance = getDistance(event.touches);
			const oldZoom = zoom;
			const zoomFactor = newPinchDistance / initialPinchDistance;

			zoom = Math.max(MIN_ZOOM, Math.min(oldZoom * zoomFactor, MAX_ZOOM));
			initialPinchDistance = newPinchDistance; // Update for continuous zoom

			// Center zoom on midpoint
			const midpointX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
			const midpointY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

			pan.x = midpointX - (midpointX - pan.x) * (zoom / oldZoom);
			pan.y = midpointY - (midpointY - pan.y) * (zoom / oldZoom);
		} else if (event.touches.length === 1 && isPanning) {
			// One-finger Pan
			const touch = event.touches[0];
			pan.x += touch.clientX - (touch.target as HTMLElement).offsetLeft;
			pan.y += touch.clientY - (touch.target as HTMLElement).offsetTop;
		}
	}

	function handleTouchEnd() {
		isPanning = false;
		initialPinchDistance = 0;
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="viewport"
	role="application"
	aria-label="Interactive portfolio grid"
	on:wheel={handleWheel}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:mouseleave={handleMouseUp}
	on:mousemove={handleMouseMove}
	on:touchstart|passive={handleTouchStart}
	on:touchmove|passive={handleTouchMove}
	on:touchend|passive={handleTouchEnd}
>
	<div
		class="canvas"
		style="transform: translate({pan.x}px, {pan.y}px) scale({zoom}); touch-action: none;"
	>
		<slot />
	</div>
</div>

<style>
	.viewport {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		cursor: grab;
		background-color: #f0f2f5;
		color: #111;
	}

	.viewport:active {
		cursor: grabbing;
	}

	.canvas {
		width: 100%;
		height: 100%;
		transform-origin: 0 0;
		background-image: radial-gradient(#d0d3d8 1px, transparent 1px);
		background-size: 20px 20px;
	}
</style>