interface Props {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 14 }: Props) {
  const rounded = Math.round(rating)

  return (
    <div className="flex gap-0.5" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < rounded ? 'var(--color-gold)' : 'none'}
          stroke="var(--color-gold)"
          strokeWidth={1}
        >
          <path d="M10 1.5l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6-4.5-4.1 6-.7z" />
        </svg>
      ))}
    </div>
  )
}
