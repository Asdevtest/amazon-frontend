import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  userRolesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 70,
    overflow: 'auto',
    width: '100%',
  },

  userRole: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },
}))
