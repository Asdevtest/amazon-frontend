import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  asinCellContainer: {
    width: '100%',
    padding: '10px 0px',
    display: 'flex',
    alignItems: 'flex-start',
  },

  csCodeTypoWrapper: {
    width: '100%',
  },

  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '165px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  img: {
    height: '58px',
    width: '58px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '4px',
    border: `1px solid #E0E0E0`,
  },
}))
