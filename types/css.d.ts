// This file is used to provide TypeScript types for CSS modules
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// This helps TypeScript understand CSS module imports
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
