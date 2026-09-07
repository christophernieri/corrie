export const DRAG_THRESHOLD_PX = 8

/** Distinguishes deliberate dragging from normal finger or pointer jitter. */
export function exceededDragThreshold(
  startX: number,
  startY: number,
  currentX: number,
  currentY: number,
) {
  return Math.hypot(currentX - startX, currentY - startY) >= DRAG_THRESHOLD_PX
}
