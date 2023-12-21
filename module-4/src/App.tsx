
import './App.css'

function App() {

  return (
    <>
    <form onSubmit={() => console.log('asd')}>
      <input type='text' onChange={()=> console.log('asd')}   />
        <button onClick={() => console.log('clicked')}>Submit</button>
    </form>
      <input type='text' onChange={()=> console.log('asd')}   />
      <h1 className="text-3xl font-bold underline colo">
      Hello world!
    </h1>
    </>
  )
}

export default App
