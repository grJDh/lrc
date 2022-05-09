import { Text } from '@mantine/core';

const PriceTierOutput = ({ formattedPrice, coloredPrices, tierName }) => {

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

  return (
    <Text component="li" style={{ fontSize: '25px', listStyleType: 'circle' }}>
      <Text component="span" style={{ fontSize: '25px' }}>
        {tierName + ': '}
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

export default PriceTierOutput;
