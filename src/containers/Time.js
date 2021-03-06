import { useSelector } from 'react-redux';

import { Text } from '@mantine/core';

import { mainSelector } from 'slices/main';
import { settingsSelector } from 'slices/settings';

const Time = ({ getTime }) => {

  const { distance, path } = useSelector(mainSelector);
  const { layover } = useSelector(settingsSelector);

  const time = getTime(distance, path.length)

  return (
    <div className='flex flex-1 w-full justify-center gap-4'>
      <Text style={{ fontSize: '25px' }} align="center">
        Travel time:
        <Text style={{ fontSize: '30px' }} weight={700}>{time}</Text>
        <Text style={{ fontSize: '15px' }}>(d:hh:mm)</Text>
        <Text style={{ fontSize: '15px' }}>({layover} hour layover at each station)</Text>
      </Text>
    </div>
  );
}

export default Time;
