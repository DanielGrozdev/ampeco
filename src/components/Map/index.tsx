import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView from "react-native-map-clustering";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { BottomSheet } from "@rneui/themed";
import { INITIAL_REGION, MAP_STYLE } from "../../consts";
import getPins from "../../services";
import { Pin, Marker as MarkerType, stateType } from "../../store/types";
import CustomMarker from "../CustomMarker";
import Connector from "../Connector";

const Map = () => {
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<Pin>();

  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const pins = useSelector((state: stateType) => state.data.dataArray.data);

  const handleRegionChangeComplete = (region: MarkerType) => {
    if (pins?.length > 0) {
      //Only display visible markers
      const filteredMarkers = pins?.filter((marker: MarkerType) => {
        return (
          marker.latitude <= region.latitude + region.latitudeDelta / 2 &&
          marker.latitude >= region.latitude - region.latitudeDelta / 2 &&
          marker.longitude <= region.longitude + region.longitudeDelta / 2 &&
          marker.longitude >= region.longitude - region.longitudeDelta / 2
        );
      });

      setVisibleMarkers(filteredMarkers);
    }
  };

  useEffect(() => {
    getPins(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {pins?.length > 0 ? (
          <MapView
            ref={mapRef}
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            customMapStyle={MAP_STYLE}
            onMapReady={() => handleRegionChangeComplete(INITIAL_REGION)}
            onRegionChangeComplete={(region: MarkerType) =>
              handleRegionChangeComplete(region)
            }
            clusterColor="#17539A"
          >
            {visibleMarkers?.map((marker: Pin) => (
              <Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => {
                  setCurrentMarker(marker);
                  setIsVisible(true);
                }}
              >
                <CustomMarker pin={marker} />
              </Marker>
            ))}
          </MapView>
        ) : null}
      </View>

      <BottomSheet
        containerStyle={styles.bottomSheet}
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
      >
        {currentMarker ? (
          <View style={styles.sheetContainer}>
            <Connector currentMarker={currentMarker} />
          </View>
        ) : null}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheet: {
    backgroundColor: "#00000000",
  },
  sheetContainer: {
    height: 300,
    marginTop: 30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    paddingVertical: 20,
    shadowColor: "#00000045",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default Map;
