import { createContext, useContext, useReducer, useState } from 'react';

const SKEY = 'mipdata';

const SampleData = {
  books: [
    {
      id: 1,
      title: 'My Private Book',
      marks: [],
    },
  ],
};

// action: {type: 'save', payload: newData}
const reducer = (data, action) => {
  let newData;
  switch (action.type) {
    case 'add':
      newData = {
        ...data,
        books: [...data.books, { id: 0, title: '', marks: [] }],
      };
      break;

    case 'save':
      newData = {
        ...data,
        books: [
          ...data.books.filter((_book) => _book.id !== action.payload.id),
          action.payload,
        ],
      };
      break;

    case 'remove':
      newData = {
        ...data,
        books: [...data.books.filter((_book) => _book.id !== action.payload)],
      };
      break;

    case 'add-mark':
      newData = {
        ...data,
      };
      break;

    case 'remove-mark':
      newData = {
        ...data,
        books: [...data.books.filter((_book) => _book.id !== action.payload)],
      };
      break;

    default:
      throw new Error('Not Defined Action!!');
  }

  localStorage.setItem(SKEY, JSON.stringify(newData));
  return newData;
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // const [data, setData] = useState(SampleData);
  const [data, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(SKEY)) || SampleData
  );

  const [searchStr, setSearchStr] = useState('');

  // Add Book 버튼 클릭시 호출되며, id=0인 book을 하나 끼워 넣는다!
  const addBook = () => {
    dispatch({ type: 'add' });
  };

  // 수정(등록포함)
  const saveBook = (book) => {
    // 1. 현재 수정중인 book을 제외한 book 필터링

    // 2. 만약 id=0인 등록 상태라면 기존 id 가장 큰 값에서 +1 해서 신규 id 생성
    if (!book.id) {
      book.id = Math.max(...data.books.map((_book) => _book.id)) + 1;
    }

    // 3. 새롭게 데이터를 만들 때, 현재 수정중인것을 제외한 books에,
    // 현재 수정중인 book 추가해서 새로운 books 생성
    dispatch({ type: 'save', payload: book });
  };

  const removeBook = (bookId) => {
    dispatch({ type: 'remove', payload: bookId });
  };

  const addMark = (book) => {
    book.marks.push({ id: 0, image: '', title: '', description: '' });
    dispatch({ type: 'add-mark', payload: book });
  };

  const saveMark = (book, mark) => {
    if (!mark.id || isNaN(mark.id)) {
      const allMarks = [...data.books.map((book) => book.marks)];
      console.log('allMarks>>>>', allMarks);
      mark.id = Math.max(...allMarks.flat().map((_mark) => _mark.id)) + 1;
    }
    dispatch({ type: 'save', payload: book });
  };

  const removeMark = (book, markId) => {
    console.log('book>>>', book);
    console.log('markId>>>', markId);
    // 해당 북에서 삭제하고자 하는 마크를 제외시키고
    book.marks = [...book.marks.filter((mark) => mark.id !== markId)];
    // 해당 북을 저장
    dispatch({ type: 'save', payload: book });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        addBook,
        saveBook,
        removeBook,
        addMark,
        saveMark,
        removeMark,
        searchStr,
        setSearchStr,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
