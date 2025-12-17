import action from "../library/action"

export const TOGGLE_MODAL_START= "TOGGLE_MODAL_START";
export const toggleModalStart=(open)=>action(TOGGLE_MODAL_START,{open})
export const TOGGLE_MODAL= "TOGGLE_MODAL";
export const toggleModal=()=>action(TOGGLE_MODAL)
export const CLOSE_MODAL= "CLOSE_MODAL";
export const closeModal=(trueORfalse)=>action(CLOSE_MODAL,{trueORfalse})
