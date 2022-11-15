import { DialogTitle, DialogTitleProps, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const BootstrapDialogTitle = (props: DialogTitleProps & { onClose: () => void }): JSX.Element => {
  const { children, onClose, ...other } = props

  return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose !== null
          ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary.light
              }}
            >
              <CloseIcon />
            </IconButton>
            )
          : null}
      </DialogTitle>
  )
}
