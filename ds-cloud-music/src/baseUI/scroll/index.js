import React, {forwardRef, useState, useEffect, useMemo, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

/**
 * scroll 作为一个通用组件，在业务中会被经常取到原生 DOM 对象，而函数式组件天生不具备被上层组件
 * 直接调用 ref 的条件，因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹
 */
const Scroll = forwardRef((props, ref) => {
  // 编写组件内容
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal'])
}

export default Scroll