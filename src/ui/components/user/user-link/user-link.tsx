import { ClassNamesArg, cx } from '@emotion/css'
import { FC, memo } from 'react'

import { Avatar, Link, Tooltip, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { UserModel } from '@models/user-model'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './user-link.style'

interface UserLinkProps {
  name?: string
  userId?: string
  blackText?: boolean
  blueText?: boolean
  rating?: number
  ratingSize?: 'large' | 'medium' | 'small'
  maxNameWidth?: number
  withAvatar?: boolean
  notShowName?: boolean
  customClassNames?: ClassNamesArg
  customAvatarStyles?: React.CSSProperties
  customStyles?: React.CSSProperties
  isShortRating?: boolean
  customRatingClass?: React.CSSProperties
  readOnlyRating?: boolean
}

export const UserLink: FC<UserLinkProps> = memo(
  ({
    name,
    userId,
    blackText,
    blueText,
    withAvatar,
    rating,
    ratingSize,
    notShowName,
    maxNameWidth,
    customClassNames,
    customAvatarStyles,
    customStyles,
    customRatingClass,
    readOnlyRating,
  }) => {
    const { classes: styles } = useStyles()

    const curUserId = (UserModel.userInfo as unknown as IFullUser)?._id

    return (
      <>
        {name || userId ? (
          <Link
            target="_blank"
            href={
              curUserId === userId
                ? `${window.location.origin}/profile`
                : `${window.location.origin}/another-user?${userId}`
            }
            underline={blackText || blueText ? 'none' : 'hover'}
            className={styles.linkWrapper}
            onClick={e => e.stopPropagation()}
          >
            {withAvatar ? (
              <Tooltip title={name}>
                <Avatar
                  src={getUserAvatarSrc(userId)}
                  className={styles.avatarWrapper}
                  sx={{ width: 28, height: 28, ...(customAvatarStyles && customAvatarStyles) }}
                />
              </Tooltip>
            ) : null}

            <div className={styles.userInfoWrapper}>
              {name && !notShowName && (
                <p
                  className={cx(styles.linkText, customClassNames, {
                    [styles.blackLinkText]: blackText,
                    [styles.blueLinkText]: blueText,
                  })}
                  style={{ ...(customStyles ?? {}), ...(maxNameWidth ? { maxWidth: maxNameWidth } : {}) }}
                >
                  {name}
                </p>
              )}

              {rating && (
                <Rating
                  disabled={!readOnlyRating}
                  readOnly={readOnlyRating}
                  value={rating}
                  size={ratingSize || 'medium'}
                  style={customRatingClass}
                />
              )}
            </div>
          </Link>
        ) : (
          <Typography>{'-'}</Typography>
        )}
      </>
    )
  },
)
