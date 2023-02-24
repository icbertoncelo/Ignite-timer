import { createContext, ReactNode, useReducer, useState } from 'react'
import { addNewCycle, interruptCurrentCycle } from '../reducers/cycles/actions'
import { cyclesReducer } from '../reducers/cycles/reducer'

interface CreateNewCycleFormData {
  task: string
  minutesAmount: number
}

export interface Cycle {
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function onCreateNewCycle({ task, minutesAmount }: CreateNewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycle(newCycle))

    setAmountSecondsPassed(0)
  }

  function onInterruptCycle() {
    dispatch(interruptCurrentCycle())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinished())
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
