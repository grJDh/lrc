import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mainSelector } from "slices/main";
import { settingsSelector, setCustomPrices, setPriceMode, setIsEditingPrice } from "slices/settings";

import { Text, Button, Select, Modal, TextInput } from "@mantine/core";
import { useForm, formList } from "@mantine/form";

import PriceTier from "components/PriceTier";
import PriceEdit from "components/PriceEdit";
import Dialogue from "components/Dialogue";

const Price = () => {
  const dispatch = useDispatch();

  const { distance, basePrices } = useSelector(mainSelector);
  const { priceMode, speed, customPrices, discount, coloredPrices, isEditingPrice } = useSelector(settingsSelector);

  const combinedPrices = { ...basePrices, ...customPrices };
  const pricingList = [...Object.keys(combinedPrices), "+"];

  const [resetModal, toggleResetModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);

  const [newPricingMethodModal, toggleNewPricingMethodModal] = useState(false);
  const [newPricingMethodName, setNewPricingMethodName] = useState("");

  const containerStyle = "flex flex-col items-center justify-start large:mx-4 "
  + ((isEditingPrice)
  ? "w-full"
  : "large:w-1/2 w-full")

  const onPriceModeChange = (value) => {
    if (value === "+") toggleNewPricingMethodModal(true);
    else {
      dispatch(setPriceMode(value));

      updatedCustomPrices.setValues({
        prices: formList([...combinedPrices[value]]),
      });
    } 
  };

  const updatedCustomPrices = useForm({
    initialValues: {
      prices: formList([...combinedPrices[priceMode]]),
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

    dispatch(setIsEditingPrice(false));
    toggleDeleteModal(false);
  };

  const saveChanges = () => {

    dispatch(
      setCustomPrices({
        ...customPrices,
        [priceMode]: updatedCustomPrices.values.prices,
      })
    );

    // const bla = {
    //   Custom: [
    //     {
    //       tier: "First Class",
    //       price: 25,
    //       pricingMethod: "per hour",
    //       mod: 24,
    //     },
    //     {
    //       tier: "Sleeping",
    //       price: 6,
    //       pricingMethod: "per hour",
    //       mod: 24,
    //     },
    //     {
    //       tier: "Seating",
    //       price: 4,
    //       pricingMethod: "per hour",
    //       mod: 24,
    //     },
    //     {
    //       tier: "Steerage",
    //       price: 1,
    //       pricingMethod: "per hour",
    //       mod: 24,
    //     },
    //   ],
    // };

    // dispatch(setCustomPrices(bla));

    dispatch(setIsEditingPrice(false));
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

  const renderPrices = () => {
    return (
      <div className="flex flex-col items-center w-full">
        <Text weight={500} underline style={{ fontSize: "25px" }} className="-mt-3.5 w-full">
          <Select data={pricingList} label="Pricing method" onChange={onPriceModeChange} value={priceMode} />
        </Text>

        <ul className="pl-5 my-4">
          {combinedPrices[priceMode].map((tier) => (
            <PriceTier
              key={priceMode + tier.tier}
              formattedPrice={calculateAndFormatPrice(tier)}
              coloredPrices={coloredPrices}
              tierName={tier.tier}
            />
          ))}
        </ul>

        {!isEditingPrice && !Object.keys(basePrices).includes(priceMode) &&
          <Button onClick={() => dispatch(setIsEditingPrice(true))}>Edit</Button>
        }
      </div>
    )
  };

  const renderEditing = () => {
    return (
      <div className="flex w-full justify-center gap-4 flex-col">
      
        {updatedCustomPrices.values.prices.map((tier, index) => (
          <div key={index} className="flex items-end justify-between">
            <PriceEdit
              updatedCustomPrices={updatedCustomPrices}
              // onSetUpdatedCustomPrices={onSetUpdatedCustomPrices}
              index={index}
            />

            <PriceTier
              formattedPrice={calculateAndFormatPrice(tier)}
              coloredPrices={coloredPrices}
              tierName={''}
              isList={false}
            />
          </div>
        ))}

        <Button
          onClick={() =>
            updatedCustomPrices.addListItem("prices", {
              tier: "",
              price: 1,
              pricingMethod: "per hour",
              mod: 1,
            })  
          }
        >
          +
        </Button>

        <div className="flex justify-evenly">
          <Button onClick={saveChanges}>Save</Button>

          <Button onClick={() => toggleResetModal(true)}>Reset</Button>

          <Button onClick={() => toggleDeleteModal(true)}>Delete pricing method</Button>
        </div>
      </div>
    );
  };

  const addNewPricingMethod = () => {
    dispatch(setPriceMode(newPricingMethodName));

    dispatch(
      setCustomPrices({
        ...customPrices,
        [newPricingMethodName]: [{ tier: "Tier1", price: 1, pricingMethod: "per mile", mod: 1 }],
      })
    );

    // console.log(combinedPrices)

    updatedCustomPrices.setValues({
      prices: formList([{ tier: "Tier1", price: 1, pricingMethod: "per mile", mod: 1 }]),
    });

    setNewPricingMethodName("");

    toggleNewPricingMethodModal(false);
  };

  const closeNewPricingMethodDialogue = () => {
    dispatch(setPriceMode("ERLW (5E) - per mile"));

    setNewPricingMethodName("");

    toggleNewPricingMethodModal(false);
  };

  return (
    <div className={containerStyle}>
      <Text style={{ fontSize: '30px' }} className="mb-1">
        Price:
      </Text>

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

      {!isEditingPrice && renderPrices()}

      {isEditingPrice && renderEditing()}
    </div>
  );
};

export default Price;
