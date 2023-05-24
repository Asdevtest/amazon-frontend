export const renderSettingsRuLabelByKey = key => {
  switch (key) {
    case 'sellerBoard_warehouseReportUrlEveryDay':
      return 'Ссылка на ежедневный отчет селлерборда'

    case 'sellerBoard_dashboardUrlLast30Days':
      return 'Ссылка на месячный отчет селлерборда'

    default:
      return key
  }
}
