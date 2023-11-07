import {useState} from 'react';
import { Link } from 'react-router-dom';

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