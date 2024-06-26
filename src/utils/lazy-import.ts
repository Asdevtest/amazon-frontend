export const lazyImport = (importPath: string, componentTitle: string) => {
  return () => import(importPath).then(module => ({ default: module[componentTitle] }))
}
