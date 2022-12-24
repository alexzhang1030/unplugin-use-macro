// Only for types
export {}
declare global {
  const useMacro: (macroName: string, macroBody: (...args: any[]) => void) => {}
}
