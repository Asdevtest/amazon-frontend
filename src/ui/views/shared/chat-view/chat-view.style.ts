import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatViewWrapper: {
    flexDirection: 'row',
    gap: 'unset',
    containerType: 'inline-size',
  },
}))
