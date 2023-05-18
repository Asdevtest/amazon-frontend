import {
  calcFinalWeightForBox,
  calcFinalWeightForBoxByMoreActualWeight,
  calcVolumeWeightForBox,
} from '@utils/calculation'
import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const BatchWeightCalculationMethod = {
  BY_MORE_WEIGHT: 'BY_MORE_WEIGHT',
  BY_MORE_TOTAL_WEIGHT: 'BY_MORE_TOTAL_WEIGHT',
  BY_ACTUAL_WEIGHT: 'BY_ACTUAL_WEIGHT',
  BY_VOLUME_WEIGHT: 'BY_VOLUME_WEIGHT',
}

export const BatchWeightCalculationMethodByCode = {
  10: BatchWeightCalculationMethod.BY_MORE_WEIGHT,
  20: BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT,
  30: BatchWeightCalculationMethod.BY_ACTUAL_WEIGHT,
  40: BatchWeightCalculationMethod.BY_VOLUME_WEIGHT,
}

export const BatchWeightCalculationMethodByKey = objectFlip(BatchWeightCalculationMethodByCode, parseInt)

export const BatchWeightCalculationMethodTranslateKey = code => {
  switch (code) {
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_WEIGHT]:
      return TranslationKey['By more weight']
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT]:
      return TranslationKey['By more total weight']
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_ACTUAL_WEIGHT]:
      return TranslationKey['By actual weight']
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_VOLUME_WEIGHT]:
      return TranslationKey['By volume weight']
  }
}

export const getBatchWeightCalculationMethodForBox = (code, isActualGreaterTheVolume) => {
  switch (code) {
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_WEIGHT]:
      return calcFinalWeightForBox
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT]:
      return isActualGreaterTheVolume ? calcFinalWeightForBoxByMoreActualWeight : calcVolumeWeightForBox
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_ACTUAL_WEIGHT]:
      return calcFinalWeightForBoxByMoreActualWeight
    case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_VOLUME_WEIGHT]:
      return calcVolumeWeightForBox
  }
}

export const getBatchWeightCalculationMethodsData = () => [
  {
    methodStatus: BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_WEIGHT],
    name: t(
      BatchWeightCalculationMethodTranslateKey(
        BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_WEIGHT],
      ),
    ),
    finalWeightCalculationMethodForBox: calcFinalWeightForBox,
  },
  {
    methodStatus: BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT],
    name: t(
      BatchWeightCalculationMethodTranslateKey(
        BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT],
      ),
    ),
    finalWeightCalculationMethodForBox: calcFinalWeightForBox,
  },
  {
    methodStatus: BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_ACTUAL_WEIGHT],
    name: t(
      BatchWeightCalculationMethodTranslateKey(
        BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_ACTUAL_WEIGHT],
      ),
    ),
    finalWeightCalculationMethodForBox: calcFinalWeightForBoxByMoreActualWeight,
  },
  {
    methodStatus: BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_VOLUME_WEIGHT],
    name: t(
      BatchWeightCalculationMethodTranslateKey(
        BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_VOLUME_WEIGHT],
      ),
    ),
    finalWeightCalculationMethodForBox: calcVolumeWeightForBox,
  },
]
