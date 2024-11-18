import { FC, memo } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'

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
    onColumnVisibilityModelChange(
      columnsModel.reduce((ac, cur) => {
        if (cur?.field === '__check__') {
          return ac
        }

        return { ...ac, [cur?.field]: isSomeItemChecked }
      }, {}),
    )

  const onClickChangeVisibility = (field: string, value: boolean) =>
    onColumnVisibilityModelChange({
      ...columnVisibilityModel,
      [field]: value,
    })

  return (
    <div className={styles.parametersWrapper}>
      <CustomCheckbox
        checked={!columnVisibilityModel || !isSomeItemChecked}
        labelClassName={styles.parameterTitle}
        onChange={onClickAllItemBtn}
      >
        All
      </CustomCheckbox>

      {itemsForRender.map((el, index) => (
        <div key={index} className={styles.checkboxWrapper}>
          <CustomCheckbox
            checked={columnVisibilityModel?.[el?.field] !== false}
            onChange={event => onClickChangeVisibility(el.field, event.target.checked)}
          />
          <p className={styles.parameterTitle}> {el?.headerName}</p>
        </div>
      ))}
    </div>
  )
})
