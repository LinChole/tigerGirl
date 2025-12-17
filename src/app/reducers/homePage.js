import {
  GET_HOME_PAGE_IMAGES,
  SET_HOME_PAGE_IMAGES,
} from "../actions/homePage"

const initState = {
  fetching: false,
  items: [],
  error: ""
}

export function slidesImages(state = initState, action) {
  switch (action.type) {
    case GET_HOME_PAGE_IMAGES:
      return {
        ...state,
        fetching: true,
        items: [],
        error: ''
      }
    case SET_HOME_PAGE_IMAGES:
      return {
        ...state,
        fetching: false,
        items: action.items,
        error: action.error
      }
    default:
      return state
  }
}