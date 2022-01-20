import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
  },
  productBlockWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
    width: '100%',
  },

  sideBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '15px',
    width: '50%',
    padding: '16px',
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
    height: '50px',
    overflowX: 'scroll',
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
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
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
  input: {
    width: '400px',
  },
  imgBox: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
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
    overflowX: 'scroll',
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
    cursor: 'pointer',
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
    display: 'flex',
    marginTop: '15px',
  },
  button: {
    marginRight: '10px',
  },

  imageFileInputWrapper: {
    width: '500px',
  },
}))
