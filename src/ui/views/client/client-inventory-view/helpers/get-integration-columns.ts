export const getIntegrationColumns = (integrationTables: {
  [key: string]: { name: string; type: string } | { name: string; type: string }[]
}) => {
  const columns: { [key: string]: boolean } = {}

  if (integrationTables) {
    for (const table in integrationTables) {
      if (integrationTables[table]) {
        const currentTableColumns = integrationTables[table]

        if (Array.isArray(currentTableColumns)) {
          for (const column of currentTableColumns) {
            const currentField = table + column.name

            columns[currentField] = false
          }
        } else {
          const currentField = table + currentTableColumns.name
          columns[currentField] = false
        }
      }
    }
  }

  return columns
}
