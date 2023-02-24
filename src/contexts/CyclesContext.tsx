import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { addNewCycle, interruptCurrentCycle } from '../reducers/cycles/actions'
import { cyclesInitialState, cyclesReducer } from '../reducers/cycles/reducer'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    cyclesInitialState,
    (initialState) => {
      const stateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

      if (stateJSON) {
        return JSON.parse(stateJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle?.startDate) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

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

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

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
