import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
  },
  productBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
    width: '100%',
    padding: '40px 50px',
  },

  productSubBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  sideBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '15px',
    width: '706px',
  },

  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  listingTitle: {
    height: 'auto',
    width: '100%',
    display: 'block',
    fontSize: '25px',
    padding: 0,
  },

  listingSearchTerms: {
    height: 'auto',
    width: '100%',
    display: 'block',
    padding: 0,
  },

  subTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },

  carouselWrapper: {
    width: '200px',
  },

  label: {
    width: '142px',
  },
  secondLabel: {
    width: '162px',
  },

  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },
  button: {
    marginRight: '10px',
  },

  imageFileInputWrapper: {
    width: '500px',
  },

  modalTextArea: {
    height: 'auto',
    width: '100%',
    padding: 0,
  },

  descriptionProduct: {
    width: '80%',
  },

  descriptionSecondProduct: {
    width: '77%',
  },

  photosWrapper: {
    display: 'flex',
  },

  photosLeftSubWrapper: {
    marginRight: 40,
  },
}))
