export declare global {
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql'

    const value: DocumentNode
    export default value
  }

  declare module '*.css' {
    interface CssClasses {
      [cssClass: string]: string
    }
    const content: CssClasses
    export default content
  }
}
