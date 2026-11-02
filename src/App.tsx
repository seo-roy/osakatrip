import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { ItineraryPage } from './pages/ItineraryPage'
import { PackingPage } from './pages/PackingPage'
import { PlacePage } from './pages/PlacePage'
import { TransitPage } from './pages/TransitPage'
import { UsjPage } from './pages/UsjPage'
import { TripProvider } from './storage/TripContext'

export default function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="itinerary/:date" element={<ItineraryPage />} />
            <Route path="packing" element={<PackingPage />} />
            <Route path="usj" element={<UsjPage />} />
            <Route path="places/:placeId" element={<PlacePage />} />
            <Route path="transit" element={<TransitPage />} />
            <Route path="transit/:transitId" element={<TransitPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripProvider>
  )
}
