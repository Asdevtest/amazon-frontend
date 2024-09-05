import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    gridArea: 'a',
    width: '200px',
  },

  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '5px',
  },

  content: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: '16px',
  },

  info: {
    padding: '5px 0',
    boxShadow: theme.palette.boxShadow.box,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '5px',
    borderRadius: '12px',

    div: {
      padding: '0',
    },
  },

  shop: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    border: `1px solid ${theme.palette.text.gray}`,
    borderRadius: '6px',

    svg: {
      color: theme.palette.primary.main,
    },
  },

  text: {
    width: '80%',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
  },

  title: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: '600',
    textAlign: 'left',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
