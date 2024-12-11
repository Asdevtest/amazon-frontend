import { Form, FormInstance, RadioChangeEvent } from 'antd'

import { getVolumeWeight } from '@utils/calculation'

import { Dimensions } from '@typings/enums/dimensions'

import { ICreateSupplierProductModal } from '../add-supplier-card-modal.type'
import { convertBoxProperties } from '../helpers/convert-box-properties'
import { getVolumeCoefficient } from '../helpers/get-volume-coefficient'

export const useBoxInfo = (form: FormInstance<ICreateSupplierProductModal>, volumeWeightCoefficient: number) => {
  const boxInfoVolumeWeight = Form.useWatch<ICreateSupplierProductModal, number>(({ boxProperties }) => {
    const volumeCoefficient = getVolumeCoefficient(boxProperties?.dimensionType, volumeWeightCoefficient)

    return getVolumeWeight(
      {
        length: boxProperties?.boxLengthCm,
        width: boxProperties?.boxWidthCm,
        height: boxProperties?.boxHeightCm,
      },
      volumeCoefficient,
    )
  }, form)

  const packageVolumeWeight = Form.useWatch<ICreateSupplierProductModal, number>(
    ({ lengthUnit, widthUnit, heightUnit, unitDimensionType }) => {
      const volumeCoefficient = getVolumeCoefficient(unitDimensionType, volumeWeightCoefficient)

      return getVolumeWeight(
        {
          length: lengthUnit,
          width: widthUnit,
          height: heightUnit,
        },
        volumeCoefficient,
      )
    },
  )

  const sizeSettingBoxInfo = Form.useWatch<ICreateSupplierProductModal, Dimensions>(
    ({ boxProperties }) => boxProperties?.dimensionType,
  )
  const sizeSettingPackage = Form.useWatch<ICreateSupplierProductModal, Dimensions>(
    ({ unitDimensionType }) => unitDimensionType,
  )

  const onChangeUnitsOption = (option: RadioChangeEvent) => {
    const newDimensionType = option.target.value
    const currentForm = form.getFieldsValue()

    if (newDimensionType === currentForm?.boxProperties?.dimensionType) {
      return
    }

    currentForm?.boxProperties

    const { length, width, height, weigh } = convertBoxProperties(newDimensionType, {
      length: currentForm?.boxProperties?.boxLengthCm,
      width: currentForm?.boxProperties?.boxWidthCm,
      height: currentForm?.boxProperties?.boxHeightCm,
      weigh: currentForm?.boxProperties?.boxWeighGrossKg,
    })

    form.setFieldsValue({
      boxProperties: {
        dimensionType: newDimensionType,
        boxLengthCm: length,
        boxWidthCm: width,
        boxHeightCm: height,
        boxWeighGrossKg: weigh,
      },
    })
  }

  const onChangePackageUnitsOption = (option: RadioChangeEvent) => {
    const newDimensionType = option.target.value
    const currentForm = form.getFieldsValue()

    if (newDimensionType === currentForm?.unitDimensionType) {
      return
    }

    const { length, width, height, weigh } = convertBoxProperties(newDimensionType, {
      length: currentForm?.lengthUnit,
      width: currentForm?.widthUnit,
      height: currentForm?.heightUnit,
      weigh: currentForm?.weighUnit,
    })

    form.setFieldsValue({
      unitDimensionType: newDimensionType,
      lengthUnit: length,
      widthUnit: width,
      heightUnit: height,
      weighUnit: weigh,
    })
  }

  return {
    boxInfoVolumeWeight,
    packageVolumeWeight,

    sizeSettingBoxInfo,
    sizeSettingPackage,

    onChangeUnitsOption,
    onChangePackageUnitsOption,
  }
}
