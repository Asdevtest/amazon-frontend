import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  redFlags: {
    padding: '10px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',

    p: {
      padding: 0,
      margin: 0,
    },
  },

  hiddenFlagsPopover: {
    display: 'flex',
    maxWidth: '184px',
    flexWrap: 'wrap',
    gap: '10px',
  },

  moreFlags: {
    width: '24px',
    height: '24px',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
}))
