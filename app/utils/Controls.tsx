export const handleKeyPress = (
  keyCode: number,
  currentDirection: string
): string => {
  switch (keyCode) {
    case 37: // Left arrow
      return 'LEFT';
    case 38: // Up arrow
      return 'UP';
    case 39: // Right arrow
      return 'RIGHT';
    case 40: // Down arrow
      return 'DOWN';
    default:
      return currentDirection;
  }
};
