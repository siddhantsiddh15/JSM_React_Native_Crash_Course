import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import {images} from '@/constants';

const EmptyList = (props) => {    
    return (
        <View className="flex items-center justify-center my-2">
            <Image source={images.empty} resizeMode='contain' className="w-[200px] h-[150px]" />
            {!!props.text && <Text className="text-lg text-secondary font-pregular mb-1">{props.text}</Text>}
            {!!props.subtext && <Text className="text-md text-gray-100 font-pregular mb-2">{props.subtext}</Text>}
        </View>
    )
}

export default EmptyList;