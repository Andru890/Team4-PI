import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en el componente:', error, errorInfo)
    this.setState({ hasError: true, error: error, errorInfo: errorInfo })
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
          {this.state.error && (
            <div className='text-red-700'>
              <h2 className='text-2xl'>Detalles del error:</h2>
              <pre>{this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </div>
          )}
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
