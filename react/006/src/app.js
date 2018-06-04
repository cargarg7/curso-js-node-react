import React from 'react'
import Tooltip from './components/tooltip'

export default () => (
  <div className="main-content wrapper">
    <p>
      Este texto contiene un <Tooltip text='tooltip' tooltip="contenido del tooltip"/>
    </p>
  </div>
)
