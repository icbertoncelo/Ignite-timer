import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Cycle, CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryTableContainer, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  function renderStatus(cycle: Cycle) {
    if (cycle.finishedDate)
      return <Status statusColor="green">Concluído</Status>

    if (cycle.interruptedDate)
      return <Status statusColor="red">Interrompido</Status>

    return <Status statusColor="yellow">Em andamento</Status>
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryTableContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>{renderStatus(cycle)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryTableContainer>
    </HistoryContainer>
  )
}
