import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/src/context/AuthProvider'
import { UserTypes } from '@/src/types/authType'
import { allEvents } from '@/src/utils/quries/eventQurery'
import EventCard from '@/src/components/profileScreens/EventCard'

const index = () => {

  const { data, isLoading } = allEvents();

  if (isLoading) {
    return (
      <View className='flex-1 bg-MainBackgroundColor justify-center items-center'>
        <ActivityIndicator size={"large"} color={"#fff"} />
      </View>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-MainBackgroundColor p-4'>
      <FlatList 
        data={data}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <EventCard dataList={item} /> }
      />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})