<script lang="ts">
	let zoom = 1;
	let pan = { x: 0, y: 0 };
	let isPanning = false;

	const ZOOM_SPEED = 0.005;
	const MIN_ZOOM = 0.3;
	const MAX_ZOOM = 2.5;

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		const { clientX, clientY, deltaY } = event;
		const oldZoom = zoom;

		const zoomFactor = 1 - deltaY * ZOOM_SPEED;
		zoom = Math.max(MIN_ZOOM, Math.min(zoom * zoomFactor, MAX_ZOOM));

		pan.x = clientX - (clientX - pan.x) * (zoom / oldZoom);
		pan.y = clientY - (clientY - pan.y) * (zoom / oldZoom);
	}

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
</script>

<div
	class="viewport"
	on:wheel={handleWheel}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:mouseleave={handleMouseUp}
	on:mousemove={handleMouseMove}
>
	<div
		class="canvas"
		style="transform: translate({pan.x}px, {pan.y}px) scale({zoom});"
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