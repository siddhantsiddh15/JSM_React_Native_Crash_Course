import React, {useState} from 'react';
import { View, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import {icons} from '@/constants'
import { router, usePathname } from 'expo-router';

const SearchInput = (props) => {
    const { otherStyles, keyboardType, placeholder, initialQuery } = props;
    const pathName = usePathname();
    const [search, setSearch] = useState(initialQuery || '');

    const handleSearchPress = () => {
        if(!search){
            Alert.alert('Please enter a search term', "Search term can't be empty")
            return
        }

        if(pathName.startsWith('/search')){
            // pathName starts with search means we are already on the search page
            router.setParams({query: search})
        }else{
            router.push(`/search/${search}`)
        }

    }

    return (
        <View className={`w-full space-y-2 ${otherStyles}`}>
            <View className="border-2 border-black-200 w-full h-14 rounded-lg bg-black-100 focus:border-secondary-200 items-start justify-center p-[10px]">
                <TextInput
                    className="flex-1 w-full h-full text-white font-psemibold text-justify pt-[3px] "
                    placeholder={placeholder}
                    value={search}
                    onChangeText={(e) => setSearch(e)}
                    keyboardType={keyboardType}
                    placeholderTextColor='gray'
                    
                />

                
                <TouchableOpacity 
                onPress={() => handleSearchPress()}
                className="absolute right-2"
                >
                    <Image source={icons.search} resizeMode='contain'
                    className="w-8 h-6"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchInput;
