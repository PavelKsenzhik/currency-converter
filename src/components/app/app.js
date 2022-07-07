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
          <CurrencyPannel/>
        </div>
      </div>
     <Footer />
    </div>
  );
}

export default App;
