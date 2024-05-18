import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en el componente:', error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center h-screen bg-red-100'>
          <h1 className='text-4xl font-bold text-red-600 mb-4'>
            Algo salió mal.
          </h1>
          <p className='text-lg text-red-800 mb-8'>
            Por favor, inténtalo de nuevo más tarde.
          </p>
          <button
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
            onClick={() => window.location.reload()}
          >
            Recargar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
