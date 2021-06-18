import './App.css';
// import News from './Components/News'
import Librarian from './Components/Librarian'
import {Redirect, Route,Switch} from 'react-router-dom'
import Reader from './Components/ReaderProfile/ReaderHome'
import CreateBook from './Components/CreateBook'
import Books from './Components/BooksList'
import Article from './Components/Article'
import { useState } from 'react';
import {useUser } from './Hooks/User'
function App() {
	const [user] = useUser(false)
  return (
    <Switch>
      
        <Route exact path='/'><Article/></Route>
        <Route exact path='/reader'>
			{
				parseInt(user.userType)=== 3 ?
					<Reader/>:
					<Redirect to="/"/>
			}
		</Route>
        <Route exact path='/librarian'>
			{
				parseInt(user.userType) === 2 ?
					<Librarian/>:
					<Redirect to="/"/>
			}
			
		</Route>
        <Route exact path='/books'><CreateBook/></Route>
        <Route exact path='/list'><Books/></Route>
    </Switch>
  );
}

export default App;
