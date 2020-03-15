import React from 'react'
import ReactDOM from 'react-dom'
import {PicProvider} from './context/context'
import {PicShop} from './PicShop'

ReactDOM.render(<PicProvider><PicShop /></PicProvider>, document.getElementById('root'))