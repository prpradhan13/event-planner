import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PassCodeScreen from '../modal/PassCodeScreen';

interface EntryPassCodeBtnProps {
    eventId?: number;
    eventCreaterId?: string;
    passCode: string;
}

const EntryPassCodeBtn = ({ eventId, eventCreaterId, passCode }: EntryPassCodeBtnProps) => {
    const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
    <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="gap-2 flex-row items-center py-1 px-2 rounded-md bg-[#ebebeb]"
        >
            
        <Text className="text-[#000] font-medium text-base">
            Code
        </Text>
    </TouchableOpacity>
    {modalVisible && (
        <PassCodeScreen 
            modalVisibile={modalVisible}
            setModalVisibile={setModalVisible}
            passCode={passCode}
        />
    )}
    </>
  )
}

export default EntryPassCodeBtn;