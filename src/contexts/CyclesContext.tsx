import { createContext, ReactNode, useState } from 'react'

interface CreateNewCycleFormData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  onChangeSecondsPassed: (secondes: number) => void
  onCreateNewCycle: (data: CreateNewCycleFormData) => void
  onInterruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState('')
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function onCreateNewCycle({ task, minutesAmount }: CreateNewCycleFormData) {
    const id = String(new Date().getTime())

    const cycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles((prevState) => [...prevState, cycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function onInterruptCycle() {
    setActiveCycleId('')

    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      }),
    )
  }

  function markCurrentCycleAsFinished() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }

        return cycle
      }),
    )
  }

  function onChangeSecondsPassed(secondes: number) {
    setAmountSecondsPassed(secondes)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        onChangeSecondsPassed,
        onCreateNewCycle,
        onInterruptCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
