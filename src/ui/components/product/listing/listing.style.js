import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
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
    // padding: '16px',
  },

  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  listingTitle: {
    height: 'auto',
    width: '100%',
    display: 'block',
    fontSize: '25px',
  },

  listingSearchTerms: {
    height: 'auto',
    width: '100%',
    display: 'block',
  },

  searchSupplierField: {
    height: 'auto',
    width: '100%',
    display: 'block',
  },

  link: {
    width: '100%',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  competitorMainWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-beetwen',

    gap: '20px',
  },

  competitorWrapper: {
    width: '90%',
  },

  detailDescriptionWrapper: {
    width: '100%',
  },

  detailDescription: {
    height: '100px',
    width: '100%',
    display: 'block',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    padding: '6px 8px 7px',
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '17px',
    '&:focus': {
      border: '1px solid rgba(0, 123, 255, 1)',
      outline: 'none',
    },
  },

  subTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },

  carouselWrapper: {
    width: '200px',
  },

  text: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  label: {
    width: '142px',
  },
  secondLabel: {
    width: '162px',
  },
  boxCode: {
    display: 'flex',
    alignItems: 'center',
    margin: '48px 0px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  typoCode: {
    marginRight: '8px',
  },

  imgBox: {
    width: '200px',
    height: '80px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  bigImg: {
    height: '70vh',
    objectFit: 'center',
  },
  competitorsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  competitorTypo: {
    height: '60px',
    maxWidth: '400px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  inputFileWrapper: {
    width: '150px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(61, 81, 112, 1)',
    borderRadius: '10px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      opacity: '0.7',
    },
  },
  inputWaitFileWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fileInput: {
    display: 'none',
  },

  filesInputList: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, auto)',
    gap: '10px',
  },

  filesInputListItem: {
    padding: '0',
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
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
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
