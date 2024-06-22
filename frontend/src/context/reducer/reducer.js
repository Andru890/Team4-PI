export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST':
      return {
        ...state,
        data: action.payload.map((product) => ({
          ...product,
          categories: product.categories || [],
        })),
      }
    case 'GET_DETAIL':
      return {
        ...state,
        productSelected: {
          ...action.payload,
          categories: action.payload.categories || [],
        },
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
        data: [
          ...state.data,
          { ...action.payload, categories: action.payload.categories || [] },
        ],
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.id
            ? { ...action.payload, categories: action.payload.categories || [] }
            : product
        ),
      }
    case 'UPDATE_PRODUCT_STOCK':
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.id
            ? { ...product, stock: action.payload.stock }
            : product
        ),
      }
    case 'UPDATE_PRODUCT_CATEGORY':
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.productId
            ? {
                ...product,
                categories: [
                  ...product.categories,
                  { id: action.payload.categoryId },
                ],
              }
            : product
        ),
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        data: state.data.filter((product) => product.id !== action.payload),
      }
    case 'GET_CATEGORY':
      return {
        ...state,
        dataCategory: action.payload,
      }

    case 'GET_CATEGORY_DETAIL':
      return {
        ...state,
        categorySelected: action.payload,
      }

    case 'ADD_CATEGORY':
      return {
        ...state,
        dataCategory: [...state.dataCategory, action.payload],
      }

    case 'DELETE_CATEGORY':
      return {
        ...state,
        dataCategory: state.dataCategory.filter(
          (category) => category.id !== action.payload
        ),
      }
    case 'GET_USER':
      return {
        ...state,
        dataUser: action.payload,
      }

    case 'GET_USER_DETAIL':
      return {
        ...state,
        dataUserSelected: action.payload,
      }

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'ADD_USER':
      return {
        ...state,
        dataUser: [...state.dataUser, action.payload],
      }

    case 'DELETE_USER':
      return {
        ...state,
        dataUser: state.dataUser.filter((user) => user.id !== action.payload),
      }

    case 'GET_ROLE':
      return {
        ...state,
        dataRole: action.payload,
      }

    case 'SET_ROLE':
      return {
        ...state,
        dataUser: state.dataUser.map((user) =>
          user.id === action.payload.userId
            ? { ...user, role: action.payload.role }
            : user
        ),
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case 'CHANGE_USER_ROLE':
      return {
        ...state,
        dataUser: state.dataUser.map((user) =>
          user.id === action.payload.userId
            ? { ...user, role: action.payload.newRole }
            : user
        ),
      }
    case 'GET_FEATURE':
      return {
        ...state,
        dataFeature: action.payload,
      }
    case 'GET_FEATURE_DETAIL':
      return {
        ...state,
        featureSelected: action.payload,
      }
    case 'ADD_FEATURE':
      return {
        ...state,
        dataFeature: [...state.dataFeature, action.payload],
      }
    case 'DELETE_FEATURE':
      return {
        ...state,
        dataFeature: state.dataFeature.filter(
          (feature) => feature.id !== action.payload
        ),
      }
    case 'UPDATE_FEATURE':
      return {
        ...state,
        dataFeature: state.dataFeature.map((feature) =>
          feature.id === action.payload.id ? action.payload : feature
        ),
      }
    case 'GET_FEATURES_BY_PRODUCT':
      return {
        ...state,
        dataFeature: action.payload,
      }
    case 'GET_FAVS':
      return { ...state, favs: action.payload }
    case 'ADD_FAV':
      return { ...state, favs: [...state.favs, action.payload] }
    case 'DEL_FAV':
      return {
        ...state,
        favs: state.favs.filter((fav) => fav.id !== action.payload.id),
      }
    case 'CLEAR_FAVS':
      return { ...state, favs: [] }
    case 'CHANGE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }

    default:
      return state
  }
}
