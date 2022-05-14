import { useEffect, useState } from 'react';

import { TextInput, NumberInput, ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const CustomRail = ({ index, updatedCustomRails }) => {

  const [screenWidth, setScreenWidth] = useState(undefined);

  useEffect(() => {

    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(screenWidth)

  const inputSize = () => {
    if (screenWidth > 640) return 'md'
    else return 'sm'
  } 

  return (
    <li className='flex flex-1 w-full justify-center items-end gap-4'>
      <TextInput
        placeholder="Thaliost"
        label="From..."
        size={inputSize()}
        sx={{ flex: 1 }}
        {...updatedCustomRails.getListInputProps('rails', index, 0)}
      />

      <TextInput
        placeholder="Rekkenmark"
        label="To..."
        size={inputSize()}
        sx={{ flex: 1 }}
        {...updatedCustomRails.getListInputProps('rails', index, 1)}
      />

      <NumberInput 
        placeholder="27"
        label="Distance (mi)"
        size={inputSize()}
        sx={{ flex: 1 }}
        min={1}
        {...updatedCustomRails.getListInputProps('rails', index, 2)}
      />

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => updatedCustomRails.removeListItem('rails', index)}
        className="mb-[12px] mr-[5px]"
      >
        <Trash size={16} />
      </ActionIcon>
    </li>
  );
}

export default CustomRail;
