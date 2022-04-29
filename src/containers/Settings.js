import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Select, Button, Collapse, NumberInput, Switch } from '@mantine/core';
import { useForm, formList } from '@mantine/form';

import CustomRail from 'components/CustomRail';
import CustomPrice from 'components/CustomPrice';
import Dialogue from 'components/Dialogue';
import CustomInputList from 'components/CustomInputList';

// import { mainSelector } from 'slices/main';
import { settingsSelector, setPriceMode, setDistanceSource, setSpeed, setLayover, setCustomRails, setCustomPrices,
         ColorPricesChange } from 'slices/settings';

const Settings = () => {

  const dispatch = useDispatch();
  const { priceMode, distanceSource, speed, layover, customRails, customPrices, coloredPrices } = useSelector(settingsSelector);

  const [opened, toggleOpen] = useState(true);

  const [isSavingRails, toggleIsSavingRails] = useState(false);
  const [isResettingRails, toggleIsResettingRails] = useState(false);
  const [resetRailsModal, toggleResetRailsModal] = useState(false);

  const [isSavingPrices, toggleIsSavingPrices] = useState(false);
  const [isResettingPrices, toggleIsResettingPrices] = useState(false);
  const [resetPricesModal, toggleResetPricesModal] = useState(false);

  const onPriceModeChange = value => dispatch(setPriceMode(value));
  const onDistanceSourceChange = value => dispatch(setDistanceSource(value));
  const onSpeedChange = value => dispatch(setSpeed(value));
  const onLayoverChange = value => dispatch(setLayover(value));
  const onColorPricesChange = () => dispatch(ColorPricesChange());

  const updatedCustomRails = useForm({
    initialValues: {
      rails: formList([...customRails]),
    }
  });

  const updatedCustomPrices = useForm({
    initialValues: {
      prices: formList([...customPrices]),
    }
  });

  const saveRailsChanges = () => {
    toggleIsSavingRails(true);

    dispatch(setCustomRails(updatedCustomRails.values.rails));

    toggleIsSavingRails(false);
  }

  const savePricesChanges = () => {
    toggleIsSavingPrices(true);

    dispatch(setCustomPrices(updatedCustomPrices.values.rails));

    toggleIsSavingPrices(false);
  }

  const openResetRailsDialogue = () => {
    toggleIsResettingRails(true);
    toggleResetRailsModal(true);
  }

  const openResetPricesDialogue = () => {
    toggleIsResettingPrices(true);
    toggleResetPricesModal(true);
  }

  const resetRails = () => {
    updatedCustomRails.reset();
    closeResetDialogue();
  }

  const resetPrices = () => {
    updatedCustomRails.reset();
    closeResetDialogue();
  }

  const closeResetDialogue = () => {
    toggleIsResettingRails(false);
    toggleResetRailsModal(false);

    toggleIsResettingPrices(false);
    toggleResetPricesModal(false);
  }


  const pricingList = [
    'All',
    'ERLW (5E) - per mile',
    'WGtE (5E) - per day',
    'ECG (4E) - per mile',
    'Custom',
  ];
  const distancesList = [
    '4E',
    '3E',
    'Only custom',
  ];

  const renderCustomRails = updatedCustomRails.values.rails.map((rail, index) => (
    <CustomRail key={index} rail={rail} index={index} updatedCustomRails={updatedCustomRails} />
  ));

  const renderCustomPrices = updatedCustomPrices.values.rails.map((price, index) => (
    <CustomPrice key={index} price={price} index={index} updatedCustomPrices={updatedCustomPrices} />
  ));

  return (
    <div className='flex flex-1 w-full justify-center items-center flex-col gap-4'>

      <Dialogue
        opened={resetRailsModal}
        text={'Are you sure you want to reset? All unsaved changes will be lost!'}
        onClose={() => toggleResetRailsModal(false)}
        onYes={resetRails}
        onNo={closeResetDialogue}
      />

      <Dialogue
        opened={resetPricesModal}
        text={'Are you sure you want to reset? All unsaved changes will be lost!'}
        onClose={() => toggleResetPricesModal(false)}
        onYes={resetPrices}
        onNo={closeResetDialogue}
      />

      <div className='flex flex-1 w-full justify-center items-center gap-4'>
        <Select
          data={pricingList}
          label='Pricing method'
          onChange={onPriceModeChange}
          value={priceMode}
        />

        <Select
          data={distancesList}
          label='Distances source'
          onChange={onDistanceSourceChange}
          value={distanceSource}
        />

        <NumberInput
          label='Speed (mph)'
          onChange={onSpeedChange}
          value={speed}
          min={1}
        />

        <NumberInput
          label='Layover (hours)'
          onChange={onLayoverChange}
          value={layover}
          min={0}
        />

        <Switch 
          label='Color prices'
          onChange={onColorPricesChange}
          checked={coloredPrices}
        />
      </div>

      <CustomInputList
        render={renderCustomRails}
        onAdd={() => updatedCustomRails.addListItem('rails', ['', '', null])}
        onSave={saveRailsChanges}
        onReset={openResetRailsDialogue}
        isSaving={isSavingRails}
        isResetting={isResettingRails}
      />

      <CustomInputList
        render={renderCustomPrices}
        onAdd={() => updatedCustomPrices.addListItem('prices', ['', '', null])}
        onSave={savePricesChanges}
        onReset={openResetPricesDialogue}
        isSaving={isSavingPrices}
        isResetting={isResettingPrices}
      />
    </div>
  );
}

export default Settings;
