const selecFavs = () => {
  return JSON.parse(localStorage.getItem('favs')) || []
}

const selecTheme = () => {
  return (
    localStorage.getItem('theme') ||
    (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
  )
}

export const initialState = {
  data: [],
  productSelected: {},
  dataCategory: [],
  categorySelected: {},
  dataUser: [],
  userSelected: {},
  dataFeature: [],
  featureSelected: {},
  dataRole: [],
  roleSelected: {},
  reservations: [],
  reservationSelected: null,
  qualify: [],
  qualifySelected: {},
  favs: selecFavs(),
  theme: selecTheme(),
}
