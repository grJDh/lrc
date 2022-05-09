import { Group, TextInput, NumberInput, Select, ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const PriceEdit = ({ customPrice, index, updatedCustomPrices }) => {

  const modesList = [
    'hour(s)',
    'mile(s)',
  ];

  const returnMode = () => {
    if (customPrice.pricingMethod === 'per hour') return 'hour(s)';
    else return 'mile(s)';
  }

  return (
    <Group mt="xs">
      <TextInput 
        placeholder="Steerage"
        label="Name"
        required
        // size="lg"
        // defaultValue={customPrice.tier}
        {...updatedCustomPrices.getListInputProps('prices', index, 'tier')}
      />

      costs

      <NumberInput
        label='Price'
        // onChange={onSpeedChange}
        // defaultValue={customPrice.price}
        required
        min={0.01}
        precision={2}
        step={1}
        {...updatedCustomPrices.getListInputProps('prices', index, 'price')}
        // parser={(value) => value.replace(/\g\p\s?|(,*)/g, '')}
        // formatter={(value) =>
        //   !Number.isNaN(parseFloat(value))
        //   ? `${value} gp`
        //   : ' gp'
        // }
      />

      gp for every

      <NumberInput
        label='Every'
        // onChange={onSpeedChange}
        // defaultValue={customPrice.mod}
        required
        min={0.01}
        precision={2}
        step={1}
        {...updatedCustomPrices.getListInputProps('prices', index, 'mod')}
      />

      <Select
        data={modesList}
        label='Mode'
        required
        // onChange={onDistanceSourceChange}
        // defaultValue={returnMode()}
        {...updatedCustomPrices.getListInputProps('prices', index, 'pricingMethod')}
      />

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => updatedCustomPrices.removeListItem('prices', index)}
      >
        <Trash size={16} />
      </ActionIcon>

    </Group>
  );
}

export default PriceEdit;
