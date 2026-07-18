import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Scroll-reveal that ENHANCES an already-visible default (DESIGN.md motion).
 * The element renders visible; only after mount (and only when motion is
 * allowed) is it armed for the entrance, so headless/SEO/reduced-motion
 * contexts always see full content.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) return // already in view: no arming
    el.setAttribute('data-armed', '')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal--in')
            io.disconnect()
          }
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  )
}
