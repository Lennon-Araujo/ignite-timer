import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
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
            {
              cycles.map(cycle => {
                return (
                  <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} {cycle.minutesAmount > 1 ? "minutos" : "minuto"}</td>
                  <td>{cycle.startDate.toISOString()}</td>
                  <td>
                    { cycle.finishedDate && <Status statusColor="green">Concluído</Status> }
                    { cycle.interruptDate && <Status statusColor="red">Interrompido</Status> }
                    { !cycle.finishedDate && !cycle.interruptDate && (<Status statusColor="yellow">Em andamento</Status>) }

                  </td>
                </tr>
                )
              })
            }

          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}