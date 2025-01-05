import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Task = () => {
  return (
    <View className='w-full justify-center items-center pt-10'>
      <Text className='text-[#c6c6c6] text-xl'>No Tasks</Text>
      <TouchableOpacity
        className='bg-[#000] p-2 rounded-xl mt-4'
      >
        <Text className='text-[#c6c6c6] text-xl'>
          Create Tasks
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Task;