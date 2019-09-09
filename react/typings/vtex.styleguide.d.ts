declare module 'vtex.styleguide' {
  export const Input
  export const InputCurrency

  type InputCurrencyElement = Omit<HTMLInputElement, 'value'> & {
    value: number
  }

  export type InputCurrencyProps = {
    currencyCode: string
    defaultValue?: number
    errorMessage?: string
    locale: string
    onChange: React.ChangeEventHandler<InputCurrencyElement>
    placeholder?: string
    size?: string
    value?: number
  }

  type RadioGroupProps = {
    name: string
    onChange: React.ChangeEventHandler<HTMLButtonElement>
    options: {
      value: string | number
      label: string | React.ElementType | any
      disabled?: boolean
    }[]
    disabled?: boolean
    value?: RadioGroupProps['options'][0]['value']
  }

  export const RadioGroup: React.FC<RadioGroupProps>

  export class EXPERIMENTAL_Select extends React.Component<
    Record<string, unknown>
  > {}
}
