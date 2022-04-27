import { useSelector } from 'react-redux';

import { mainSelector } from '../slices/main';

import { Text } from '@mantine/core';

const Distance = () => {

  const { distance } = useSelector(mainSelector);

  return (
    <div className='flex flex-1 w-full justify-center gap-4'>
    <Text style={{ fontSize: '25px' }} align="center">
      Distance:
      <Text style={{ fontSize: '30px' }} weight={700}>{distance} miles</Text>
    </Text>
    
    </div>
  );
}

export default Distance;
