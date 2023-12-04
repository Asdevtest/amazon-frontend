import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IShortUser } from '@typings/master-user'

import { useStyles } from './announcement.style'

interface AnnouncementProps {
  title: string
  createdBy: IShortUser
}

export const Announcement: FC<AnnouncementProps> = memo(({ title, createdBy }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <>
      {createdBy ? (
        <div className={cx(styles.requestInformationWrapper, styles.thirdBlock)}>
          <p className={styles.sectionTitle}>{t(TranslationKey.Announcement)}</p>

          <div className={styles.announcementWrapper}>
            <div className={styles.announcementInfoSection}>
              <p className={styles.sectionTitle}>{t(TranslationKey['Announcement name'])}</p>
              <p className={styles.sectionText}>{title}</p>
            </div>
            <div className={styles.announcementInfoSection}>
              <p className={styles.sectionTitle}>{t(TranslationKey['Announcement creator'])}</p>

              <UserLink
                blackText
                withAvatar
                name={createdBy?.name}
                userId={createdBy?._id}
                customStyles={{ fontSize: 14, fontWeight: 400 }}
                customAvatarStyles={{ width: 19, height: 19 }}
                maxNameWidth={150}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.thirdBlock} />
      )}
    </>
  )
})
