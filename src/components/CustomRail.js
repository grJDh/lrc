import { TextInput, NumberInput, ActionIcon, Group } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const CustomRail = ({ index, updatedCustomRails }) => {

  return (
    // <div className='flex flex-1 w-full justify-center gap-4'>
    <Group mt="xs">
      <TextInput
        placeholder="Thaliost"
        label="From..."
        required
        size="lg"
        sx={{ flex: 1 }}
        {...updatedCustomRails.getListInputProps('rails', index, 0)}
      />

      <TextInput
        placeholder="Rekkenmark"
        label="To..."
        size="lg"
        required
        sx={{ flex: 1 }}
        {...updatedCustomRails.getListInputProps('rails', index, 1)}
      />

      <NumberInput 
        placeholder="27"
        label="Distance (mi)"
        size="lg"
        required
        sx={{ flex: 1 }}
        min={1}
        {...updatedCustomRails.getListInputProps('rails', index, 2)}
      />

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => updatedCustomRails.removeListItem('rails', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  );
}

export default CustomRail;
