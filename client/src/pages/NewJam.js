import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import JamForm from '../components/JamForm'

export default function NewJam({ handleAddJam }) {
  const id = uuidv4()
  const history = useHistory()
  const [delay, setDelay] = useState(null)

  const songnameRef = useRef(null)
  const minilougeRef = useRef(null)
  const mpcseqRef = useRef(null)
  const bpmRef = useRef(null)
  const brutepatchRef = useRef(null)
  const bruteseqRef = useRef(null)
  const chordsRef = useRef(null)
  const lyricsRef = useRef(null)
  const notesRef = useRef(null)

  function createSongSlug(songname) {
    return songname.trim().toLowerCase().split(' ').join('-')
  }

  let newJam = {}

  function createJamOnFormSubmit(e) {
    e.preventDefault()
    console.log('creating new song')

    newJam = {
      id,
      songname: songnameRef.current.value.trim(),
      songslug: createSongSlug(songnameRef.current.value),
      minilouge: parseInt(minilougeRef.current.value) || '',
      mpcseq: parseInt(mpcseqRef.current.value) || '',
      bpm: parseInt(bpmRef.current.value) || '',
      brutepatch: brutepatchRef.current.value,
      bruteseq: parseInt(bruteseqRef.current.value) || '',
      delay,
      chords: chordsRef.current.value,
      lyrics: lyricsRef.current.value,
      notes: notesRef.current.value,
    }

    handleAddJam(newJam)
    history.push(`/jams/${newJam.songslug}`)
  }

  const formProps = {
    handleSubmit: createJamOnFormSubmit,
    delay,
    setDelay,
    songnameRef,
    minilougeRef,
    mpcseqRef,
    bpmRef,
    brutepatchRef,
    bruteseqRef,
    chordsRef,
    lyricsRef,
    notesRef,
  }

  return (
    <div>
      <h1>Add Song</h1>
      <JamForm isNew={true} jam={newJam} {...formProps} />
    </div>
  )
}
