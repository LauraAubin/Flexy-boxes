import React, {useState} from 'react';

import {
  Box,
  Card,
  Checkbox,
  Divider,
  Layout,
  Page,
  RangeSlider,
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

enum JustifyContent {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around',
  SpaceEvenly = 'space-evenly',
}

enum AlignContent {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  Stretch = 'stretch',
}

const MIN_WIDTH_FIELD = '120px';

export default function App() {
  const [playgroundHeight, setPlaygroundHeight] = useState(200);

  const [boxWidth, setBoxWidth] = useState(Width.Auto);
  const [boxDisplayProperty, setBoxDisplayProperty] = useState(Display.Block);

  const [containerDisplayProperty, containerBoxDisplayProperty] = useState(
    Display.Block
  );
  const [boxCount, setBoxCount] = useState('1');
  const [wrap, setWrap] = useState(false);
  const [justifyContent, setJustifyContent] = useState(
    JustifyContent.FlexStart
  );
  const [alignContent, setAlignContent] = useState(AlignContent.FlexStart);

  const handlePlaygroundHeight = (value: number) => {
    setPlaygroundHeight(value);
  };

  const handleBoxCount = (value: string) => {
    setBoxCount(value);
  };

  const handleContainerDisplay = (value: Display) => {
    containerBoxDisplayProperty(value);
  };

  const handleBoxDisplay = (value: Display) => {
    setBoxDisplayProperty(value);
  };

  const handleBoxWidth = (value: Width) => {
    setBoxWidth(value);
  };

  const handleWrap = (value: boolean) => {
    setWrap(value);
  };

  const handleJustifyContent = (value: JustifyContent) => {
    setJustifyContent(value);
  };

  const handleAlignContent = (value: AlignContent) => {
    setAlignContent(value);
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
        <VerticalStack gap="2">
          <Card padding="0">
            <div
              style={{
                display: containerDisplayProperty,
                flexWrap: `${wrap ? 'wrap' : 'nowrap'}`,
                justifyContent: justifyContent,
                alignContent: alignContent,
                height: playgroundHeight,
                margin: '8px',
                background: 'rgba(0, 128, 128, 0.1)',
                borderRadius: '10px',
              }}
            >
              {renderBoxes()}
            </div>
          </Card>
          <Card background="bg-subdued" padding="300">
            <RangeSlider
              label="Playground height"
              value={playgroundHeight}
              onChange={handlePlaygroundHeight}
              min={30}
              max={500}
              prefix={`${playgroundHeight}px`}
              suffix="500px"
            />
          </Card>
        </VerticalStack>
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
                        onChange={handleBoxWidth}
                        options={[Width.Auto, Width.FitContent, Width.Max]}
                      />
                    </Box>

                    <Box width="100%">
                      <Select
                        label="Display"
                        value={boxDisplayProperty}
                        onChange={handleBoxDisplay}
                        options={[Display.Inline, Display.Block, Display.Flex]}
                        helpText="Default: block"
                      />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>
              </Card>

              <Card>
                <VerticalStack gap="5">
                  <Text as="h2" variant="headingMd">
                    Container properties
                  </Text>
                  <HorizontalStack gap="4" wrap={false}>
                    <Box minWidth={MIN_WIDTH_FIELD}>
                      <TextField
                        label="Box count"
                        value={boxCount}
                        onChange={handleBoxCount}
                        autoComplete="off"
                        type="number"
                        min="0"
                        selectTextOnFocus
                      />
                    </Box>

                    <Box width="100%">
                      <Select
                        label="Display"
                        value={containerDisplayProperty}
                        onChange={handleContainerDisplay}
                        options={[Display.Inline, Display.Block, Display.Flex]}
                        helpText="Default: block"
                      />
                    </Box>
                  </HorizontalStack>

                  <Divider />

                  <HorizontalStack gap="4" wrap={false}>
                    <Box width="100%">
                      <Select
                        label="Justify content (horizontal)"
                        value={justifyContent}
                        onChange={handleJustifyContent}
                        options={[
                          JustifyContent.FlexStart,
                          JustifyContent.FlexEnd,
                          JustifyContent.Center,
                          JustifyContent.SpaceBetween,
                          JustifyContent.SpaceAround,
                          JustifyContent.SpaceEvenly,
                        ]}
                      />
                    </Box>

                    <Box width="100%">
                      <Select
                        label="Align content (vertical)"
                        value={alignContent}
                        onChange={handleAlignContent}
                        options={[
                          AlignContent.FlexStart,
                          AlignContent.FlexEnd,
                          AlignContent.Center,
                          AlignContent.Stretch,
                        ]}
                      />
                    </Box>
                  </HorizontalStack>

                  <Divider />

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
