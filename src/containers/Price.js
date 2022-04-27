import { useSelector } from 'react-redux';

import { mainSelector } from '../slices/main';
import { settingsSelector } from '../slices/settings';

import { Text } from '@mantine/core';

const Price = () => {

  const { distance, basePrices } = useSelector(mainSelector);
  const { priceMode, speed, customPrices, coloredPrices } = useSelector(settingsSelector);

  const combinedPrices = {...basePrices, ...customPrices};

  const colorPrices = p => {
    const shadowColor = 'black 0px 0px 30px';

    if (coloredPrices) {
      switch (p) {
        case 'gold':
          return {color: 'gold', textShadow: shadowColor, fontSize: '25px'}
        case 'silver':
          return {color: 'silver', textShadow: shadowColor, fontSize: '25px'}
        case 'copper':
          return {color: '#da8932', textShadow: shadowColor, fontSize: '25px'}
        default:
          return {color: '#c1c2c5', fontSize: '25px'}
      }
    }

    return {color: '#c1c2c5', fontSize: '25px'}
  }

  const returnPrice = style => {
    const price = (style.pricingMethod === 'per mile')
    ? distance * style.price / style.mod
    : distance / speed / style.mod * style.price;

    return [
      Math.trunc(price),
      Math.trunc(price % 1 * 10),
      Math.trunc(price % 1 * 10 % 1 * 10)
    ]
  }

  const renderPrices = method => {
    return (
      <Text component="li" style={{ fontSize: '25px', listStyleType: 'disc' }} key={method}>
        {method}:
        <ul className='pl-5'>
          {combinedPrices[method].map(style => {
            const formattedPrice = returnPrice(style);
            return (
              <Text component="li" key={method+style.tier} style={{ fontSize: '25px', listStyleType: 'circle' }}>
                <Text component="span" style={{ fontSize: '25px' }}>
                  {style.tier + ': '}
                </Text>
                <Text component="span" style={colorPrices('gold')} weight={700}>
                  {formattedPrice[0] ? formattedPrice[0] + 'gp ' : ''}
                </Text>
                <Text component="span" style={colorPrices('silver')} weight={700}>
                  {formattedPrice[1] ? formattedPrice[1] + 'sp ' : ''}
                </Text>
                <Text component="span" style={colorPrices('copper')} weight={700}>
                  {formattedPrice[2] ? formattedPrice[2] + 'cp ' : ''}
                </Text>
              </Text>
            )})}
        </ul>
      </Text>
    )
  }

  return (
    <div className='flex flex-1 w-full justify-center gap-4'>
      <ul>
       {Object.keys(combinedPrices).map(method => (priceMode === 'All' || priceMode === method) && renderPrices(method))}
        {/* {(priceMode === 'All' || priceMode !== "Custom") && Object.keys(basePrices).map(method => renderPrices(method))}
        {(priceMode === 'All' || priceMode === "Custom") && Object.keys(customPrices).map(method => renderPrices(method))} */}
      </ul>
    </div>
  );
}

export default Price;
