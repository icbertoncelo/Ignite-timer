import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryTableContainer, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  console.log(cycles)

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
            <tr>
              <td>Tarefa A</td>
              <td>20 minutos</td>
              <td>Há 5 minutos</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa A</td>
              <td>20 minutos</td>
              <td>Há 5 minutos</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa A</td>
              <td>20 minutos</td>
              <td>Há 5 minutos</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa A</td>
              <td>20 minutos</td>
              <td>Há 5 minutos</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryTableContainer>
    </HistoryContainer>
  )
}
