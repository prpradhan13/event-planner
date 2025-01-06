import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { InvitesListItemProps } from '@/src/types/eventType'

const InvitesListItem = ({ inviteList }: InvitesListItemProps) => {
  return (
    <View className="bg-[#333] p-3 rounded-xl">
          <Text className="text-[#c6c6c6] text-xl"></Text>
          <Text className="text-[#c6c6c6] text-xl"></Text>
          <Text className="text-[#c6c6c6] text-xl">
            {/* {dayjs(inviteList.date).format("DD MMM YYYY")} */}
          </Text>
          <Text className="text-[#c6c6c6] text-xl"></Text>
        </View>
  )
}

export default InvitesListItem

const styles = StyleSheet.create({})