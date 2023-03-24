import React from 'react';
import FaceEditor from './Components/FaceEditor';

const imgUrl = 'https://www.peerspace.com/resources/wp-content/uploads/best-vancouver-portrait-photographers.png';
function App(): React.ReactElement {
  return (
    <div className="App">
      <FaceEditor imgUrl={imgUrl} />
    </div>
  );
}

export default App;
