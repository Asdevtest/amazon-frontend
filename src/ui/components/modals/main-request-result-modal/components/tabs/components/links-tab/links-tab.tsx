import { ChangeEvent, FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IFields, SetFields } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './links-tab.style'

interface LinksTabProps {
  isClient: boolean
  fields: IFields
  setFields: SetFields
}

export const LinksTab: FC<LinksTabProps> = memo(props => {
  const { isClient, fields, setFields } = props

  const { classes: styles, cx } = useStyles()

  const [newLinkValue, setNewLinkValue] = useState('')

  const handleAddLink = () => {
    if (newLinkValue && !isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: [...(prevFields?.publicationLinks || []), newLinkValue],
      }))
      setNewLinkValue('')
    }
  }

  const handleChangeLink = (linkIndex: number, comment: string) => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: prevFields?.publicationLinks?.map((link, index) => (index === linkIndex ? comment : link)),
      }))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.links, { [styles.clientLinks]: isClient })}>
        {fields?.publicationLinks?.map((link, index) => (
          <div key={index} className={styles.linkContainer}>
            <Input
              readOnly={isClient}
              value={link}
              classes={{ root: styles.inputRoot, input: styles.input }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeLink(index, e.target.value)}
            />

            <CopyValue text={link} />
          </div>
        ))}
      </div>

      {!isClient ? (
        <div className={styles.addLinkContainer}>
          <Input
            value={newLinkValue}
            placeholder={`${t(TranslationKey['Enter link'])}...`}
            classes={{ root: styles.inputRoot, input: styles.input }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLinkValue(e.target.value)}
          />

          <button className={styles.button} onClick={handleAddLink}>
            <CustomPlusIcon className={styles.icon} />
            {t(TranslationKey['Add link'])}
          </button>
        </div>
      ) : null}
    </div>
  )
})
