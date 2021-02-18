import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import JamForm from '../components/JamForm'
import { JamsContext } from '../App'

export default function EditJam({ handleEditJam, match }) {
  const history = useHistory()
  const { getJamBySlug } = useContext(JamsContext)

  const songslug = match.params.songslug
  const currentJam = getJamBySlug(songslug) || {}
  console.count('how many times does this component render?')

  const [delay, setDelay] = useState(currentJam.delay || null)

  function updateJamOnFormSubmit(e) {
    e.preventDefault()
    console.log('update jam on form submit even is ,', e)

    const URL = `/api/jams`
    axios.put(URL, { data: currentJam, params: { id: currentJam._id } })

    // get the jam from state again
    // is it already in currentJam?

    // call edit in DB below to send API request to put

    // route
    history.push(`/jams/${songslug}`)
  }

  function editJamInDB(id, updatedJam) {}

  const formProps = {
    handleSubmit: updateJamOnFormSubmit,
    delay,
    setDelay,
  }

  return (
    <div>
      <h1>Edit Jam</h1>
      <JamForm {...formProps} jam={currentJam} />
    </div>
  )
}
