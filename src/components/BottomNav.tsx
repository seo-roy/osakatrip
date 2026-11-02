import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: '홈', end: true },
  { to: '/itinerary', label: '일정' },
  { to: '/usj', label: 'USJ' },
  { to: '/packing', label: '준비물' },
] as const

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={'end' in link ? link.end : false}
          className={({ isActive }) =>
            isActive ? 'bottom-nav__link is-active' : 'bottom-nav__link'
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
