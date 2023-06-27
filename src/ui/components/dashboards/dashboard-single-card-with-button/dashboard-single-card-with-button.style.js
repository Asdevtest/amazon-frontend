import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    backgroundColor: theme.palette.background.general,
    // boxShadow: '0px 2px 11px 2px #DFDFDF',
    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.general}`,

    padding: '30px 20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '316px',
    width: '221px',
  },
  cardWrapperHorizontal: {
    width: '923px',
    height: '115px',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleWrapperHorizontal: { gap: '38px' },
  cardTitle: {
    width: '111px',
    color: theme.palette.text.second,
  },
  cardListTitle: {
    fontSize: '18px',
    lineHeight: '27px',
    color: theme.palette.text.general,
    fontWeight: 600,
  },
  cardListSubTitle: {
    color: theme.palette.text.second,
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '10px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: theme.palette.text.general,
    textAlign: 'end',
  },
}))
