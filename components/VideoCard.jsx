import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {icons} from '@/constants'
import { Video, ResizeMode } from 'expo-av';

const VideoCard = ({item}) => {
    const {video, user, thumbnail, title} = item;
    const [play, setPlay] = useState(false);
    return (<>
        <View className="my-6 px-4 gap-4">
            <View className="flex-row items-center justify-center">
                <View className="w-[46px] h-[46px] border-2 border-secondary-100 rounded-lg">
                    <Image className="w-full h-full rounded-lg"
                    source={{uri: thumbnail}} resizeMode='cover'/>
                </View>
                <View className="flex-1 items-start justify-start ml-4">
                    <Text numberOfLines={1} className="text-md text-white  font-psemibold">{item.title}</Text>
                    <Text numberOfLines={1} className="text-xs text-gray-100 ">guest</Text>
                </View>
                <View className="ml-2">
                    <Image 
                    className="w-5 h-5"
                    source={icons.menu} resizeMode='contain'/>
                </View>
            </View>
            {play ? <View 
            className="w-full h-60 bg-gray-100 rounded-lg "
            onPress={() => setPlay(false)}
            >
                <Video
                source={{uri: video}}
                className="w-full h-full rounded-lg bg-white/10 "
                useNativeControls
                resizeMode={ResizeMode.COVER}
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if(status.didJustFinish){
                        setPlay(false)
                    }                    
                }}
                />
            </View> :
                <View className="items-center justify-center">
                    <Image
                    source={{uri: thumbnail}}
                    className="w-full h-60 rounded-lg"
                    resizeMode='cover'
                    />
                    <TouchableOpacity 
                    className="mb-6 w-[30%] h-[40%] absolute items-center justify-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}>
                        <Image
                        source={icons.play}
                        className="w-16 h-16 rounded-full"
                        resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>}
        </View>
    </>)
}

export default VideoCard;