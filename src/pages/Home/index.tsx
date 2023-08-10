import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from "./styles";

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
type FormValues = {
  task: string;
  minutesAmount: number;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm<FormValues>({
    resolver: zodResolver(newCycleFormValidationSchema)
  });


  function handleCreateNewCycle(data: unknown) {
    console.log(data);
  }

  console.log(formState.errors);
  

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Projeto 4"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}