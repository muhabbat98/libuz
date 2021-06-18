import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Form from './Login'
export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
		<Button className="login-button" onClick={handleClickOpen('body')}>login</Button>
		<Dialog
			open={open}
			onClose={handleClose}
			scroll={scroll}
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description"
		>
		
			<Form/>
		</Dialog>
    </div>
  );
}
