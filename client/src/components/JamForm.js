import React, { useContext } from 'react';
import { JamsContext } from '../App';

//using refs for the add new song but not for the edit song
export default function JamForm(props) {
  const {
    isNew,
    delay,
    setDelay,
    handleSubmit,
    songnameRef,
    minilougeRef,
    mpcseqRef,
    bpmRef,
    brutepatchRef,
    bruteseqRef,
    chordsRef,
    lyricsRef,
    notesRef,
    jam,
  } = props;

  const { handleEditJam } = useContext(JamsContext);

  function handleOnDelaySelectedChange(newDelayValue) {
    setDelay(newDelayValue);
    handleOnChange({ delay: newDelayValue });
  }

  function handleOnChange(changes) {
    if (isNew) return;
    const updatedJam = { ...jam, ...changes };
    console.log('calling handle edit jam from jam form with ', updatedJam);
    handleEditJam(jam.id, updatedJam);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="songname">Name</label>
          <input
            value={jam && jam.songname}
            onChange={e => handleOnChange({ songname: e.target.value })}
            type="text"
            name="songname"
            ref={songnameRef}
            id="songname"
          />
        </div>
        <div>
          <label htmlFor="minilouge">Minilouge</label>
          <input
            value={jam && jam.minilouge}
            onChange={e => handleOnChange({ minilouge: e.target.value })}
            type="number"
            ref={minilougeRef}
            name="minilouge"
            id="minilouge"
          />
        </div>
        <div>
          <label htmlFor="mpcseq">MPC Seq</label>
          <input
            value={jam && jam.mpcseq}
            onChange={e => handleOnChange({ mpcseq: e.target.value })}
            type="number"
            name="mpcseq"
            ref={mpcseqRef}
            id="mpcseq"
          />
        </div>
        <div>
          <label htmlFor="bpm">BPM</label>
          <input
            value={jam && jam.bpm}
            onChange={e => handleOnChange({ bpm: e.target.value })}
            type="number"
            ref={bpmRef}
            id="bpm"
          />
        </div>
        <div>
          <label htmlFor="brutepatch">Brute Patch</label>
          <input
            value={jam && jam.brutepatch}
            onChange={e => handleOnChange({ brutepatch: e.target.value })}
            type="text"
            name="brutepatch"
            ref={brutepatchRef}
            id="brutepatch"
          />
          <p>this will be a file uploader eventually</p>
        </div>
        <div>
          <label htmlFor="bruteseq">Brute Seq</label>
          <input
            value={jam && jam.bruteseq}
            onChange={e => handleOnChange({ bruteseq: e.target.value })}
            type="text"
            name="bruteseq"
            ref={bruteseqRef}
            id="bruteseq"
          />
        </div>
        <div>
          <fieldset>
            {/* visually hide the legend and replace with label */}
            <legend>Delay patch select</legend>
            <div>
              <input
                value="delay1"
                checked={delay === 'delay1'}
                onChange={e => handleOnDelaySelectedChange(e.target.value)}
                type="radio"
                name="delay"
                id="delay1"
              />
              <label htmlFor="delay1">One</label>
            </div>
            <div>
              <input
                value="delay2"
                checked={delay === 'delay2'}
                onChange={e => handleOnDelaySelectedChange(e.target.value)}
                type="radio"
                name="delay"
                id="delay2"
              />
              <label htmlFor="delay2">Two</label>
            </div>
            <div>
              <input
                value="delay3"
                checked={delay === 'delay3'}
                onChange={e => handleOnDelaySelectedChange(e.target.value)}
                type="radio"
                name="delay"
                id="delay3"
              />
              <label htmlFor="delay3">Three</label>
            </div>
          </fieldset>

          <p>Make this a radio button control</p>
        </div>
        <div>
          <label htmlFor="chords">Chords</label>
          <input
            value={jam && jam.chords}
            onChange={e => handleOnChange({ chords: e.target.value })}
            type="text"
            name="chords"
            ref={chordsRef}
            id="chords"
          />
          <p>Maybe make this an image option so hitme can be used?</p>
        </div>
        <div>
          <label htmlFor="lyrics">Lyrics</label>
          <textarea
            value={jam && jam.lyrics}
            onChange={e => handleOnChange({ lyrics: e.target.value })}
            type="text"
            name="lyrics"
            ref={lyricsRef}
            id="lyrics"
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            value={jam && jam.notes}
            onChange={e => handleOnChange({ notes: e.target.value })}
            type="text"
            name="notes"
            ref={notesRef}
            id="notes"
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
