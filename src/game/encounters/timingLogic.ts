/** Whether the marker position (0-1) falls inside the success zone. */
export function isTimingHit (markerT: number, zoneStart: number, zoneEnd: number): boolean
{
    return markerT >= zoneStart && markerT <= zoneEnd;
}

/** Advances the marker one tick, bouncing between 0 and 1. */
export function advanceMarker (markerT: number, direction: 1 | -1, speed: number, deltaMs: number): { markerT: number; direction: 1 | -1 }
{
    let t = markerT + direction * speed * (deltaMs / 1000);
    let dir = direction;

    if (t >= 1) { t = 1; dir = -1; }
    if (t <= 0) { t = 0; dir = 1; }

    return { markerT: t, direction: dir };
}
