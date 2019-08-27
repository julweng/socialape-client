import React from 'react'
import { func, node, string} from 'prop-types'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"

const CommonButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
)

CommonButton.propTypes = {
  children: node,
  onClick: func,
  tip: string,
  btnClassName: string,
  tipClassName: string
}

export default CommonButton