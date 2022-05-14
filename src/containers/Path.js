import { useSelector } from 'react-redux';

import { Text } from '@mantine/core';

import { mainSelector } from 'slices/main';
// import { settingsSelector } from '../slices/settings';

const Path = () => {

  const { path } = useSelector(mainSelector);

  const stations = path.map((station, i) => (
    <Text key={station.name} style={{ fontSize: '25px' }}>
      <li style={{ listStyleType: 'disc' }}>
        {station.name}
      </li>
    </Text>
  ));

  return (
    <div className='flex large:w-1/2 w-full mx-4 flex-col items-center'>
      <Text style={{ fontSize: '30px' }}>
        Stations:
      </Text>

      <ul>
        {stations}
      </ul>
    </div>
  );
}

export default Path;
