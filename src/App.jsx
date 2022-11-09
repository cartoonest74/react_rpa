import { Art } from './components/Art';
import { Nav } from './components/Nav';
import { useData } from './hooks/data_context';

function App() {
  const { data } = useData();

  return (
    <div className='bg-cyan-100x h-screen  w-full min-w-[280px] overflow-hidden'>
      <header>
        <Nav />
      </header>
      <main className='h-full w-full'>
        <div className='over flex h-4/6 items-start overflow-auto p-4'>
          {data.books
            .sort((a, b) =>
              a.id === 0 ? Number.MAX_SAFE_INTEGER : a.id - b.id
            )
            .map((book) => (
              <Art className='snap-center' key={book.id} book={book} />
            ))}
          <div></div>
        </div>
        <footer className='inline-flex h-1/6 w-full items-center justify-center bg-purple-300 text-center text-xl text-stone-600'>
          <span className='inline'>&#169; Indiflex - cartoonest74 2022</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
