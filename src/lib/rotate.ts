// lib/rotate.ts

export function getRotationAngle(
    orientation: string | number | null
    ):
        {
            rotation: number,
            flip: boolean
        }
    {
    
    if (typeof orientation === "number") {
      // Handle numeric orientation values
      switch (orientation) {
        case 1:
          return { rotation: 0, flip: false };  // No rotation, no flip
        case 2:
          return { rotation: 0, flip: true };   // No rotation, flipped horizontally
        case 3:
          return { rotation: 180, flip: false }; // 180 degrees rotation, no flip
        case 4:
          return { rotation: 180, flip: true };  // 180 degrees rotation, flipped horizontally
        case 5:
          return { rotation: 90, flip: true };   // 90 degrees clockwise, flipped horizontally
        case 6:
          return { rotation: 90, flip: false };  // 90 degrees clockwise, no flip
        case 7:
          return { rotation: 270, flip: true };  // 270 degrees counter-clockwise, flipped horizontally
        case 8:
          return { rotation: 270, flip: false }; // 270 degrees counter-clockwise, no flip
        default:
          return { rotation: 0, flip: false };  // Default: no rotation, no flip
      }
    }
  
// Handle string orientation values
switch (orientation?.toLowerCase()) {
    case "top-left":
      return { rotation: 0, flip: false };  // No rotation, no flip
    case "top-right":
      return { rotation: 0, flip: true };   // No rotation, flipped horizontally
    case "bottom-left":
      return { rotation: 180, flip: false }; // 180 degrees rotation, no flip
    case "bottom-right":
      return { rotation: 180, flip: true };  // 180 degrees rotation, flipped horizontally
    case "left-top":
      return { rotation: 90, flip: true };   // 90 degrees clockwise, flipped horizontally
    case "right-top":
      return { rotation: 90, flip: false };  // 90 degrees clockwise, no flip
    case "left-bottom":
      return { rotation: 90, flip: true };   // 90 degrees clockwise, flipped horizontally
    case "right-bottom":
      return { rotation: 90, flip: false };  // 90 degrees clockwise, no flip
    default:
      return { rotation: 0, flip: false };  // Default: no rotation, no flip
  }
  

  }
  