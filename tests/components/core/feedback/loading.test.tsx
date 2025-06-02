import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from 'showed/components/core/feedback/loading';
import { act } from 'react';

describe('Loading Component', () => {
    it('renders the spinner when isLoading is true', async () => {
        await act(async () =>
            render(
                <Loading isLoading={true}>
                    <div>Content</div>
                </Loading>
            )
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the children when isLoading is false', async () => {
        await act(async () =>
            render(
                <Loading isLoading={false}>
                    <div>Content</div>
                </Loading>
            )
        );

        expect(screen.getByText('Content')).toBeInTheDocument();
    });
});
