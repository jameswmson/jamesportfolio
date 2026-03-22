import { createContext, useContext } from 'react'

export const HorizontalScrollContext = createContext(null)

export function useHorizontalScroll() {
  return useContext(HorizontalScrollContext)
}
