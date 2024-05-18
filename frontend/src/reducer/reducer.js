export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, data: action.payload }
    case 'GET_DETAIL':
      return { ...state, dentistSelected: action.payload }
    default:
      return state
  }
}
