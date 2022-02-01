import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import { render } from "./utils/testUtils";
import { App } from "./App";

beforeEach(() => {
  render(<App />);
});

afterEach(cleanup);

const setup = () => {
  const utils = render(<App />);
  const inputCartValue = screen.getAllByLabelText(/Cart Value/i);
  const inputDistance = screen.getAllByLabelText(/Delivery Distance/i);
  const inputItems = screen.getAllByLabelText(/Amount of Items/i);
  const inputDate = screen.getAllByLabelText(/Delivery Date/i);
  const finalPrice = screen.getAllByLabelText(/price/i);

  return {
    inputCartValue,
    inputDistance,
    inputItems,
    finalPrice,
    inputDate,
    utils,
  };
};

test("should add cart value", () => {
  const { inputCartValue } = setup();
  fireEvent.change(inputCartValue[0], { target: { value: 10 } });
  expect(inputCartValue[0]).toHaveValue(10);
});

test("should add distance in meters", () => {
  const { inputDistance } = setup();
  fireEvent.change(inputDistance[0], { target: { value: 1000 } });
  expect(inputDistance[0]).toHaveValue(1000);
});

test("should add amount of items", () => {
  const { inputItems } = setup();
  fireEvent.change(inputItems[0], { target: { value: 4 } });
  expect(inputItems[0]).toHaveValue(4);
});

test("should add delivery date", () => {
  const { inputDate } = setup();
  fireEvent.change(inputDate[0], { target: { value: "2022-06-01T10:00" } });
  expect(inputDate[0]).toHaveValue("2022-06-01T10:00");
});

test("renders final price of calculation", () => {
  const { finalPrice, inputCartValue, inputDistance, inputItems, inputDate } = setup();
  fireEvent.change(inputCartValue[0], { target: { value: 10 } });
  fireEvent.change(inputDistance[0], { target: { value: 1000 } });
  fireEvent.change(inputItems[0], { target: { value: 4 } });
  fireEvent.change(inputDate[0], { target: { value: "2022-06-01T10:00" } });
  waitFor(() => expect(finalPrice[0]).toHaveTextContent("12.00 €"));
});

test("renders portfolio link", () => {
  const linkElement = screen.getByText(/Alejandro De León/i);
  expect(linkElement).toBeInTheDocument();
});
