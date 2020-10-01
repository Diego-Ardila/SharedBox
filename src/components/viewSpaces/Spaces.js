import React from 'react';
import  Space from './Space';

function Spaces({ spaces, infoFunction }) {
  return (
    <div>
      {spaces.map(space => (
        <Space key={space._id} space={space} className="mb-5" infoFunction={infoFunction} />
      ))}
    </div>
  )
}

export default Spaces;