import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import './App.css'
import Router from './Router'

export const JamsContext = React.createContext()

// TODO
// bring in typescript soon
// make an enum for the delay values

function App() {
  const history = useHistory()

  // could end up using useReducer instead of useState here
  // >>> get jams from api and add here
  const [jams, setJams] = useState([])

  const jamsProvider = {
    handleEditJam,
    handleDeleteJam,
    handleAddJam,
    getJamBySlug,
  }

  // grab jams from db
  useEffect(() => {
    axios
      .get('/api/jams')
      .then(response => {
        setJams(response.data)
      })
      .catch(error => {
        console.warn('error getting jams from api', error)
      })
    // return () => {
    //   cleanup
    // }
  }, [])

  function handleAddJam(newJamToAdd) {
    setJams([...jams, newJamToAdd])
    // >>>> add to db here - this one only fires on submit - double check
    // .>> ok to add to db here
    const payload = newJamToAdd
    axios({
      url: '/api/jams',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        console.log('yup! send new jam to db')
      })
      .catch(() => {
        console.warn(
          'eek, error sending new jam to db... internal server error'
        )
      })
    console.log('new jam to add, newJamToAdd')
  }

  //move this to a service or something
  function getJamBySlug(slug) {
    return [...jams].find(jam => jam.songslug === slug)
  }

  function getJamById(id) {
    return [...jams].find(jam => jam._id === id)
  }

  function handleEditJam(id, updatedJam) {
    console.log('call handleEditJam from app with ', updatedJam)
    const newJams = [...jams]
    const jamToUpdateIndex = newJams.findIndex(jam => jam.id === id)
    newJams[jamToUpdateIndex] = updatedJam
    setJams(newJams)
  }

  function handleDeleteJam(id) {
    // local state
    const jamsCopyToFilter = [...jams]
    const newJams = jamsCopyToFilter.filter(jam => jam._id !== id)
    setJams(newJams)

    // make db changes
    const URL = '/api/jams'
    axios.delete(URL, { params: { id } })

    // route
    history.push('/')
  }

  return (
    <div className='dad-jams-app'>
      <JamsContext.Provider value={jamsProvider}>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/new'>New Jam</Link>
            </li>
          </ul>
        </nav>

        <Router jams={jams} />
      </JamsContext.Provider>
    </div>
  )
}

export default App
