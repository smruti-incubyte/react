import './App.css'
import ArrowFunctionsComponent from './day1/ArrowFunctionsComponent'
import DestructuringComponent from './day1/DestructuringComponent'
import FirstComponent from './day1/FirstComponent'
import SecondComponent from './day1/SecondComponent'
import SpreadOperatorComponent from './day1/SpreadOperatorComponent'
import ErrorBoundary from './ErrorBoundary'

function App() {
  return <ErrorBoundary fallback={<h2>Something went wrong</h2>}>
    <FirstComponent />
    <SecondComponent />
    <ArrowFunctionsComponent />
    <DestructuringComponent />
    <SpreadOperatorComponent />
  </ErrorBoundary>
}

export default App
