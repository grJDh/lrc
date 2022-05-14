import { TextInput, NumberInput, Select, ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const PriceEdit = ({ index, updatedCustomPrices }) => {

  const modesList = [
    { value: 'per hour', label: 'hour(s)' },
    { value: 'per mile', label: 'mile(s)' },
  ];

  return (
    <div className='flex max-w-full justify-evenly items-end grow'>
      <TextInput 
        placeholder="Steerage"
        label="Name"
        {...updatedCustomPrices.getListInputProps('prices', index, 'tier')}
      />

      <span className="mb-9px">
        costs
      </span>

      <NumberInput
        label='Price'
        min={0.01}
        precision={2}
        step={1}
        {...updatedCustomPrices.getListInputProps('prices', index, 'price')}
        className="max-w-100px"
        // parser={(value) => value.replace(/\g\p\s?|(,*)/g, '')}
        // formatter={(value) =>
        //   !Number.isNaN(parseFloat(value))
        //   ? `${value} gp`
        //   : ' gp'
        // }
      />

      <span className="mb-9px">
        gp for every
      </span>

      <NumberInput
        label='Every'
        min={0.01}
        precision={2}
        step={1}
        {...updatedCustomPrices.getListInputProps('prices', index, 'mod')}
        className="max-w-100px"
      />

      <Select
        data={modesList}
        label='Mode'
        {...updatedCustomPrices.getListInputProps('prices', index, 'pricingMethod')}
        className="max-w-100px"
      />

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => updatedCustomPrices.removeListItem('prices', index)}
        className="mb-5px"
      >
        <Trash size={16} />
      </ActionIcon>

    </div>
  );
}

export default PriceEdit;
