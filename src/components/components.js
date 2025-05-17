import React, { useEffect, useRef, useState } from 'react';
import { loadModel } from '../TeachableMachine';

function YourComponent() {
  const [model, setModel] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    loadModel().then(setModel);
  }, []);

  const predict = async () => {
    if (model && imageRef.current) {
      const prediction = await model.predict(imageRef.current);
      // Do something with prediction
    }
  };
  

  return (
    <div>
      <img ref={imageRef} src="your-image.jpg" alt="Test" />
      <button onClick={predict}>Predict</button>
    </div>
  );
}

export default YourComponent;