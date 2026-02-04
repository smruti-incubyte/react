import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../day3/Counter';

describe('Counter Component', () => {
    it('renders counter with initial value of 0', () => {
        render(<Counter />);
        const countDisplay = screen.getByText('0');
        expect(countDisplay).not.toBeNull();
    });

    it('increments count when increment button is clicked', () => {
        render(<Counter />);

        const incrementBtn = screen.getByRole('button', { name: /increment/i });
        fireEvent.click(incrementBtn);

        expect(screen.getByText('1')).not.toBeNull();
    });

    it('decrements count when decrement button is clicked', () => {
        render(<Counter />);

        const decrementBtn = screen.getByRole('button', { name: /decrement/i });
        fireEvent.click(decrementBtn);

        expect(screen.getByText('-1')).not.toBeNull();
    });

    it('increments and decrements multiple times', () => {
        render(<Counter />);

        const incrementBtn = screen.getByRole('button', { name: /increment/i });
        const decrementBtn = screen.getByRole('button', { name: /decrement/i });

        fireEvent.click(incrementBtn);
        fireEvent.click(incrementBtn);
        expect(screen.getByText('2')).not.toBeNull();

        fireEvent.click(decrementBtn);
        expect(screen.getByText('1')).not.toBeNull();
    });
});
