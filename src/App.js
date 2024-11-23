import logo from './logo.svg';
import './App.css';
import ApolloClientProvider from './ApolloClient';
import SoldeStats from './SoldeStats';
import CompteList from './CompteList';
import CompteForm from './CompteForm';

function App() {
  return (
    <ApolloClientProvider>
      <div>
        <h1>Bank Accounts Application</h1>
        <SoldeStats />
        <CompteForm />
        <CompteList />
        
      </div>
    </ApolloClientProvider>
  );
}

export default App;
