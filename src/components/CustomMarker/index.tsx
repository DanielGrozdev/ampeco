import { CustomMarkerType } from "../../store/types";
import { View } from "react-native";
import PinImage from "../../assets/pin.svg";

const CustomMarker: React.FC<CustomMarkerType> = () => {
  return (
    <View>
      <PinImage width={40} height={40} />
    </View>
  );
};

export default CustomMarker;
