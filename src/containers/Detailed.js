import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Table, Button, Collapse } from '@mantine/core';

import { mainSelector } from 'slices/main';
// import { settingsSelector } from 'slices/settings';

const Detailed = ({ getTime }) => {

  const { path } = useSelector(mainSelector);

  const [opened, toggleOpen] = useState(false);

  const heads = (
    <tr>
      <th>Station</th>
      <th>Distance total, mi</th>
      <th>Distance from previous station, mi</th>
      <th>Travel time total (d:hh:mm)</th>
      <th>Travel time from previous station (d:hh:mm)</th>
    </tr>
  );

  const stations = path.map((station, i) => (
    <tr key={station.name}>
      <td>{station.name}</td>
      <td>{station.distanceTotal}</td>
      <td>{station.distanceTo}</td>
      <td>{getTime(station.distanceTotal, i)}</td>
      <td>{getTime(station.distanceTo)}</td>
    </tr>
  ));

  return (
    <div className='flex flex-1 w-full justify-center gap-4'>
      <Button onClick={() => toggleOpen(!opened)}>
        Toggle content
      </Button>

      <Collapse in={opened}>
        <Table highlightOnHover horizontalSpacing="xl" verticalSpacing="xs" fontSize="xl">
          <thead>{heads}</thead>
          <tbody>{stations}</tbody>
        </Table>
      </Collapse>
    </div>
  );
}

export default Detailed;
