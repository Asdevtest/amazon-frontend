import { inchesCoefficient, maxLengthInputInSizeBox, unitsOfChangeOptions } from '@constants/configs/sizes-settings'

import { toFixed } from '@utils/text'

export const maxBoxSizeFromOption = (sizeSetting, field) => {
  const maxValue =
    sizeSetting === unitsOfChangeOptions.US
      ? toFixed(maxLengthInputInSizeBox / inchesCoefficient)
      : maxLengthInputInSizeBox

  return field > maxValue
}
