/* import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS' */
import { useStyles } from './custom-text-editor.style'

export const toolbar = (readOnly?: boolean): object | undefined => {
  const { classes: styles } = useStyles()

  return readOnly
    ? { options: [] }
    : {
        options: ['inline', 'list', 'textAlign'],
        inline: {
          inDropdown: false,
          className: styles.toolbarButtons,
          component: undefined,
          dropdownClassName: undefined,
          options: ['bold', 'italic', 'underline', 'strikethrough'],
          bold: { className: styles.toolbarButton },
          italic: { className: styles.toolbarButton },
          underline: { className: styles.toolbarButton },
          strikethrough: { className: styles.toolbarButton },
        },
        list: {
          inDropdown: false,
          className: styles.toolbarButtons,
          component: undefined,
          dropdownClassName: undefined,
          options: ['unordered', 'ordered'],
          unordered: { className: styles.toolbarButton },
          ordered: { className: styles.toolbarButton },
        },
        textAlign: {
          inDropdown: false,
          className: styles.toolbarButtons,
          component: undefined,
          dropdownClassName: undefined,
          options: ['left', 'center', 'right', 'justify'],
          left: { className: styles.toolbarButton },
          center: { className: styles.toolbarButton },
          right: { className: styles.toolbarButton },
          justify: { className: styles.toolbarButton },
        },
      }
}
