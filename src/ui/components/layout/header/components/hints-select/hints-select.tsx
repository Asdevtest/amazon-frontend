import { observer } from 'mobx-react'
import { FC, useContext, useMemo } from 'react'
import { RiInformationLine, RiInformationOffLine } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HintsContext } from '@contexts/hints-context'

export const HintsSelect: FC = observer(() => {
  const { hints, setHints } = useContext(HintsContext)

  const icon = hints ? <RiInformationLine size={22} /> : <RiInformationOffLine size={22} />
  const text = useMemo(() => t(TranslationKey[hints ? 'Hints included' : 'Hints are off']), [hints])
  const type = hints ? 'link' : 'text'

  const handleChangeHints = () => setHints(!hints)

  return (
    <CustomButton type={type} icon={icon} onClick={handleChangeHints}>
      {text}
    </CustomButton>
  )
})
