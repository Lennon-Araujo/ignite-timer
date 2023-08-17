import { produce } from "immer";

import { ActionTypes } from "./actions";

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

export function cyclesReducer(state: CyclesState, action: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (action.type === ActionTypes.CREATE_NEW_CYCLE) {
      // Aqui passei a usar o immer, que abstrai o conceito de imutabilidade
      // lib externa, usei o produce dela, e a partir daí usei um draft pra inserir novos dados comumente em JS

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    }

    if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //       if (cycle.id === state.activeCycleId) {
      //         return { ...cycle, interruptDate: new Date() }
      //       } else {
      //         return cycle
      //       }
      //     }),
      //   activeCycleId: null
      // }

      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].interruptDate = new Date(),
        draft.activeCycleId = null
      })
    }

    if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //       if (cycle.id === state.activeCycleId) {
      //         return { ...cycle, finishedDate: new Date() }
      //       } else {
      //         return cycle
      //       }
      //     }),
      //   activeCycleId: null,
      // }

      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].finishedDate = new Date(),
        draft.activeCycleId = null
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state;
  }