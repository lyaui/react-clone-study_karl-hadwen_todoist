import React from 'react';
import { firestore } from '../firebase/config';

function Checkbox({ id }) {
  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const archiveTask = () => {
    firestore
      .collection('tasks')
      .doc(id)
      .update({ archived: true })
      .then(() => {
        console.log('yo');
      });
  };
  return (
    <div className='checkbox-holder' data-testid='checkbox-action' onClick={archiveTask}>
      <span className='checkbox'></span>
    </div>
  );
}

export default Checkbox;
