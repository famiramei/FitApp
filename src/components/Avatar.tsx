"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, Alert, Image, Button } from "react-native"
import * as ImagePicker from "expo-image-picker"

interface Props {
  size: number
  url: string | null
  onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      // In a real app, you would fetch the image from your backend
      // For now, we'll just set the URL directly
      setAvatarUrl(path)
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message)
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)

      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "You need to allow access to your photos to upload an avatar.")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.")
        return
      }

      const image = result.assets[0]
      console.log("Got image", image)

      if (!image.uri) {
        throw new Error("No image uri!")
      }

      // In a real app, you would upload the image to your backend
      // For now, we'll just pass the URI to the parent component
      onUpload(image.uri)
      setAvatarUrl(image.uri)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View style={styles.buttonContainer}>
        <Button title={uploading ? "Uploading ..." : "Upload"} onPress={uploadAvatar} disabled={uploading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 75,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 75,
  },
  buttonContainer: {
    marginTop: 10,
  },
})
