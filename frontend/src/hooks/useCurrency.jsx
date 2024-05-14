const useCurrency = () => {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  })
  return {
    formatter,
  }
}

export default useCurrency
