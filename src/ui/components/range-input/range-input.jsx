import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './range-input.style'

const textConsts = getLocalizedTexts(texts, 'en').rangeInput

export const RangeInput = ({start, onChangeRangeStart, end, onChangeRangeEnd, className}) => {
  const classNames = useClassNames()

  const renderField = (label, value, onChange) => (
    <div className={classNames.field}>
      <Typography className={classNames.label}>{label}</Typography>
      <Input className={classNames.input} value={value} onChange={onChange} />
    </div>
  )

  return (
    <div className={clsx(classNames.root, className)}>
      {renderField(textConsts.start, start, onChangeRangeStart)}
      {renderField(textConsts.end, end, onChangeRangeEnd)}
    </div>
  )
}
