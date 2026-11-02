import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-shell__glow" aria-hidden="true" />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
