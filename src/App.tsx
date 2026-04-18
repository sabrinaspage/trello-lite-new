import { Board } from './components/board'
import { useGetBoard } from './api/board';

function App() {
  const { board, loading, error} = useGetBoard();

  if(loading) {
    return <div> awaiting data </div>
  }

  if(error) {
    return <div>error: {error}</div>
  }

  return (
    <Board body={board} />
  )
}

export default App;
