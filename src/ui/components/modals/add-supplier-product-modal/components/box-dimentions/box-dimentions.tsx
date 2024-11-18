import { Divider, Form, FormInstance } from 'antd'
import { FC, memo } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './box-dimentions.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'
import { useBoxInfo } from '../../hooks/use-box-info'
import { BoxInfo } from '../box-info'

interface IBoxDimentionsProps {
  form: FormInstance<ICreateSupplierProduct>
  unitImages: UploadFileType[]
  volumeWeightCoefficient: number
  handleUploadUnitFiles: (images: UploadFileType[]) => void
}

export const BoxDimentions: FC<IBoxDimentionsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const { form, volumeWeightCoefficient, unitImages, handleUploadUnitFiles } = props

  const {
    boxInfoVolumeWeight,
    packageVolumeWeight,

    sizeSettingBoxInfo,
    sizeSettingPackage,

    onChangeUnitsOption,
    onChangePackageUnitsOption,
  } = useBoxInfo(form, volumeWeightCoefficient)

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
          onChangeUnitsOption={onChangeUnitsOption}
        />

        <Form.Item<ICreateSupplierProduct> name="multiplicity" className={sharedStyles.field}>
          <CustomCheckbox>{'Use multiples of items when creating boxes'}</CustomCheckbox>
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
          onChangeUnitsOption={onChangePackageUnitsOption}
        />

        <Form.Item<ICreateSupplierProduct>
          name="images"
          className={cx(sharedStyles.field, styles?.uploadFiles)}
          // rules={getRequiredRules()}
          validateTrigger={['onChange', 'onBlur']}
        >
          <UploadFilesInput dragAndDropButtonHeight={50} images={unitImages} setImages={handleUploadUnitFiles} />
        </Form.Item>
      </div>
    </div>
  )
})
