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

  export class EXPERIMENTAL_Select extends React.Component<
    Record<string, unknown>
  > {}
}
