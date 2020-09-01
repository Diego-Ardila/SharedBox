import React from 'react';
import  Space from './Space';

function Spaces({ spaces }) {
  return (
    <div>
      {spaces.map(space => (
        <Space key={space.id} space={space} className="mb-5" />
      ))}
    </div>
  )
}

export default Spaces;