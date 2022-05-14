import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Select, Button, ScrollArea, NumberInput, Switch, Divider, TextInput, Text } from "@mantine/core";
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
  colorPricesChange,
} from "slices/settings";

const Settings = () => {
  const dispatch = useDispatch();

  const { distanceSource, speed, layover, customRails, coloredPrices, discount } = useSelector(settingsSelector);

  const [opened, toggleOpen] = useState(true);
  const [resetRailsModal, toggleResetRailsModal] = useState(false);
  const [customRailsSearchField, setCustomRailsSearchField] = useState("");

  const onDistanceSourceChange = (value) => dispatch(setDistanceSource(value));
  const onSpeedChange = (value) => dispatch(setSpeed(value));
  const onLayoverChange = (value) => dispatch(setLayover(value));
  const onDiscountChange = (value) => dispatch(setDiscount(value));
  const onColorPricesChange = () => dispatch(colorPricesChange());

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

  return (
    <div className="flex flex-1 w-full justify-center items-center flex-col gap-4">
      <Button onClick={() => toggleOpen(!opened)}>{(opened ? "Close settings" : "Open settings")}</Button>

      {/* <Collapse in={opened}> */}
      {(opened) &&
        <div>
          <Dialogue
            opened={resetRailsModal}
            text={"Are you sure you want to reset? All unsaved changes will be lost!"}
            onYes={resetRails}
            onNo={() => toggleResetRailsModal(false)}
          />

          <div className="flex flex-1 w-full justify-evenly items-end sm:items-start gap-4 flex-wrap large:flex-nowrap ">
            <Select
              data={distancesList}
              label="Distances source"
              onChange={onDistanceSourceChange}
              value={distanceSource}
              className="w-1/3" 
            />

            <NumberInput label="Speed (mph)" onChange={onSpeedChange} value={speed} min={1} className="w-1/3" />

            <NumberInput label="Layover (hours)" onChange={onLayoverChange} value={layover} min={0} className="w-1/3"  />

            <NumberInput label="Discount (%)" onChange={onDiscountChange} value={discount} min={0} max={99} className="w-1/3"  />

            <Switch
              label="Color prices"
              onChange={onColorPricesChange}
              checked={coloredPrices}
              className="flex flex-col-reverse gap-3 text-center"
              styles={{
                label: { padding: 0, fontWeight: 500 },
              }}
            />

          </div>

          <Divider my="sm" />

          <div className="flex flex-col justify-center items-center gap-4">
            <Text style={{ fontSize: '30px' }}>
              Custom rails:
            </Text>

            <TextInput
              placeholder="Sharn"
              label="Search"
              size="lg"
              className="w-full"
              // data={props.stations}
              // value={toStation}

              onChange={(event) => setCustomRailsSearchField(event.target.value.toLowerCase())}
            />

              <ScrollArea
                style={{ height: Math.min(500, filteredCustomRails.length * 100 + 50) }}
                type="auto"
                offsetScrollbars
                className="flex w-full"
              >
                <ul className="flex flex-col gap-2">
                  {filteredCustomRails.map(index => (
                    <CustomRail key={index} index={index} updatedCustomRails={updatedCustomRails} />
                  ))}
                </ul>

                <Button
                  onClick={() => updatedCustomRails.addListItem("rails", ["", "", null])}
                  className="w-full mt-2"
                >
                  +
                </Button>
              </ScrollArea>

            </div>

            <div className="flex justify-evenly">
              <Button onClick={saveRailsChanges}>Save</Button>

              <Button onClick={() => toggleResetRailsModal(true)}>Reset</Button>
          </div>
        {/* </Collapse> */}
        </div>
      }
    </div>
  );
};

export default Settings;
