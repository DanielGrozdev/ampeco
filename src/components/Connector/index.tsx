import { View, ScrollView, Text, StyleSheet } from "react-native";
import { statusType, connectorType } from "../../store/types";

const Connector = ({ currentMarker }: any) => {
  const { title, _id, latitude, longitude, connectors } = currentMarker;

  return (
    <ScrollView>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.element}>
        <Text style={styles.info}>ID: {_id}</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.info}>Latitude: {latitude}</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.info}>Longitude: {longitude}</Text>
      </View>

      <View style={styles.connectors}>
        <Text style={styles.title}>Connectors: </Text>
        {connectors.map(
          (
            connector: {
              status: statusType;
              type: connectorType;
            },
            index: number
          ) => (
            <View key={index} style={styles.connectorElement}>
              <View style={styles.element}>
                <Text
                  style={
                    connector.status === "unavailable"
                      ? styles.unavailable
                      : styles.available
                  }
                >
                  Current status: {connector.status}
                </Text>
              </View>
              <View style={styles.element}>
                <Text style={styles.connectorInfo}>Type: {connector.type}</Text>
              </View>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingBottom: 20,
    color: "#17539A",
  },
  element: {
    paddingVertical: 5,
  },
  info: {
    fontSize: 16,
  },
  connectors: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 60,
  },
  connectorElement: {
    borderBottomColor: "#0000002E",
    borderBottomWidth: 1,
    backgroundColor: "#00000008",
    marginTop: 2,
    padding: 5,
  },
  connectorInfo: {
    fontSize: 16,
  },
  available: {
    fontSize: 16,
    color: "green",
  },
  unavailable: {
    fontSize: 16,
    color: "red",
  },
});

export default Connector;
