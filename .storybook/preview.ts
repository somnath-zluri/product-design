import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        'w-1200': {
          name: 'Desktop W-1200',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
};

export default preview;

