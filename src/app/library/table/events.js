import { cloneDict, inc } from '../tools'

export function clickToTop(position = document.body.scrollHeight) {
  window.scrollTo({ top: position, behavior: 'smooth' })
}

export function notEffect(e) {
  e.preventDefault()
}

