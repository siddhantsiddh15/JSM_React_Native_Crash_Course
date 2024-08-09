import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
    const {handlePress, title, containerStyle, textStyle, isLoading} = props;
    return (
        <TouchableOpacity 
        onPress={() => {
            handlePress()
        }}
        activeOpacity={0.7}
        disabled={isLoading}
        className={`bg-secondary rounded-xl min-h-[50px] w-[100%] justify-center items-center  ${containerStyle}
        ${isLoading ? 'opacity-50' : ''}
        `}>
            <View >
                <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};


export default CustomButton;
