import React, {useState} from 'react';
import { View, TextInput, Text, Touchable, TouchableOpacity, Image } from 'react-native';
import {icons} from '@/constants'

const FormField = (props) => {
    const { label, value, handleChangeText, otherStyles, keyboardType, placeholder } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`w-full space-y-2 ${otherStyles}`}>
            <Text className="text-[14px] px-1 text-gray-100 font-pmedium">{label}</Text>
            <View className="border-2 border-black-200 w-full h-14 rounded-lg bg-black-100 focus:border-secondary-200 items-start justify-center p-[10px]">
                <TextInput
                    className="flex-1 w-full h-full text-white font-psemibold text-justify"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    placeholderTextColor='#7b7b8b'
                    secureTextEntry={(label === 'Password' || label === 'Confirm Password') && !showPassword}
                />

                {(label === 'Password' || label === 'Confirm Password') && <>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-2"
                    >
                        <Image source={`${showPassword ? icons.eyeHide : icons.eye}`} resizeMode='contain'
                        className="w-8 h-6"
                        />
                    </TouchableOpacity>
                </>}
            </View>
        </View>
    );
};

export default FormField;
