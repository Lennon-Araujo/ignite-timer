export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[],
  activeCycleId: string | null;
}

export enum ActionTypes {
  CREATE_NEW_CYCLE = "CREATE_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED"
}

export function cyclesReducer(state: CyclesState, action: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (action.type === ActionTypes.CREATE_NEW_CYCLE) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    }

    if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptDate: new Date() }
            } else {
              return cycle
            }
          }),
        activeCycleId: null
      }
    }

    if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
        activeCycleId: null,
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state;
  }