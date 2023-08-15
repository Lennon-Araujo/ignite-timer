import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

export function History() {
  const { cycles } = useContext(CyclesContext)

  function formatDateToDayMonthAndTime(date: Date) {
    return format(date, "dd 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBr
    })
  }

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
                  <td 
                    title={formatDateToDayMonthAndTime(cycle.startDate)}  
                  >
                    {formatDistanceToNow(cycle.startDate, { addSuffix: true, locale: ptBr })}
                  </td>
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