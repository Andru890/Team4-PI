const useCurrency = () => {
  const formatterCL = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  })
  return {
    formatterCL,
  }
}
export default useCurrency
