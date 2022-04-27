import { useState } from 'react';

import { TextInput, NumberInput, ColorSchemeProvider } from '@mantine/core';

// import { mainSelector } from '../slices/main';

const CustomRail = ({ rail, i, onSetUpdatedCustomRails, errorFields }) => {

  const firstStation = (rail === null) ? '' : rail[0];
  const secondStation = (rail === null) ? '' : rail[1];
  const distance = (rail === null) ? '' : rail[2];

  return (
    <div className='flex flex-1 w-full justify-center gap-4'>
      <TextInput 
        placeholder="Thaliost"
        label="From..."
        size="lg"
        className='w-2/5'
        // data={props.stations}
        value={firstStation}
        onChange={event => onSetUpdatedCustomRails(event.target.value, i, 0)}
        error={(errorFields !== undefined && errorFields.includes(0))} 
      />

      <TextInput 
        placeholder="Rekkenmark"
        label="To..."
        size="lg"
        className='w-2/5'
        // data={props.stations}
        value={secondStation}
        onChange={event => onSetUpdatedCustomRails(event.target.value, i, 1)}
      />

      <NumberInput 
        placeholder="27"
        label="Distance (mi)"
        size="lg"
        className='w-1/5'
        // data={props.stations}
        value={distance}
        min={0}
        onChange={value => onSetUpdatedCustomRails(value, i, 2)}
      />
    </div>
  );
}

export default CustomRail;
