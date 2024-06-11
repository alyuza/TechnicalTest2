import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

function App() {
  const [currentPage, setCurrentPage] = useState('Page1');
  const [inputValueFromPage1, setInputValueFromPage1] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'Page1':
        return <Page1 setPage={setCurrentPage} setInputValue={setInputValueFromPage1} />;
      case 'Page2':
        return <Page2 setPage={setCurrentPage} inputValueFromPage1={inputValueFromPage1} />;
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;

function Page1({ setPage, setInputValue }) {
  const [inputValue, setInputValueLocal] = useState('');

  const handleChange = (e) => {
    setInputValueLocal(e.target.value);
  };

  const handleSubmit = () => {
    setInputValue(setInputValueLocal);
    setPage('Page2');
  };

  return (
    <div className={styles.page1}>
      <div className={styles.form}>
        <h2>Form</h2>
        <label>
          Masukkan Kata:
          <input type='text' value={inputValue} onChange={handleChange} />
        </label>
        <button className={styles.button} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

Page1.propTypes = {
  setPage: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

function Page2({ setPage, inputValueFromPage1 }) {
  const [inputValue, setInputValue] = useState(inputValueFromPage1 || '');
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [palindromeList, setPalindromeList] = useState([]);
  const [idCount, setIdCount] = useState(1);

  const checkPalindrome = (string) => {
    let startPointer = 0;
    let endPointer = string.length - 1;
    while (startPointer < endPointer) {
      if (string[startPointer] !== string[endPointer]) {
        return false;
      }
      startPointer++;
      endPointer--;
    }
    return true;
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setIsPalindrome(checkPalindrome(e.target.value));
  };

  const handleSave = () => {
    setPalindromeList([...palindromeList, { id: idCount, value: inputValue }]);
    setInputValue('');
    setIdCount(idCount + 1);
  };

  return (
    <div className={styles.page1}>
      <div className={styles.form}>
        <input type='text' value={inputValue} onChange={handleChange} />
        <div className={styles.buttonContainer}>
          <button className={styles.button2} onClick={() => setPage('Page1')}>Kembali</button>
          <button className={styles.button2} onClick={handleSave}>Simpan</button>
        </div>
        <p>
          {inputValue} {isPalindrome ? 'adalah' : 'bukan'} Palindrome
        </p>
        <h3>Tabel</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            {palindromeList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Page2.propTypes = {
  setPage: PropTypes.func.isRequired,
  inputValueFromPage1: PropTypes.string,
};

Page2.defaultProps = {
  inputValueFromPage1: '',
};

export { App, Page1, Page2 };
