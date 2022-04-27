import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Select, Button, Collapse, NumberInput, Switch } from '@mantine/core';

import CustomRail from '../components/CustomRail';

import { mainSelector } from '../slices/main';
import { settingsSelector, setPriceMode, setDistanceSource, setSpeed, setLayover, setCustomRails, setCustomPrices, ColorPricesChange } from '../slices/settings';

const Settings = () => {

  const dispatch = useDispatch();
  const { priceMode, distanceSource, speed, layover, customRails, customPrices, coloredPrices } = useSelector(settingsSelector);

  const [opened, toggleOpen] = useState(true);
  const [updatedCustomRails, setUpdatedCustomRails] = useState(customRails);
  const [errorFields, setErrorFields] = useState({});
  const [isSaving, toggleIsSaving] = useState(false);

  const onPriceModeChange = value => dispatch(setPriceMode(value));
  const onDistanceSourceChange = value => dispatch(setDistanceSource(value));
  const onSpeedChange = value => dispatch(setSpeed(value));
  const onLayoverChange = value => dispatch(setLayover(value));
  const onColorPricesChange = () => dispatch(ColorPricesChange());

  const addErrorField = (railIndex, valueIndex) => {
    let tempErrorFields = {...errorFields};

    if (tempErrorFields[railIndex] !== undefined) tempErrorFields[railIndex].push(valueIndex);
    else tempErrorFields[railIndex] = [valueIndex];

    setErrorFields(tempErrorFields);
  }

  const onSetUpdatedCustomRails = (payload, railIndex, valueIndex) => {

    let tempUpdatedCustomRails = [...updatedCustomRails]; //making spread copy of a whole array...
    let tempUpdatedCustomRails2 = [...tempUpdatedCustomRails[railIndex]]; //...and then again, but only of rail that we change

    tempUpdatedCustomRails2[valueIndex] = payload; //changing the value in a rail that we change
    tempUpdatedCustomRails[railIndex] = tempUpdatedCustomRails2; //applying this change to the copy of a whole array

    // if (payload === '' || payload === null) {
    //   if (!Object.keys(errorFields).includes(railIndex)) {
        
    //   }
    // } else if (Object.keys(errorFields).includes(railIndex)) {

    // }

    setUpdatedCustomRails(tempUpdatedCustomRails); //sending changes to the local state
  }

  const addNewCustomRail = () => {
    let tempUpdatedCustomRails = [...updatedCustomRails];
    tempUpdatedCustomRails.push(['','',null]);

    setUpdatedCustomRails(tempUpdatedCustomRails);
  }

  const saveChanges = () => {
    toggleIsSaving(true);

    updatedCustomRails.forEach(rail => {
      rail.forEach(element => {
        if (element === '' || element === null) {
          addErrorField(rail, element);
          return;
        }
      });
    });

    dispatch(setCustomRails(updatedCustomRails));
    toggleIsSaving(false);
  }

  // const [customPricesChanges, setCustomPricesChanges] = useState(JSON.stringify(customPrices, null, 1))
  // const onCustomPricesChange = event => setCustomPricesChanges(event.target.value);
  // const onCustomPricesReset = () => setCustomPricesChanges(JSON.stringify(customPrices, null, 1));
  // const onCustomPricesSave = () => {
  //   if (customPricesChanges.length !== 0) {
  //     try {
  //       dispatch(setCustomPrices(JSON.parse(customPricesChanges)));
  //     }
  //     catch (e) {
  //       alert(e);
  //     }
  //   } else {
  //     dispatch(setCustomPrices({}));
  //   }
  // }

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

  const renderCustomRails = updatedCustomRails.map((rail, i) => (
    <CustomRail key={i} rail={rail} i={i} onSetUpdatedCustomRails={onSetUpdatedCustomRails} errorFields={errorFields[i]} />
  ));

  return (
    <div className='flex flex-1 w-full justify-center items-center flex-col gap-4'>
      <div className='flex flex-1 w-full justify-center items-center gap-4'>
        {/* <Button onClick={() => toggleOpen(!opened)}>
          Toggle content
        </Button> */}

        {/* <Collapse in={opened}> */}
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

      <div className='flex flex-1 w-full justify-center items-center flex-col gap-4'>
        {renderCustomRails}

        <Button onClick={addNewCustomRail} loading={isSaving}>
          +
        </Button>

        <Button onClick={saveChanges}>
          Save
        </Button>
      </div>

      <div className='flex flex-1 w-full justify-center items-center gap-4'>
        {/* <CustomRail /> */}
      </div>

      {/* <SettingsTextArea label={'Custom prices:'} onChangeFunc={onCustomPricesChange} saveFunc={onCustomPricesSave}
      resetFunc={onCustomPricesReset} defValue={customPricesChanges}/>

      <SettingsTextArea label={'Custom distances:'} onChangeFunc={onCustomRailsChange} saveFunc={onCustomRailsSave}
      resetFunc={onCustomRailsReset} defValue={customRailsChanges}/> */}

      {/* </Collapse> */}
    </div>
  );
}

export default Settings;
