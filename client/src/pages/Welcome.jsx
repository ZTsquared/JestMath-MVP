import {useState} from 'react';
import { Link } from 'react-router-dom';

//when creating a new user:  the database does not prohibit duplicate names,  so best to check if that name exists and make the user chose another before calling POST.

function Welcome() {
  return (    
  <div>
    <h3>Hey</h3>
    <h1>Kiddo</h1>
    <Link to="/quiz">Let's Play!</Link>
    <br /><br /><br />
    <p>Placeholder for "change user" dropdown</p>
  </div>
  )
}

export default Welcome