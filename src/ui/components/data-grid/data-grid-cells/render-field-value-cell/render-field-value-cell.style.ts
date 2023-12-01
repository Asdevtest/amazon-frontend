import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  renderFieldValueCellText: {
    fontSize: '14px',

    whiteSpace: 'nowrap',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
