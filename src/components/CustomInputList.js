import { Button } from '@mantine/core';

const CustomInputList = ({ render, onAdd, onSave, onReset, isSaving, isResetting }) => {

  return (
    <div className='flex flex-1 w-full justify-center items-center flex-col gap-4'>
      {render}

      <Button onClick={onAdd}>
        +
      </Button>

      <Button onClick={onSave} loading={isSaving}>
        Save
      </Button>

      <Button onClick={onReset} loading={isResetting}>
        Reset
      </Button>
    </div>
  );
}

export default CustomInputList;
