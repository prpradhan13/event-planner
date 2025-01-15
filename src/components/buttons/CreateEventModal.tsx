import { TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'

interface CreateEventModalButtonProps {
    btnIconName: keyof typeof Entypo.glyphMap;
    btnColor?: string;
    btnSize?: number;
    onPress?: () => void;
}

export const CreateEventModalButton = ({ btnIconName, onPress, btnColor, btnSize }: CreateEventModalButtonProps) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        className='bg-[#f9f9f9] rounded-full w-16 h-16 justify-center items-center'
    >
      <Entypo name={btnIconName} size={btnSize ? btnSize : 24} color={`${btnColor ? btnColor : "black"}`} />
    </TouchableOpacity>
  )
}