import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  chartWrapper: {
    width: '168px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profit: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginBottom: '5px',
  },
}))
