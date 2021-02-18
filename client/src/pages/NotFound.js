import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - soz about it</h1>
      <Link to="/">Head home homey</Link>
    </div>
  );
}
