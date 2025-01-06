import { ActivityIndicator, View } from 'react-native'
import React from 'react'

const LoadData = () => {
  return (
    <View className="flex-1 justify-center items-center bg-MainBackgroundColor">
        <ActivityIndicator size="large" color="white" />
      </View>
  )
}

export default LoadData;