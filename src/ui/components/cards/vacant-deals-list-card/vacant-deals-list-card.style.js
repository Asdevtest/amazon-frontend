import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: '326px',

    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,

    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px',
    backgroundColor: theme.palette.background.general,
  },

  nameWrapper: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '60px',

    marginLeft: '15px',
  },

  cardTitleBlockHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginTop: '56px',
  },

  cardTitle: {
    // margin: '0 10px 0 20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  cardDescription: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    marginTop: '10px',
    height: '57px',
    overflow: 'auto',
  },

  usersInfoBlockWrapper: {
    display: 'flex',
    gap: '92px',
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  userInfoName: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '10px',
  },

  middleBlockWrapper: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  timeItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  actionButton: {
    width: '242px',
    height: '40px',
  },

  cardPrice: {
    fontSize: '16px',
    lineHeight: '21px',
    color: theme.palette.primary.main,
  },

  subBlockWrapper: {
    width: '758px',
    padding: '30px 40px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSubBlockWrapper: {
    width: '325px',

    borderRadius: '8px',

    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  rightSubBlockWrapper: {
    width: '301px',

    borderRadius: '8px',

    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  text: {
    color: theme.palette.text.general,
  },
}))
