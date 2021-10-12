import { DirectiveBinding, Directive } from 'vue'
import './style.scss'

interface ResizeHandleParam {
  resizeHandle: EventListenerOrEventListenerObject
  element: HTMLElement
}

function createResizeElement(element: HTMLElement, resizeHandle: EventListenerOrEventListenerObject) {
  const iframe: HTMLIFrameElement = document.createElement('iframe')
  iframe.src = 'about:blank'
  iframe.classList.add('resize-trigger')
  iframe.onload = (): void => {
    const win = iframe.contentWindow
    if (win) {
      win.addEventListener('resize', resizeHandle)
    }
  }
  element.appendChild(iframe)
}

function initResizeHandle(param: ResizeHandleParam): void {
  const { resizeHandle } = param
  const { element } = param
  if (element.style.position === '' || element.style.position === 'static') {
    element.style.position = 'relative'
  }
  createResizeElement(element, resizeHandle)
}

const resize: Directive = {
  created(el: HTMLElement, binding: DirectiveBinding) {
    initResizeHandle({
      element: el,
      resizeHandle: binding.value
    })
  }
}

export default resize
