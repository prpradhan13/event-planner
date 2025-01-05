import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/src/context/AuthProvider'
import { UserTypes } from '@/src/types/authType'

const index = () => {

  return (
    <SafeAreaView className='flex-1 bg-MainBackgroundColor'>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})