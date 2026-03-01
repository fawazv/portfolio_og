// Noise overlay has been removed — the SVG feTurbulence filter was a constant
// GPU compositing cost at opacity: 0.03 (visually imperceptible).
export default function NoiseOverlay() {
  return null;
}
