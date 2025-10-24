import { render } from '@testing-library/react';

import InterviewGeniusUi from './ui';

describe('InterviewGeniusUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InterviewGeniusUi />);
    expect(baseElement).toBeTruthy();
  });
});
