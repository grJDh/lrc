import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mainSelector } from "slices/main";
import { settingsSelector, setCustomPrices, setPriceMode } from "slices/settings";

import { Text, Button, Select, Modal, TextInput } from "@mantine/core";
import { useForm, formList } from "@mantine/form";

import PriceTierOutput from "components/PriceTierOutput";
import PriceEdit from "components/PriceEdit";
import Dialogue from "components/Dialogue";

const Price = () => {
  const dispatch = useDispatch();

  const { distance, basePrices } = useSelector(mainSelector);
  const { priceMode, speed, customPrices, discount, coloredPrices } = useSelector(settingsSelector);

  const combinedPrices = { ...basePrices, ...customPrices };

  const pricingList = [...Object.keys(combinedPrices), "+"];

  const [isEditing, setIsEditing] = useState(false);
  const [resetModal, toggleResetModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);

  const [newPricingMethodModal, toggleNewPricingMethodModal] = useState(false);
  const [newPricingMethodName, setNewPricingMethodName] = useState("");

  const onPriceModeChange = (value) => {
    if (value === "+") toggleNewPricingMethodModal(true);
    else dispatch(setPriceMode(value));
  };

  const changePricingMethodWording = (array, back) => {
    // comment
    let tempCustomPrices = [...array];

    if (back) {
      tempCustomPrices.forEach((tier, index) => {
        if (tier.pricingMethod === "hour(s)") tempCustomPrices[index] = {...tempCustomPrices[index], pricingMethod: "per hour"};
        else tempCustomPrices[index] = {...tempCustomPrices[index], pricingMethod: "per mile"};
      });

    } else {
      tempCustomPrices.forEach((tier, index) => {
        if (tier.pricingMethod === "per hour") tempCustomPrices[index] = { ...tempCustomPrices[index], pricingMethod: "hour(s)"};
        else tempCustomPrices[index] = { ...tempCustomPrices[index], pricingMethod: "mile(s)"};
      });
    }

    return tempCustomPrices;
  };

  const updatedCustomPrices = useForm({
    initialValues: {
      prices: formList(changePricingMethodWording(combinedPrices[priceMode], false)),
    },
  });

  const resetChanges = () => {
    updatedCustomPrices.reset();
    toggleResetModal(false);
  };

  const deletePricingMethod = () => {
    let tempCustomPrices = { ...customPrices };
    delete tempCustomPrices[priceMode];

    closeNewPricingMethodDialogue();
    dispatch(setCustomPrices(tempCustomPrices));

    setIsEditing(false);
    toggleDeleteModal(false);
  };

  const saveChanges = () => {
    dispatch(
      setCustomPrices({
        ...customPrices,
        [priceMode]: changePricingMethodWording(updatedCustomPrices.values.prices, true),
      })
    );

    const bla = {
      Custom: [
        {
          tier: "First Class",
          price: 25,
          pricingMethod: "per hour",
          mod: 24,
        },
        {
          tier: "Sleeping",
          price: 6,
          pricingMethod: "per hour",
          mod: 24,
        },
        {
          tier: "Seating",
          price: 4,
          pricingMethod: "per hour",
          mod: 24,
        },
        {
          tier: "Steerage",
          price: 1,
          pricingMethod: "per hour",
          mod: 24,
        },
      ],
    };

    // dispatch(setCustomPrices(bla));

    setIsEditing(false);
  };

  const calculateAndFormatPrice = (tier) => {
    //calculating price and then formmatting it to [gp,sp,cp]
    const price =
      tier.pricingMethod === "per mile"
        ? (distance / tier.mod) * tier.price * (1 - discount / 100)
        : (distance / speed / tier.mod) * tier.price * (1 - discount / 100);

    const maxPrice = Math.max(price, 0.01); //in the case price drops lower than 1 cp

    return [
      Math.trunc(maxPrice),
      Math.trunc(maxPrice % 1 * 10),
      Math.trunc(maxPrice % 1 * 10 % 1 * 10)
    ];
  };

  const returnPrice = () => {
    if (isEditing) return changePricingMethodWording(updatedCustomPrices.values.prices, true);
    else return combinedPrices[priceMode];
  };

  const renderPrices = () => {
    return (
      <span>

        <Text weight={500} underline style={{ fontSize: "25px" }}>
          <Select data={pricingList} label="Pricing method" onChange={onPriceModeChange} value={priceMode} />
        </Text>

        <ul className="pl-5">

          {returnPrice().map((tier) => (
            <PriceTierOutput
              key={priceMode + tier.tier}
              formattedPrice={calculateAndFormatPrice(tier)}
              coloredPrices={coloredPrices}
              tierName={tier.tier}
            />
          ))}

        </ul>
      </span>
    );
  };

  const renderEditing = () => {
    return (
      <div className="flex flex-1 w-full justify-center gap-4 flex-col">
      
        {updatedCustomPrices.values.prices.map((_, index) => (
          <PriceEdit
            updatedCustomPrices={updatedCustomPrices}
            // onSetUpdatedCustomPrices={onSetUpdatedCustomPrices}
            index={index}
            key={index}
          />
        ))}

        <Button
          onClick={() =>
            updatedCustomPrices.addListItem("prices", {
              tier: "",
              price: 1,
              pricingMethod: "hour(s)",
              mod: 1,
            })
          }
        >
          +
        </Button>

        <Button onClick={saveChanges}>Save</Button>

        <Button onClick={() => toggleResetModal(true)}>Reset</Button>

        <Button onClick={() => toggleDeleteModal(true)}>Delete pricing method</Button>
      </div>
    );
  };

  const renderEditButton = () => <Button onClick={() => setIsEditing(true)}>Edit</Button>;

  const addNewPricingMethod = () => {
    dispatch(setPriceMode(newPricingMethodName));

    dispatch(
      setCustomPrices({
        ...customPrices,
        [newPricingMethodName]: [{ tier: "Tier1", price: 1, pricingMethod: "per mile", mod: 1 }],
      })
    );

    setNewPricingMethodName("");

    toggleNewPricingMethodModal(false);
  };

  const closeNewPricingMethodDialogue = () => {
    dispatch(setPriceMode("ERLW (5E) - per mile"));

    setNewPricingMethodName("");

    toggleNewPricingMethodModal(false);
  };

  return (
    <div className="flex flex-1 w-full justify-center gap-4 flex-col">
      <Modal opened={newPricingMethodModal} withCloseButton={false} centered onClose={closeNewPricingMethodDialogue}>
        <TextInput
          label="Please, name your new pricing method"
          placeholder="My homebrew pricing method"
          required
          value={newPricingMethodName}
          onChange={(event) => setNewPricingMethodName(event.target.value)}
        />

        <Button onClick={addNewPricingMethod}>Save</Button>

        <Button onClick={closeNewPricingMethodDialogue}>Close</Button>
      </Modal>

      <Dialogue
        opened={deleteModal}
        text={"Are you sure you want to delete? This action is irreversible!"}
        onYes={deletePricingMethod}
        onNo={() => toggleDeleteModal(false)}
      />

      <Dialogue
        opened={resetModal}
        text={"Are you sure you want to reset? All unsaved changes will be lost!"}
        onYes={resetChanges}
        onNo={() => toggleResetModal(false)}
      />

      {isEditing && renderEditing()}

      {!isEditing && !Object.keys(basePrices).includes(priceMode) && renderEditButton()}

      {renderPrices()}
    </div>
  );
};

export default Price;
