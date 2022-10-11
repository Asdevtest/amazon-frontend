import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },

  parameterTableCellWrapper: {
    display: 'flex',
    width: '436px',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.text.general,
    lineHeight: '21px',
  },

  text: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
  },

  scrollingText: {
    color: 'linear-gradient(180deg, #006CFF 0%, #0460DE 100%)',
    maxWidth: '270px',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    fontSize: '16px',
    // lineHeight: '19px',
  },

  fieldLabel: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
  },

  sizesWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '220px',
    justifyContent: 'space-between',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barCodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
}))
