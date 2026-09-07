import assert from 'node:assert/strict'
import test from 'node:test'
import { DRAG_THRESHOLD_PX, exceededDragThreshold } from '../src/graph/gesture'

test('normal touch jitter remains a tap', () => {
  assert.equal(exceededDragThreshold(100, 100, 101, 102), false)
  assert.equal(exceededDragThreshold(100, 100, 105, 105), false)
})

test('movement at or beyond the threshold starts a drag', () => {
  assert.equal(exceededDragThreshold(100, 100, 100 + DRAG_THRESHOLD_PX, 100), true)
  assert.equal(exceededDragThreshold(100, 100, 120, 115), true)
})
