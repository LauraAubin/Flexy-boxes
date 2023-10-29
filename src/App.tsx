import React, {useState} from 'react';

import {
  Box,
  Card,
  Checkbox,
  Layout,
  Page,
  Select,
  Text,
  TextField,
  AppProvider,
  HorizontalStack,
  VerticalStack,
} from '@shopify/polaris';

import './App.scss';

enum Display {
  Block = 'block',
  Inline = 'inline',
  Flex = 'flex',
}

export default function App() {
  const [boxDisplayProperty, setBoxDisplayProperty] = useState(Display.Block);

  const [boxCount, setBoxCount] = useState('2');
  const [containerDisplayProperty, containerBoxDisplayProperty] = useState(
    Display.Block
  );

  const handleBoxCountChange = (value: string) => {
    setBoxCount(value);
  };

  const handleContainerDisplayChange = (value: Display) => {
    containerBoxDisplayProperty(value);
  };

  const handleBoxDisplayChange = (value: Display) => {
    setBoxDisplayProperty(value);
  };

  function RenderBoxes() {
    const renderBoxes = () => {
      const boxes = [];

      for (let i = 0; i < Number(boxCount); i++) {
        boxes.push(
          <div
            className="Box"
            style={{display: boxDisplayProperty, width: 'fit-content'}}
          >
            Box {i + 1}
          </div>
        );
      }
      return boxes;
    };

    return (
      <Layout.Section oneThird>
        <Card padding="300">
          <div style={{display: containerDisplayProperty}}>{renderBoxes()}</div>
        </Card>
      </Layout.Section>
    );
  }

  return (
    <AppProvider i18n={[]}>
      <Page title="Flexy boxes playground" fullWidth>
        <Layout>
          <RenderBoxes />

          <Layout.Section oneThird>
            <VerticalStack gap="4">
              <Card>
                <VerticalStack gap="4">
                  <Text as="h2" variant="headingMd">
                    Box properties
                  </Text>

                  <Box width="100%">
                    <Select
                      label="Display"
                      value={boxDisplayProperty}
                      onChange={handleBoxDisplayChange}
                      options={[Display.Inline, Display.Block, Display.Flex]}
                      helpText="Default: block"
                    />
                  </Box>
                </VerticalStack>
              </Card>

              <Card>
                <VerticalStack gap="4">
                  <Text as="h2" variant="headingMd">
                    Container properties
                  </Text>

                  <HorizontalStack gap="4" wrap={false}>
                    <Box maxWidth="150px">
                      <TextField
                        label="Box count"
                        value={boxCount}
                        onChange={handleBoxCountChange}
                        autoComplete="off"
                        type="number"
                        selectTextOnFocus
                      />
                    </Box>

                    <Box width="100%">
                      <Select
                        label="Display"
                        value={containerDisplayProperty}
                        onChange={handleContainerDisplayChange}
                        options={[Display.Inline, Display.Block, Display.Flex]}
                        helpText="Default: block"
                      />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>
              </Card>
            </VerticalStack>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}
