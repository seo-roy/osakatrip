import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadAdultMode, saveAdultMode } from './adultMode'

interface AdultModeValue {
  adultMode: boolean
  setAdultMode: (on: boolean) => void
}

const AdultModeContext = createContext<AdultModeValue | null>(null)

export function AdultModeProvider({ children }: { children: ReactNode }) {
  const [adultMode, setAdultModeState] = useState(false)

  useEffect(() => {
    setAdultModeState(loadAdultMode())
  }, [])

  const setAdultMode = useCallback((on: boolean) => {
    setAdultModeState(on)
    saveAdultMode(on)
  }, [])

  const value = useMemo(
    () => ({ adultMode, setAdultMode }),
    [adultMode, setAdultMode],
  )

  return (
    <AdultModeContext.Provider value={value}>{children}</AdultModeContext.Provider>
  )
}

export function useAdultMode(): AdultModeValue {
  const ctx = useContext(AdultModeContext)
  if (!ctx) throw new Error('useAdultMode must be used within AdultModeProvider')
  return ctx
}
