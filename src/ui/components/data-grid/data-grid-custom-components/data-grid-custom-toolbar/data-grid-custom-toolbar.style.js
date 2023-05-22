/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  toolbarContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    height: 65,
  },
  toolbarText: {
    fontSize: 16,
    fontWeight: 600,
  },
}))
