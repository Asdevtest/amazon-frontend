import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    borderRadius: 20,

    backgroundColor: theme.palette.background.general,
    padding: '15px 20px',
    zIndex: 999,

    marginBottom: 40,

    display: 'flex',
    alignItems: 'center',
    // border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.1)',
  },

  avatarWrapper: {
    width: 53,
    height: 53,
    marginRight: 20,
  },

  rightSiteWrapper: {
    marginLeft: 20,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
