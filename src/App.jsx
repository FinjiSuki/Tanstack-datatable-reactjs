import { useState } from 'react'
import './App.css'
import BasicDataTable from './components/BasicDataTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <BasicDataTable />
    </>
  )
}

export default App
