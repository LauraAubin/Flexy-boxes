import React, {useState} from 'react';
import './App.scss';

import {LegacyCard, Page, AppProvider} from '@shopify/polaris';

export default function App() {
  const [color] = useState('teal');

  return (
    <AppProvider i18n={[]}>
      <Page title="This is made using Create React App">
        <LegacyCard title="This is a card thanks to Polaris ⭐️">
          <LegacyCard.Section>
            <div className={color}>
              This text is {color.toLowerCase()} thanks to Sass 💅and Typescript
              😄
            </div>
          </LegacyCard.Section>
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}
