import { useCallback, useState } from 'react';
import './App.css';
import Search from './components/Search';
import SelectedItem from './components/SelectedItem';
// import reportWebVitals from './reportWebVitals';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelectItem = useCallback((item) => setSelectedItem(item), []);
  const theme = 'dark';
  // reportWebVitals(console.log);
  return (
    <div className={`app ${theme}`}>
      <header className="app_header">
        <h1 className={`title_${theme}`}>API pubbliche</h1>
      </header>
      <main className="app_main">
        <Search
          id="searchByTitleField"
          disabled={false}
          label="Ricerca"
          hideLabel={false}
          onObjectSelected={handleSelectItem}
          theme={theme}
        />
        {selectedItem && (
          <>
            <h2 className={`title_${theme}`} style={{ margin: "2rem 0 1rem" }}>
              API selezionata:
            </h2>
            <SelectedItem data={selectedItem} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
