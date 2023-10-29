import React, {useState} from 'react';

import {Card, Page, Select, VerticalStack, AppProvider} from '@shopify/polaris';

import './App.scss';

enum Display {
  Block = 'block',
  Inline = 'inline',
  Flex = 'flex',
}

export default function App() {
  const [color] = useState('teal');

  return (
    <AppProvider i18n={[]}>
      <Page title="">
        <Card>
          <Box />
        </Card>
      </Page>
    </AppProvider>
  );
}

function Box() {
  const [boxCount, setBoxCount] = useState(1);
  const [boxDisplayProperty, setBoxDisplayProperty] = useState(Display.Inline);

  const renderBoxes = () => {
    for (let i = 0; i < boxCount; i++) {
      return (
        <div className="Box" style={{display: boxDisplayProperty}}>
          Box {boxCount}
        </div>
      );
    }
  };

  const handleBoxDisplayOnChange = (value: Display) => {
    setBoxDisplayProperty(value);
  };

  return (
    <VerticalStack gap="2">
      {renderBoxes()}

      <Select
        label="Display"
        value={boxDisplayProperty}
        onChange={handleBoxDisplayOnChange}
        options={[Display.Inline, Display.Block, Display.Flex]}
      />
    </VerticalStack>
  );
}
