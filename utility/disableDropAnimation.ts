import {
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'

/**
 * This function disables drop animation in drag and drop.
 * Drop animation is a little bit buggy.
 */
export default function disableDropAnimation(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  }
}
