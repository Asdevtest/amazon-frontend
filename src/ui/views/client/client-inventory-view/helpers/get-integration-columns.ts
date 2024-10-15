export const getIntegrationColumns = (integrationTables: { [key: string]: { name: string; type: string }[] }) => {
  const columns: { [key: string]: boolean } = {}

  if (integrationTables) {
    for (const table in integrationTables) {
      if (integrationTables[table]) {
        const currentTableColumns = integrationTables[table]

        for (const column of currentTableColumns) {
          const currentField = table + column.name

          columns[currentField] = false
        }
      }
    }
  }

  return columns
}
