import { DirectiveBinding, Directive } from 'vue'

export interface ActiveHeightParam {
  transaction?: boolean
  noTransactionClass?: string
  active: boolean
  remove?: boolean
}

interface ActiveHeightDirectiveParam extends ActiveHeightParam {
  nextNode: Element | null
  parentNode: Element | null
}

function childActiveHandle(this: HTMLElement, e: any) {
  this.style.height = `${this.offsetHeight + e.changeHeight}px`
}

function getTransactionEnd(data: ActiveHeightParam) {
  return function transactionEnd(this: HTMLElement) {
    if (data.active) {
      this.style.height = 'auto'
    } else if (data.remove) {
      if (this.remove) {
        this.remove()
      } else if (this.parentNode) {
        this.parentNode.removeChild(this)
      }
    }
  }
}

function append(nextNode: Element | null, curNode: HTMLElement, parentNode: Element | null) {
  if (nextNode) {
    nextNode.insertBefore(curNode, parentNode)
  } else if (parentNode) {
    parentNode.appendChild(curNode)
  }
}

function changeHeight(el: HTMLElement, data: ActiveHeightDirectiveParam) {
  const $el = el
  if (data.transaction !== undefined && data.noTransactionClass !== undefined) {
    if (data.transaction) {
      $el.classList.remove(data.noTransactionClass)
    } else {
      $el.classList.add(data.noTransactionClass)
    }
  }
  if (data.active) {
    if (data.remove) {
      append(data.nextNode, $el, data.parentNode)
    }
    $el.style.height = `${$el.scrollHeight}px`
  } else {
    $el.style.height = `${$el.scrollHeight}px`
    setTimeout(() => {
      $el.style.height = `${0}px`
    }, 0)
  }
}

const transitionEventArray = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'.split(' ')
const index: Directive<HTMLElement, ActiveHeightDirectiveParam> = {
  created(el: HTMLElement, binding: DirectiveBinding<ActiveHeightDirectiveParam>): void {
    el.addEventListener('active-height', childActiveHandle)
    transitionEventArray.forEach((item) => {
      el.addEventListener(item, getTransactionEnd(binding.value), true)
    })
  },
  mounted(el: HTMLElement, binding: DirectiveBinding<ActiveHeightDirectiveParam>): void {
    const data = { ...binding.value }
    data.nextNode = el.nextElementSibling
    data.parentNode = el.parentElement
    changeHeight(el, data)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const data = binding.value
    changeHeight(el, data)
  }
}

export default index
