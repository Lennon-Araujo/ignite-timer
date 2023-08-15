import { ReactNode, createContext, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    
    console.log(state);
    console.log(action);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (action.type === "CREATE_NEW_CYCLE") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      return [...state, action.payload.newCycle];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state;
  }, [])





  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId
      }
    })

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

    dispatch({
      type: "CREATE_NEW_CYCLE",
      payload: {
        newCycle
      }
    })

    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: "CREATE_NEW_CYCLE",
      payload: {
        activeCycleId
      }
    })

    // setCycles((state) => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // }))

    setActiveCycleId(null)
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