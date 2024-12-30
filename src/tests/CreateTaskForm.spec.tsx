import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateTaskForm from "../components/CreateTaskForm";

describe("CreateTaskForm", () => {
  const mockOnNewTask = jest.fn();

  test("renderiza el formulario correctamente", () => {
    render(<CreateTaskForm onNewTask={mockOnNewTask} isLoading={false} />);

    expect(screen.getByLabelText(/Título de la tarea/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Descripción de la tarea/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /crear tarea/i })
    ).toBeInTheDocument();
  });

  test("muestra un error si el título está vacío", () => {
    render(<CreateTaskForm onNewTask={mockOnNewTask} isLoading={false} />);

    const inputTitle = screen.getByLabelText(/Título de la tarea/i);
    fireEvent.change(inputTitle, { target: { value: "H" } });
    fireEvent.change(inputTitle, { target: { value: "" } });

    expect(screen.getByText(/El título es requerido/i)).toBeInTheDocument();
  });
});
