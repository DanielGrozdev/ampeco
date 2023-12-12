import { Platform } from "react-native";
import { setDataArray } from "../store/reducers";
import { Pin } from "../store/types";

const getPins = async (dispatch: Function) => {
  try {
    const HOST = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

    const response = await fetch(`http://${HOST}:8080/pins`);
    if (response.ok) {
      const data: Pin[] = await response.json();
      dispatch(setDataArray(data));
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default getPins;
