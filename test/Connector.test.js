import React from "react";
import { render } from "@testing-library/react-native";
import Connector from "../src/components/Connector";

describe("Connector component", () => {
  const mockData = {
    title: "Test Title",
    _id: "12345",
    latitude: 40.7128,
    longitude: -74.006,
    connectors: [
      { status: "available", type: "Type A" },
      { status: "unavailable", type: "Type B" },
    ],
  };

  test("renders component with provided props", () => {
    const { getByText } = render(
      <Connector
        currentMarker={{
          title: mockData.title,
          _id: mockData._id,
          latitude: mockData.latitude,
          longitude: mockData.longitude,
          connectors: mockData.connectors,
        }}
      />
    );

    expect(getByText(`${mockData.title}`)).toBeDefined();
    expect(getByText(`ID: ${mockData._id}`)).toBeDefined();
    expect(getByText(`Latitude: ${mockData.latitude}`)).toBeDefined();
    expect(getByText(`Longitude: ${mockData.longitude}`)).toBeDefined();
    expect(
      getByText(`Current status: ${mockData.connectors[0].status}`)
    ).toBeDefined();
    expect(
      getByText(`Current status: ${mockData.connectors[1].status}`)
    ).toBeDefined();
    expect(getByText(`Type: ${mockData.connectors[0].type}`)).toBeDefined();
    expect(getByText(`Type: ${mockData.connectors[1].type}`)).toBeDefined();
  });
});
