import { Text, View } from 'react-native'

function AddNewScreen() {
  return (
    <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "800", fontSize: 30 }}>Add new Screen</Text>
        </View>
  )
}

export default AddNewScreen
