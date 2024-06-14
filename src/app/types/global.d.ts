declare module '*.mp3'

declare module '@emoji-mart/react'

declare module '@mui/material/styles' {
  interface TypeBackground {
    main: string
  }
}

declare module 'react-highlight-words'
declare module 'favico.js'
declare module 'he'

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
