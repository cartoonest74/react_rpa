import {
  BookmarkSquareIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useData } from '../hooks/data_context';

export const Nav = () => {
  const { searchStr, setSearchStr } = useData();
  const { data, addBook } = useData();

  return (
    <nav className='inline-flex w-full flex-wrap'>
      <div className='flex w-full justify-center bg-purple-200'>
        <h1 className='w-[200px]'>
          <img
            src='../../public/mip_logo.png'
            className='inline w-full'
            alt='mip_logo'
          />
        </h1>
      </div>
      <div className='flex w-full justify-center py-1'>
        <div className='relative inline w-5/12 border-b-2 border-purple-300'>
          <MagnifyingGlassIcon className='absolute bottom-1 left-0 w-7 text-slate-500' />
          <input
            type='text'
            value={searchStr}
            onChange={(evt) => setSearchStr(evt.target.value)}
            placeholder='search...'
            className='inline w-full px-8 py-2 outline-none'
          />
        </div>
        {data.books.find((book) => !book.id) ? (
          ''
        ) : (
          <button
            onClick={addBook}
            className='inline w-auto rounded-full rounded-sm bg-purple-400 px-5 py-1 font-medium text-white duration-300 ease-in hover:bg-purple-300'
          >
            + Add Book
          </button>
        )}
      </div>
    </nav>
  );
};
