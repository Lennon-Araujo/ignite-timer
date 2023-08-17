import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextPropType {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextPropType) {
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    })
  // Aqui eu mudei de useState pra useReducer que pode controlar vários estados ao mesmo tempo
  // Sintaxe, recebe 2 parâmetros, o primeiro é função e o segundo é o inicial dos estados
  // Na função passamos 2 parâmetros também, o STATE e o ACTION.
  // O STATE são todos os estados que iremos controlar.
  // Na desestruturação em Array (assim como no useState) vamos colocar o nome da variável que receberá todos os estados usados.
  // Nesse caso, estou usando cyclesState, mas como já estava usando cycles e activeCycleId no restante do código, em seguida fiz a desestrutução de cyclesState criando variáveis cycles e activeCycleId para que continuassem sendo usadas
  // state então passa a ser um objeto que recebe os estados
  // o ACTION são as ações que serão disparadas, na desestruturação em Array, o segundo parametro será DISPATCH que literalmente será usado para DISPARAR as actions
  // o dispatch então vai ser usados onde usaríamos o setState, porém passando um objeto, com TYPE, com o nome da action e o PAYLOAD, com os datos que serão usados.
  // Então eu uso a função do useReducer pra capturar o disparo, e assim fazer o que eu quiser com os dados passados no payload.

  // Aqui, eu estou controlando as funções de Criar cycle, marcar como concluído e interromper ciclo.
  // Removi os states que controlavam os cycles, e o state que controlava o ID do cycle ativo (activeCycleId)
  // Controlando os dois com o reducer


  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  
  const { cycles, activeCycleId } = cyclesState;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())

    // setCycles((state) =>
    //   state.map(cycle => {
    //     if (cycle.id === activeCycleId) {
    //       setActiveCycleId(null)
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   })
    // )
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    // setCycles((state) => [...state, newCycle])
    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())

    // setCycles((state) => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // }))

    // setActiveCycleId(null)
  }


  return (
    <CyclesContext.Provider
      value={{
        cycles,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }} 
    >
      { children }
    </CyclesContext.Provider>
  )
}