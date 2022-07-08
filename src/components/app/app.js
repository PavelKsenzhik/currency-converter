import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from "../header";
import Footer from "../footer";
import CurrencyPannel from "../currencyPannel";


import './app.scss'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="app__wrapper">
        <Routes>
            <Route exact path="/" element={<Navigate to="/main"/>} />
            <Route path="/main" element={<CurrencyPannel />} />
          </Routes>
          
        </div>
      </div>
     <Footer />
     
    </div>
  );
}

export default App;
