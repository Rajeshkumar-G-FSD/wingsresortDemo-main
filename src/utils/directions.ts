const RESORT_ORIGIN = 'Wings Resort Ooty';

/** Builds a Google Maps driving-directions URL from the resort to the given destination. */
export const getDirectionsUrl = (destination: string): string =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(RESORT_ORIGIN)}&destination=${encodeURIComponent(`${destination}, Ooty`)}&travelmode=driving`;
