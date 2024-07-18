import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    padding: '10px 0px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },

  fields: {
    width: 'calc(100% - 80px)',
    display: 'flex',
    flexDirection: 'column',
  },

  amazonTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  img: {
    height: '58px',
    width: '58px',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '4px',
    border: `1px solid #E0E0E0`,
  },
}))
