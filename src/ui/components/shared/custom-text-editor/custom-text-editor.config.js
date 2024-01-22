import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'

export const TextAlign = ({ children, textAlign }) => <span style={{ textAlign: `${textAlign}` }}>{children}</span>

export const customControls = [
  {
    name: 'justifyLeft',
    icon: <FormatAlignLeftIcon />,
    type: 'block',
    blockWrapper: <TextAlign textAlign={'left'} />,
  },
  {
    name: 'justifyCenter',
    icon: <FormatAlignCenterIcon />,
    type: 'block',
    blockWrapper: <TextAlign textAlign={'center'} />,
  },

  {
    name: 'justifyRight',
    icon: <FormatAlignRightIcon />,
    type: 'block',
    blockWrapper: <TextAlign textAlign={'right'} />,
  },

  {
    name: 'justifyFull',
    icon: <FormatAlignJustifyIcon />,
    type: 'block',
    blockWrapper: <TextAlign textAlign={'justify'} />,
  },
]

export const controls = [
  'bold',
  'italic',
  // 'underline',
  'strikethrough',
  'numberList',
  'bulletList',
  'justifyLeft',
  'justifyCenter',
  'justifyRight',
  'justifyFull',
]
