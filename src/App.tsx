import './App.css'
import Header from './day2/Header'
import Footer from './day2/footer'
import List from './day2/List'
import ListItem from './day2/ListItem'
import ArrowFunctionsComponent from './day1/ArrowFunctionsComponent'
import DestructuringComponent from './day1/DestructuringComponent'
import FirstComponent from './day1/FirstComponent'
import SecondComponent from './day1/SecondComponent'
import SpreadOperatorComponent from './day1/SpreadOperatorComponent'
import Card from './day2/Card'
import CustomButton from './day2/CustomButton'
import ErrorBoundary from './ErrorBoundary'
import UsestateComponent from './day3/UsestateComponent'
import ConditionalRender from './day3/ConditionalRender'

interface TaskData {
  id: number;
  title: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

const tasksData: TaskData[] = [
  {
    id: 1,
    title: 'Learn React Fundamentals',
    description: 'Master JSX, components, and props',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Practice State Management',
    description: 'Understand useState and useEffect',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Build a Todo App',
    description: 'Create a simple project',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Review Documentation',
    description: 'Go through React docs',
    priority: 'low'
  }
];

function App() {
  return <ErrorBoundary fallback={<h2>Something went wrong</h2>}>
    <div style={styles.appContainer}>
      {/* <FirstComponent />
      <SecondComponent />
      <ArrowFunctionsComponent />
      <DestructuringComponent />
      <SpreadOperatorComponent /> */}


      {/* <Header title="Day 2 Components" subtitle="Building reusable UI components in React" />
      <Card
        imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
        title="Thinking in Components"
        description="Cards are not HTML elements. They are composed from smaller building blocks."
      />
      <CustomButton label={'Custom Button'} onClick={() => {
        console.log("Custom Button clicked");
      }}
        width={350}
        height={50}
      />
      <List items={['React Basics', 'Components', 'Props', 'State', 'Hooks']} ordered={true} />
      <div style={{ width: '100%', maxWidth: '500px', margin: '20px auto' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Tasks</h2>
        {tasksData.map((task) => (
          <ListItem key={task.id} data={task} />
        ))}
      </div>
      <Footer text="Incubyte React" year={2026} /> */}

      {/* <UsestateComponent /> */}

      <ConditionalRender />
    </div>
  </ErrorBoundary>
}

export default App

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#07534e',
    padding: '40px 20px',
    gap: '20px'
  }
}
