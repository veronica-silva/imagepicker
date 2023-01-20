import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [photo, setPhoto] = useState();
  useEffect(() => {
    async function verPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verPermissoes();
  });

  const acessaCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(imagem);
    setPhoto(imagem.assets[0].uri);
  };

  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 300, height: 200 }} />
        )}
        <Button title="acessar câmera" onPress={acessaCamera} />
      </View>
    </>
  );
}
