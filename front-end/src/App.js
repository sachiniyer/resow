import logo from './static/logo.svg';
import './App.css';
import PreviewWindow from './components/PreviewWindow';

function App() {
  return (
    <div className="App">
      <header className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* sample for previewbox component */}
      <PreviewWindow 
        thumbnailURL = {logo}
        profileURL = {logo}
        sellerName = "Foo Barstein"
        title = "Cute rabbit needs a new home"
        location = "400 Broome St"
        description = "Giving away my lovely bunnie rabbit!!"
        
      />
      

    </div>
  );
}

export default App;
