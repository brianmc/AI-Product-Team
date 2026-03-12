/**
 * QRCode — A self-contained QR code renderer.
 * Generates a minimal QR-code-like grid from a string value.
 * This is a visual mock that resembles a real QR code for demo purposes.
 * It is NOT a standards-compliant QR code encoder.
 */

function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededRandom(seed) {
  let s = seed
  return function () {
    s = Math.imul(1664525, s) + 1013904223
    return (s >>> 0) / 4294967296
  }
}

export default function QRCode({ value = 'HIGHFLYER', size = 160 }) {
  const MODULES = 25
  const QUIET = 2
  const TOTAL = MODULES + QUIET * 2
  const cellSize = size / TOTAL

  const seed = hashString(value)
  const rand = seededRandom(seed)

  // Build the module grid
  const grid = Array.from({ length: MODULES }, (_, row) =>
    Array.from({ length: MODULES }, (_, col) => {
      // Top-left finder pattern (7x7)
      if (row < 7 && col < 7) return finderPattern(row, col)
      // Top-right finder pattern
      if (row < 7 && col >= MODULES - 7) return finderPattern(row, col - (MODULES - 7))
      // Bottom-left finder pattern
      if (row >= MODULES - 7 && col < 7) return finderPattern(row - (MODULES - 7), col)
      // Timing patterns
      if (row === 6 || col === 6) return (row + col) % 2 === 0 ? 1 : 0
      // Data modules — seeded random to look consistent per booking ref
      return rand() > 0.5 ? 1 : 0
    })
  )

  const rects = []
  for (let r = 0; r < MODULES; r++) {
    for (let c = 0; c < MODULES; c++) {
      if (grid[r][c]) {
        const x = (c + QUIET) * cellSize
        const y = (r + QUIET) * cellSize
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            fill="#0D0D0D"
          />
        )
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`QR code for booking ${value}`}
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      {rects}
    </svg>
  )
}

function finderPattern(row, col) {
  // Outer border (ring 0): all on
  if (row === 0 || row === 6 || col === 0 || col === 6) return 1
  // Inner ring (1-5): off border
  if (row === 1 || row === 5 || col === 1 || col === 5) return 0
  // Centre 3x3: all on
  return 1
}
