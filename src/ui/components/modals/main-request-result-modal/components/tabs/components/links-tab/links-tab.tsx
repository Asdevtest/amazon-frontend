import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SetFieldsAfterRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './links-tab.style'

interface LinksTabProps {
  isClient: boolean
  links: string[]
  setFieldsAfterRework: SetFieldsAfterRework
}

export const LinksTab: FC<LinksTabProps> = memo(props => {
  const { isClient, links, setFieldsAfterRework } = props

  const { classes: styles, cx } = useStyles()

  const [publicationLinks, setPublicationLinks] = useState<string[]>([])
  const [linkValue, setLinkValue] = useState('')

  useEffect(() => {
    if (links.length > 0) {
      setPublicationLinks(links)
    }
  }, [links])

  const handleAddLink = () => {
    if (linkValue) {
      setPublicationLinks([...publicationLinks, linkValue])
      setLinkValue('')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.links, { [styles.clientLinks]: isClient })}>
        {publicationLinks.map((link, index) => (
          <div key={index} className={styles.linkContainer}>
            <Input readOnly value={link} classes={{ root: styles.input }} />

            <CopyValue text={link} />
          </div>
        ))}
      </div>

      {!isClient ? (
        <div className={styles.addLinkContainer}>
          <button className={styles.button} onClick={handleAddLink}>
            <CustomPlusIcon className={styles.icon} />
            <span>{t(TranslationKey['Add link'])}</span>
          </button>

          <Input
            value={linkValue}
            placeholder={`${t(TranslationKey['Enter link'])}...`}
            classes={{ root: styles.input }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkValue(e.target.value)}
          />
        </div>
      ) : null}
    </div>
  )
})
