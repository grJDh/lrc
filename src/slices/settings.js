import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;

const baseState = {
  priceMode: 'All',
  distanceSource: '4E',
  speed: 30,
  layover: 1,
  coloredPrices: true,
  customRails: [
    ['Thaliost', "Rekkenmark", 27],
    ['Vedykar', "Vulyar", 147],
    ['Vulyar', "Gatherhold", 302]
  ],
  customPrices: {
    'Custom - per mile': [
      {tier: 'Flat', price: 0.01, pricingMethod:'per mile', mod: 1},
    ],
    'Custom - per hour': [
      {tier: 'Standard', price: 1, pricingMethod:'per hour', mod: 24},
    ]
  },
};

const localState = checkLocalStorage('settingsStore', baseState);

const initialState = {...baseState, ...localState};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPriceMode: (state, { payload }) => {
      state.priceMode = payload;
    },
    setDistanceSource: (state, { payload }) => {
      state.distanceSource = payload;
    },
    setSpeed: (state, { payload }) => {
      state.speed = payload;
    },
    setLayover: (state, { payload }) => {
      state.layover = payload;
    },
    setCustomRails: (state, { payload }) => {
      state.customRails = payload;
    },
    setCustomPrices: (state, { payload }) => {
      state.customPrices = payload;
    },
    ColorPricesChange: state => {
      state.coloredPrices = !state.coloredPrices;
    },
  }
});

export const { setPriceMode, setDistanceSource, setSpeed, setCustomRails, setLayover, setCustomPrices, ColorPricesChange } = settingsSlice.actions;

export const settingsSelector = state => state.settings;

export default settingsSlice.reducer;