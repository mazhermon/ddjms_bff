import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ jams }) {
  const jamListItemLinks = jams.map(jam => (
    <li key={jam._id}>
      <Link to={`/jams/${jam.songslug}`}>{jam.songname}</Link>
    </li>
  ))

  return (
    <div>
      <h1>DadJams yo!</h1>
      <p>
        A custom song &amp; patch settings reference for Tim &amp; Maz's synth
        playground
      </p>
      <h2>All Jams</h2>
      <nav>
        <ul>{jamListItemLinks}</ul>
      </nav>

      <Link to='/new'>Add New Jam</Link>
    </div>
  )
}
