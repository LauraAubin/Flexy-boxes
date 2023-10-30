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

enum Width {
  Auto = 'auto',
  FitContent = 'fit-content',
  Max = '100%',
}

const MIN_WIDTH_FIELD = '120px';

export default function App() {
  const [boxWidth, setBoxWidth] = useState(Width.Auto);
  const [boxDisplayProperty, setBoxDisplayProperty] = useState(Display.Block);

  const [containerDisplayProperty, containerBoxDisplayProperty] = useState(
    Display.Block
  );
  const [boxCount, setBoxCount] = useState('1');
  const [wrap, setWrap] = useState(false);

  const handleBoxCountChange = (value: string) => {
    setBoxCount(value);
  };

  const handleContainerDisplayChange = (value: Display) => {
    containerBoxDisplayProperty(value);
  };

  const handleBoxDisplayChange = (value: Display) => {
    setBoxDisplayProperty(value);
  };

  const handleBoxWidthChange = (value: Width) => {
    setBoxWidth(value);
  };

  const handleWrap = (value: boolean) => {
    setWrap(value);
  };

  function RenderBoxes() {
    const renderBoxes = () => {
      const boxes = [];

      for (let i = 0; i < Number(boxCount); i++) {
        boxes.push(
          <div
            key={i}
            className="Box"
            style={{display: boxDisplayProperty, width: boxWidth}}
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
          <div
            style={{
              display: containerDisplayProperty,
              flexWrap: `${wrap ? 'wrap' : 'nowrap'}`,
            }}
          >
            {renderBoxes()}
          </div>
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

                  <HorizontalStack gap="4" wrap={false}>
                    <Box minWidth={MIN_WIDTH_FIELD}>
                      <Select
                        label="Width"
                        value={boxWidth}
                        onChange={handleBoxWidthChange}
                        options={[Width.Auto, Width.FitContent, Width.Max]}
                      />
                    </Box>

                    <Box width="100%">
                      <Select
                        label="Display"
                        value={boxDisplayProperty}
                        onChange={handleBoxDisplayChange}
                        options={[Display.Inline, Display.Block, Display.Flex]}
                        helpText="Default: block"
                      />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>
              </Card>

              <Card>
                <VerticalStack gap="4">
                  <Text as="h2" variant="headingMd">
                    Container properties
                  </Text>
                  <HorizontalStack gap="4" wrap={false}>
                    <Box minWidth={MIN_WIDTH_FIELD}>
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

                  <Checkbox
                    label="Allow flex wrapping"
                    checked={wrap}
                    onChange={handleWrap}
                  />
                </VerticalStack>
              </Card>
            </VerticalStack>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}
