import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    padding: '5px 0px',
    display: 'flex',
    alignItems: 'flex-start',
  },

  fields: {
    width: '100%',
  },

  amazonTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 500,
    color: theme.palette.text.general,
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
