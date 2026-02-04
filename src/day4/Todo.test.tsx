import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoList from "./TodoList";

describe('TodoList Component', () => {
    it('renders with empty todo list on initial state', () => {
        render(<TodoList />);
        const heading = screen.getByRole('heading', { name: /todo list/i });
        expect(heading).not.toBeNull();
    });

    it('adds a todo string and checks it exists', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'Buy groceries' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Buy groceries')).not.toBeNull();
    });

    it('adds multiple todos', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'First todo' } });
        fireEvent.click(addButton);

        fireEvent.change(input, { target: { value: 'Second todo' } });
        fireEvent.click(addButton);

        expect(screen.getByText('First todo')).not.toBeNull();
        expect(screen.getByText('Second todo')).not.toBeNull();
    });

    it('clears input after adding a todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'Test todo' } });
        fireEvent.click(addButton);

        expect(input.value).toBe('');
    });

    it('adds todo on Enter key press', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'Enter todo' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(screen.getByText('Enter todo')).not.toBeNull();
        expect(input.value).toBe('');
    });

    it('deletes a todo when delete button is clicked', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'Todo to delete' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Todo to delete')).not.toBeNull();

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        expect(screen.queryByText('Todo to delete')).toBeNull();
    });

    it('marks a todo as complete when checkbox is clicked', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'Complete this' } });
        fireEvent.click(addButton);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);

        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
    });

    it('does not add empty todos', () => {
        render(<TodoList />);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.click(addButton);

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBe(0);
    });
});