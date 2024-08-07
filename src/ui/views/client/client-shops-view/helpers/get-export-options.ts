import { DefaultOptionType } from 'antd/es/cascader'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getExportOptionsForShopsView = (options: DefaultOptionType[]) => {
  const result: DefaultOptionType[] = options.map(item => ({
    label: item.label,
    value: item.value,
    children: [
      {
        label: t(TranslationKey.Products),
        value: 'INVENTORY',
      },
      {
        label: t(TranslationKey.Orders),
        value: 'ORDERS',
        children: [
          {
            label: 'On Amazon',
            value: 'true',
          },
          {
            label: 'PREP_CENTR_USA',
            value: 'false',
          },
        ],
      },
      {
        label: t(TranslationKey.Boxes),
        value: 'BOXES',
        children: [
          {
            label: 'On Amazon',
            value: 'true',
          },
          {
            label: 'PREP_CENTR_USA',
            value: 'false',
          },
        ],
      },
      {
        label: t(TranslationKey.Batches),
        value: 'BATCHES',
        children: [
          {
            label: 'On Amazon',
            value: 'true',
          },
          {
            label: 'PREP_CENTR_USA',
            value: 'false',
          },
        ],
      },
    ],
  }))

  return result
}
