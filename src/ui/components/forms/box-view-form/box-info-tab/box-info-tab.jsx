import { memo, useState } from 'react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'

import { calcFinalWeightForBox } from '@utils/calculation'

export const BoxInfoTab = memo(({ box, volumeWeightCoefficient, calcFinalWeightForBoxFunction }) => {
  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const finalWeightForBox = calcFinalWeightForBoxFunction
    ? calcFinalWeightForBoxFunction(box, volumeWeightCoefficient)
    : calcFinalWeightForBox(box, volumeWeightCoefficient)
  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
  const weightSizesType = getWeightSizesType(sizeSetting)

  return <div>BoxInfoTab</div>
})
