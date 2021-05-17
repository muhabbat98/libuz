import './App.css';
import News from './Components/News'
import {Route,Switch} from 'react-router-dom'
import Reader from './Components/ReaderProfile/ReaderHome'
function App() {
 
  return (
    <Switch>
      
        <Route exact path='/'><News/></Route>
        <Route exact path='/reader'><Reader/></Route>

    </Switch>
  );
}

export default App;
