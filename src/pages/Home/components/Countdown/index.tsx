import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    onChangeSecondsPassed,
  } = useContext(CyclesContext)

  const cycleTotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const cycleCurrentSeconds = activeCycle
    ? cycleTotalSeconds - amountSecondsPassed
    : 0

  const cycleMinutesAmount = Math.floor(cycleCurrentSeconds / 60)
  const cycleSecondsAmount = cycleCurrentSeconds % 60

  const cycleMinutesString = String(cycleMinutesAmount).padStart(2, '0')
  const cycleSecondsString = String(cycleSecondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSecondsBetweenNowAndStartDate = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (differenceInSecondsBetweenNowAndStartDate >= cycleTotalSeconds) {
          markCurrentCycleAsFinished()
          onChangeSecondsPassed(cycleTotalSeconds)
          clearInterval(interval)
        } else {
          onChangeSecondsPassed(differenceInSecondsBetweenNowAndStartDate)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    cycleTotalSeconds,
    markCurrentCycleAsFinished,
    onChangeSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{cycleMinutesString[0]}</span>
      <span>{cycleMinutesString[1]}</span>
      <Separator>:</Separator>
      <span>{cycleSecondsString[0]}</span>
      <span>{cycleSecondsString[1]}</span>
    </CountdownContainer>
  )
}
