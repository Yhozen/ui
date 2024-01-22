"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"
import {
  Stepper,
  StepperFooter,
  StepperItem,
  useStepper,
} from "@/registry/new-york/ui/stepper"
import { toast } from "@/registry/new-york/ui/use-toast"

const steps = [
  { label: "Step 1", description: "Description 1" },
  { label: "Step 2", description: "Description 2" },
]

export default function StepperDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((step, index) => {
          if (index === 0) {
            return (
              <StepperItem key={index}>
                <FirstStepForm />
              </StepperItem>
            )
          }
          return (
            <StepperItem key={index}>
              <SecondStepForm />
            </StepperItem>
          )
        })}
        <StepperFooter>
          <MyStepperFooter />
        </StepperFooter>
      </Stepper>
    </div>
  )
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function FirstStepForm() {
  const { nextStep } = useStepper()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    nextStep()
    toast({
      title: "First step submitted!",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  )
}

function SecondStepForm() {
  const { nextStep } = useStepper()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    nextStep()
    toast({
      title: "Second step submitted!",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  )
}

function StepperFormActions() {
  const {
    activeStep,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    prevStep,
    resetSteps,
    steps,
  } = useStepper()

  return (
    <div className="flex items-center justify-end gap-2">
      {activeStep === steps.length ? (
        <>
          <Button onClick={resetSteps}>Reset</Button>
        </>
      ) : (
        <>
          <Button disabled={isDisabledStep} onClick={prevStep}>
            Prev
          </Button>
          <Button type="submit">
            {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
          </Button>
        </>
      )}
    </div>
  )
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper()

  if (activeStep !== steps.length) {
    return null
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  )
}