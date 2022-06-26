interface ClassNames {
  [className: string]: string
}

declare module '*.css?module' {
  const classNames: ClassNames
  export default classNames
}

declare module '*.module.css' {
  const classNames: ClassNames
  export default classNames
}
