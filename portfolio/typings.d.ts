declare module '*.module.css' {
  interface IClassName {
    [className: string]: string;
  }

  const classNames: IClassName;
  export default classNames;
}
