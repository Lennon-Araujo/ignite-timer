import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

/*
React Hook Form
possui uma sintaxe estranha, mas funciona bem.
useForm retorna um objeto com algumas funções.
Usamos o register e handleSubmit, ambas funções.

Register é uma função que recebe no primeiro parâmetro o nome do identificar, e depois recebe em objeto com possíveis opções adicionais
uso: {...register("task-suggestions")}
Como a função register retorna um outro objeto com várias opções de uso, usamos aqui o spread operator para espalhar na tag TODAS as opções disponíveis para uso como propriedade para a tag
E  aqui estou falando de outras funções comuns, como OnBlur, OnChange, OnFocus, ref, required, max...

HandleSubmit é uma outra função, que recebe como parâmetro outra função.
E o uso disso é basicamente para triggar uma outra função durante o Submit
*/

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
})

// interface FormValues {
//   task: string;
//   minutesAmount: number;
// }

type NewCycleFormValues = zod.infer<typeof newCycleFormValidationSchema>

/*
Aqui deixei de usar a interface (normalmente usada pra criar do zero o tipo)
Para usar um type (normalmente usado pra extrair um tipo de outro local)
para integrar ao zod e aproveitar a extração de tipo direto da lib.
*/

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormValues>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const { handleSubmit, watch /*reset*/ } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>  
        <Countdown />

        {
          activeCycle ? (
            <StopCountdownButton onClick={interruptCurrentCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )
        }

      </form>
    </HomeContainer>
  )
}