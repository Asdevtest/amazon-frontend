import { Divider, Form, FormInstance } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC, memo, useCallback } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './box-dimentions.style'

import { ICreateSupplierProductModal } from '../../add-supplier-card-modal.type'
import { useBoxInfo } from '../../hooks/use-box-info'
import { getBoxDimentionsRules } from '../../rules/get-box-dimentions-rules'
import { getUnitImagesRules } from '../../rules/get-unit-images-rules'
import { getUnitRules } from '../../rules/get-unit-rules'
import { BoxInfo } from '../box-info'

interface IBoxDimentionsProps {
  form: FormInstance<ICreateSupplierProductModal>
  unitImages: UploadFileType[]
  volumeWeightCoefficient: number
  disabled?: boolean
  handleUploadUnitFiles: (images: UploadFileType[]) => void
}

export const BoxDimentions: FC<IBoxDimentionsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const { disabled, form, volumeWeightCoefficient, unitImages, handleUploadUnitFiles } = props

  const {
    boxInfoVolumeWeight,
    packageVolumeWeight,

    sizeSettingBoxInfo,
    sizeSettingPackage,

    onChangeUnitsOption,
    onChangePackageUnitsOption,
  } = useBoxInfo(form, volumeWeightCoefficient)

  const isMultiplicity = Form.useWatch('multiplicity', form)

  const handleChangeIsMultiplicity = useCallback(
    (e: CheckboxChangeEvent) => form.setFieldValue('multiplicity', e.target.checked),
    [],
  )

  return (
    <div className={cx(styles.boxDimentionsWrapper, sharedStyles.sectionWrapper)}>
      <div className={styles.dimentionsWrapper}>
        <BoxInfo
          volumeWeight={boxInfoVolumeWeight}
          sizeSetting={sizeSettingBoxInfo}
          dimentionsHeaderTitle="Box info"
          dimentionName={['boxProperties', 'dimensionType']}
          heightName={['boxProperties', 'boxHeightCm']}
          widthName={['boxProperties', 'boxWidthCm']}
          lengthName={['boxProperties', 'boxLengthCm']}
          amountName={['boxProperties', 'amountInBox']}
          weighGrossName={['boxProperties', 'boxWeighGrossKg']}
          getRules={getBoxDimentionsRules}
          onChangeUnitsOption={onChangeUnitsOption}
        />

        <Form.Item<ICreateSupplierProductModal> name="multiplicity" className={sharedStyles.field}>
          <CustomCheckbox checked={isMultiplicity} onChange={handleChangeIsMultiplicity}>
            Use multiples of items when creating boxes
          </CustomCheckbox>
        </Form.Item>
      </div>

      <div>
        <Divider type="vertical" className={sharedStyles.divider} />
      </div>

      <div className={styles.dimentionsWrapper}>
        <BoxInfo
          volumeWeight={packageVolumeWeight}
          sizeSetting={sizeSettingPackage}
          dimentionsHeaderTitle="Package dimensions"
          dimentionName="unitDimensionType"
          heightName="heightUnit"
          widthName="widthUnit"
          lengthName="lengthUnit"
          weighGrossName="weighUnit"
          getRules={getUnitRules}
          onChangeUnitsOption={onChangePackageUnitsOption}
        />

        <Form.Item<ICreateSupplierProductModal>
          name="imageUnit"
          className={cx(sharedStyles.field, styles?.uploadFiles)}
          validateTrigger={['onChange', 'onBlur']}
          rules={getUnitImagesRules()}
        >
          <UploadFilesInput
            disabled={disabled}
            wrapperClassName={sharedStyles.uploadFilesInputWrapper}
            dragAndDropButtonHeight={50}
            images={unitImages}
            setImages={handleUploadUnitFiles}
          />
        </Form.Item>
      </div>
    </div>
  )
})
