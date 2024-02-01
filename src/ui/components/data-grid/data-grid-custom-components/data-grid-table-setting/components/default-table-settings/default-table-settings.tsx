import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'

import { t } from '@utils/translations'

import { useStyles } from './default-table-settings.style'

import { IColumsBtnSettings } from '../../type'

interface DefaultTableSettingsProps {
  columsBtnSettings: IColumsBtnSettings
  nameSearchValue: string
}

export const DefaultTableSettings: FC<DefaultTableSettingsProps> = memo(({ columsBtnSettings, nameSearchValue }) => {
  const { classes: styles } = useStyles()

  const { columnsModel, columnVisibilityModel, onColumnVisibilityModelChange } = columsBtnSettings

  const isSomeItemChecked = columnVisibilityModel && Object.values(columnVisibilityModel).some(el => el === false)

  const itemsForRender = columnsModel.filter(item =>
    item?.headerName?.toLowerCase()?.includes(nameSearchValue?.toLowerCase()),
  )

  const onClickAllItemBtn = () =>
    onColumnVisibilityModelChange(columnsModel.reduce((ac, cur) => ({ ...ac, [cur?.field]: isSomeItemChecked }), {}))

  const onClickChangeVisibility = (field: string, value: boolean) =>
    onColumnVisibilityModelChange({
      ...columnVisibilityModel,
      [field]: value,
    })

  return (
    <div className={styles.parametersWrapper}>
      <Checkbox checked={!columnVisibilityModel || !isSomeItemChecked} onChange={onClickAllItemBtn}>
        <p title={t(TranslationKey.All)} className={styles.parameterTitle}>
          {t(TranslationKey.All)}
        </p>
      </Checkbox>

      {itemsForRender.map((el, index) => (
        <Checkbox
          key={index}
          checked={!columnVisibilityModel || columnVisibilityModel?.[el?.field]}
          onChange={event => onClickChangeVisibility(el.field, event.target.checked)}
        >
          {el.headerName}
        </Checkbox>
      ))}
    </div>
  )
})
