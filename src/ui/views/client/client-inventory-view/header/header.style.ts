import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  buttonsSubWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },

  searchInput: {
    width: '330px',
  },

  actionButtonWithPlus: {
    gap: '5px',
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
  },

  controlButtonsWrapper: {
    display: 'flex',
    gap: '12px',
  },

  controlButtonsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '12px',
    flexWrap: 'wrap',
  },
}))
