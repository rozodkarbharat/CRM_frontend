import logo from './logo.svg';
import './App.css';
import Dashboard from './Pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Strategies from './Pages/Strategies';
import EditStrategy from './Pages/EditStrategy';
import TradeHistory from './Pages/TradeHistory';
import SubscriptionDetail from './Pages/SubscriptionDetail';
import CRM from './Pages/CRM';
import OrderHistory from './Pages/OrderHistory';
import ManualTrades from './Pages/ManualTrades';
import ClientDetails from './Pages/ClientDetails';
import Login from './Pages/Login';
import Authentication from './Components/HOC/Authentication';
import HasAuth from './Components/HOC/HasAuth';
import LiveTrades from './Pages/LiveTrades.jsx';
import TradedUsers from './Pages/TradedUsers.jsx';
import UsersTrades from './Pages/UsersTrades.jsx';
import ExpiringSubscriptionPage from './Pages/ExpiringSubscriptionPage.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authentication><Dashboard /></Authentication>} />
        <Route path='/strategies' element={<Authentication><Strategies /></Authentication>} />
        <Route path='/edit/:id' element={<Authentication><EditStrategy /></Authentication>} />
        <Route path='/trade-history' element={<Authentication><TradeHistory /></Authentication>} />
        <Route path='/subscription-detail' element={<Authentication><SubscriptionDetail /></Authentication>} />
        <Route path='/crm' element={<Authentication><CRM /></Authentication>} />
        <Route path='/orders' element={<Authentication><OrderHistory /></Authentication>} />
        <Route path='/manual-trade' element={<Authentication><ManualTrades /></Authentication>} />
        <Route path='/client-detail/:id' element={<Authentication><ClientDetails /></Authentication>} />
        <Route path='/live-trades' element={<Authentication><LiveTrades /></Authentication>}/>
        <Route path='/traded-users' element={<Authentication><TradedUsers /></Authentication>}/>
        <Route path='/users-trades/:id' element={<Authentication><UsersTrades /></Authentication>}/>
        <Route path='/expiring-subscription' element={<Authentication><ExpiringSubscriptionPage /></Authentication>}/>
        <Route path='/login' element={<HasAuth><Login /></HasAuth>} />
      </Routes>
    </div>
  );
}

export default App;
