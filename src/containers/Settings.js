import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Select, Button, Collapse, NumberInput, Switch, Divider, TextInput } from "@mantine/core";
import { useForm, formList } from "@mantine/form";

import CustomRail from "components/CustomRail";
import CustomPrice from "components/CustomPrice";
import Dialogue from "components/Dialogue";

import {
  settingsSelector,
  setDistanceSource,
  setSpeed,
  setLayover,
  setDiscount,
  setCustomRails,
  ColorPricesChange,
} from "slices/settings";

const Settings = () => {
  const dispatch = useDispatch();

  const { distanceSource, speed, layover, customRails, customPrices, coloredPrices, discount } =
    useSelector(settingsSelector);

  const [opened, toggleOpen] = useState(true);

  const [resetRailsModal, toggleResetRailsModal] = useState(false);
  const [customRailsSearchField, setCustomRailsSearchField] = useState("");

  const onDistanceSourceChange = (value) => dispatch(setDistanceSource(value));
  const onSpeedChange = (value) => dispatch(setSpeed(value));
  const onLayoverChange = (value) => dispatch(setLayover(value));
  const onDiscountChange = (value) => dispatch(setDiscount(value));
  const onColorPricesChange = () => dispatch(ColorPricesChange());

  const updatedCustomRails = useForm({
    initialValues: {
      rails: formList([...customRails]),
    },
  });

  const saveRailsChanges = () => {
    dispatch(setCustomRails(updatedCustomRails.values.rails));
  };

  const resetRails = () => {
    updatedCustomRails.reset();
    toggleResetRailsModal(false);
  };

  let filteredCustomRails = [];
  updatedCustomRails.values.rails.forEach((customRail, index) => {
    if (
      customRail[0].toLowerCase().includes(customRailsSearchField) ||
      customRail[1].toLowerCase().includes(customRailsSearchField)
    )
      filteredCustomRails.push(index);
  });

  const distancesList = ["4E", "3E", "Only custom"];

  const renderCustomRails = filteredCustomRails.map((index) => (
    <CustomRail key={index} index={index} updatedCustomRails={updatedCustomRails} />
  ));

  return (
    <div className="flex flex-1 w-full justify-center items-center flex-col gap-4">
      <Button onClick={() => toggleOpen(!opened)}>Toggle content</Button>

      <Collapse in={opened}>
        <Dialogue
          opened={resetRailsModal}
          text={"Are you sure you want to reset? All unsaved changes will be lost!"}
          onYes={resetRails}
          onNo={() => toggleResetRailsModal(false)}
        />

        <div className="flex flex-1 w-full justify-center items-center gap-4">
          <Select
            data={distancesList}
            label="Distances source"
            onChange={onDistanceSourceChange}
            value={distanceSource}
          />

          <NumberInput label="Speed (mph)" onChange={onSpeedChange} value={speed} min={1} />

          <NumberInput label="Layover (hours)" onChange={onLayoverChange} value={layover} min={0} />

          <NumberInput label="Discount (%)" onChange={onDiscountChange} value={discount} min={0} max={99} />

          <Switch label="Color prices" onChange={onColorPricesChange} checked={coloredPrices} />
        </div>

        <Divider my="sm" />

        <TextInput
          placeholder="Sharn"
          label="Search"
          size="lg"
          className="w-1/2"
          // data={props.stations}
          // value={toStation}

          onChange={(event) => setCustomRailsSearchField(event.target.value.toLowerCase())}
        />

        {renderCustomRails}

        <Button onClick={() => updatedCustomRails.addListItem("rails", ["", "", null])}>+</Button>

        <Button onClick={saveRailsChanges}>Save</Button>

        <Button onClick={() => toggleResetRailsModal(true)}>Reset</Button>
      </Collapse>
    </div>
  );
};

export default Settings;
