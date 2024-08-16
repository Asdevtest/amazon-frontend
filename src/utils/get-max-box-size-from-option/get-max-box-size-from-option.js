import { inchesCoefficient, maxLengthInputInSizeBox, unitsOfChangeOptions } from '@constants/configs/sizes-settings'

import { toFixed } from '@utils/text'

export const maxBoxSizeFromOption = (sizeSetting, fieldValue) => {
  if (!fieldValue) {
    return false
  }

  const maxValue =
    sizeSetting === unitsOfChangeOptions.US
      ? toFixed(maxLengthInputInSizeBox / inchesCoefficient)
      : maxLengthInputInSizeBox

  return Number(fieldValue) > Number(maxValue)
}
