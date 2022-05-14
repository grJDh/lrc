import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextInput, Autocomplete } from '@mantine/core';

//https://mantine.dev/core/autocomplete/

import { mainSelector, setFromStation, setToStation } from 'slices/main';

const FromTo = props => {
  const dispatch = useDispatch();
  const { fromStation, toStation } = useSelector(mainSelector);

  // const [value, setValue] = useState('');

  // console.log(fromStation)

  return (
    <div className='flex flex-1 justify-center p-3 w-full'>
      <TextInput 
        placeholder="Sharn"
        label="From..."
        size="lg"
        className='w-1/2 mx-2'
        // data={props.stations}
        // value={fromStation}
        
        onChange={event => dispatch(setFromStation(event.target.value))}
      />

      <TextInput 
        placeholder="Fairhaven"
        label="To..."
        size="lg"
        className='w-1/2 mx-2'
        // data={props.stations}
        // value={toStation}

        onChange={event => dispatch(setToStation(event.target.value))}
      />
    </div>
  );
}

export default FromTo;
