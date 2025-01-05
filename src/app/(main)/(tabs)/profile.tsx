import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { supabase } from '@/src/utils/supabase'

const profile = () => {
  return (
    <View>
      <Text>profile</Text>
      <Button title='Logout' onPress={() => supabase.auth.signOut()} />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})