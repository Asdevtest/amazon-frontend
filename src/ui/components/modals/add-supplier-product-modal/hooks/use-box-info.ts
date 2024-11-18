import { Form, FormInstance, RadioChangeEvent } from 'antd'

import { getVolumeWeight } from '@utils/calculation'

import { Dimensions } from '@typings/enums/dimensions'

import { ICreateSupplierProduct } from '../add-supplier-product-modal.type'
import { getCoefficients } from '../helpers/get-coefficients'
import { getVolumeCoefficient } from '../helpers/get-volume-coefficient'

export const useBoxInfo = (form: FormInstance<ICreateSupplierProduct>, volumeWeightCoefficient: number) => {
  const boxInfoVolumeWeight = Form.useWatch<ICreateSupplierProduct, number>(values => {
    const volumeCoefficient = getVolumeCoefficient(values?.boxProperties?.dimensionType, volumeWeightCoefficient)

    return getVolumeWeight(
      {
        length: values?.boxProperties?.boxLengthCm,
        width: values?.boxProperties?.boxWidthCm,
        height: values?.boxProperties?.boxHeightCm,
      },
      volumeCoefficient,
    )
  }, form)

  const packageVolumeWeight = Form.useWatch<ICreateSupplierProduct, number>(values => {
    const volumeCoefficient = getVolumeCoefficient(values?.boxProperties?.dimensionType, volumeWeightCoefficient)

    return getVolumeWeight(
      {
        length: values?.lengthUnit,
        width: values?.widthUnit,
        height: values?.heightUnit,
      },
      volumeCoefficient,
    )
  }, form)

  const sizeSettingBoxInfo = Form.useWatch<ICreateSupplierProduct, Dimensions>(
    values => values?.boxProperties?.dimensionType,
    form,
  )
  const sizeSettingPackage = Form.useWatch<ICreateSupplierProduct, Dimensions>(
    values => values?.unitDimensionType,
    form,
  )

  const onChangeUnitsOption = (option: RadioChangeEvent) => {
    const newDimensionType = option.target.value
    const currentForm = form.getFieldsValue()

    if (newDimensionType === currentForm?.boxProperties?.dimensionType) {
      return
    }

    const { multiplier, weightMultiplier } = getCoefficients(newDimensionType)

    const currentBoxProperties = currentForm?.boxProperties

    form.setFieldsValue({
      boxProperties: {
        dimensionType: newDimensionType,
        boxLengthCm: currentBoxProperties?.boxLengthCm * multiplier || 0,
        boxWidthCm: currentBoxProperties?.boxWidthCm * multiplier || 0,
        boxHeightCm: currentBoxProperties?.boxHeightCm * multiplier || 0,
        boxWeighGrossKg: currentBoxProperties?.boxWeighGrossKg * weightMultiplier || 0,
      },
    })
  }

  const onChangePackageUnitsOption = (option: RadioChangeEvent) => {
    const newDimensionType = option.target.value
    const currentForm = form.getFieldsValue()

    if (newDimensionType === currentForm?.boxProperties?.dimensionType) {
      return
    }

    const { multiplier, weightMultiplier } = getCoefficients(newDimensionType)

    form.setFieldsValue({
      unitDimensionType: newDimensionType,
      lengthUnit: currentForm?.lengthUnit * multiplier || 0,
      widthUnit: currentForm?.widthUnit * multiplier || 0,
      heightUnit: currentForm?.heightUnit * multiplier || 0,
      weighUnit: currentForm?.weighUnit * weightMultiplier || 0,
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
