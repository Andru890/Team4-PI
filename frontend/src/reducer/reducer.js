export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, data: action.payload }
    case 'GET_DETAIL':
      return { ...state, productSelected: action.payload }
    case 'ADD_PRODUCT':
      return { ...state, data: [...state.data, action.payload] }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        data: state.data.filter((product) => product.id !== action.payload),
      }
    case 'GET_CATEGORY':
      return { ...state, data: action.payload }
    case 'GET_CATEGORY_DETAIL':
      return { ...state, productSelected: action.payload }
    case 'ADD_CATEGORY':
      return { ...state, data: [...state.data, action.payload] }
    case 'DELETE_CATEGORY':
      return {
        ...state,
        data: state.data.filter((product) => product.id !== action.payload),
      }
    default:
      return state
  }
}
