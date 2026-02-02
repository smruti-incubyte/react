import './App.css'
import ArrowFunctionsComponent from './day1/ArrowFunctionsComponent'
import DestructuringComponent from './day1/DestructuringComponent'
import FirstComponent from './day1/FirstComponent'
import SecondComponent from './day1/SecondComponent'
import SpreadOperatorComponent from './day1/SpreadOperatorComponent'
import Card from './day2/Card'
import CustomButton from './day2/CustomButton'
import ErrorBoundary from './ErrorBoundary'

function App() {
  return <ErrorBoundary fallback={<h2>Something went wrong</h2>}>
    {/* <FirstComponent />
    <SecondComponent />
    <ArrowFunctionsComponent />
    <DestructuringComponent />
    <SpreadOperatorComponent /> */}
    <div style={{ padding: 40 }}>
      <Card
        title="Thinking in Components"
        description="Cards are not HTML elements. They are composed from smaller building blocks."
        imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
      />
    </div>
    <CustomButton label={'Custom Button'} onClick={() => {
      console.log("Custom Butoon clicked");
    }}
      width={250}
      height={90}
    />
  </ErrorBoundary>
}

export default App
