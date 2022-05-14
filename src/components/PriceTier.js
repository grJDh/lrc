import { Text } from '@mantine/core';

const PriceTier = ({ formattedPrice, coloredPrices, tierName, isList=true }) => {

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

  const componentType = (isList) ? "li" : "";
  const align = (isList) ? "left" : "right";

  return (
    <Text component={componentType} align={align} style={{ fontSize: '25px', listStyleType: 'circle', minWidth: "200px"}}>
      <Text component="span" style={{ fontSize: '25px' }} className="">
        {(isList) && tierName + ': '}
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
  );
}

export default PriceTier;
