import { AppState, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CameraView } from 'expo-camera';
import { Overlay } from '@/src/components/smallHelping/Overlay';

const cameraView = () => {
    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
          ) {
            qrLock.current = false;
          }
          appState.current = nextAppState;
        });
    
        return () => {
          subscription.remove();
        };
      }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              console.log(data);
              
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  )
}

export default cameraView

const styles = StyleSheet.create({})