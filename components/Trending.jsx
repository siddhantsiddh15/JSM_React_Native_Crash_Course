import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {icons} from '@/constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
    0: {
      scale: 0.85,
    },
    1: {
      scale: 1,
    },
  };

const zoomOut = {
    0: {
      scale: 1,
    },
    1: {
      scale: 0.85,
    },
  };

const TrendingItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false);
    return (<>
    <Animatable.View
    className="mr-5"
    animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
    duration={500}
    >    
        {play ? (
        <Video 
        source={{uri: item.video}}
        className="w-52 h-72 my-5 overflow-hidden rounded-xl bg-white/10 "
        useNativeControls
        resizeMode={ResizeMode.COVER}
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
            if(status.didJustFinish){
                setPlay(false)
            }
            if(activeItem.$id !== item.$id){
                setPlay(false)
            }
        }}
        />) : 
        <TouchableOpacity
        activeOpacity={0.7}
        className="flex items-center justify-center"
        onPress={() => setPlay(!play)
        }>
            <ImageBackground
            source={{uri: item.thumbnail}}
            className="w-52 h-72 my-5 overflow-hidden rounded-xl shadow-lg shadow-black/40"
            resizeMode='cover'
            />
            <Image 
            source={icons.play}
            resizeMode='contain'
            className="absolute w-16 h-16"
            />
        </TouchableOpacity>}
    </Animatable.View>
    </>)
}

const Trending = (props) => {
    const {data, styles, horizontal} = props
    const [activeItem, setActiveItem] = useState(data[0]);

    handleViewableItemsChanged = ({viewableItems}) => {
        if(viewableItems.length > 0){
            // we passed keyExtractor as item.$id so we are setting the key
            setActiveItem(viewableItems[0].item);
        }
    }

    return (
        <>
            <FlatList
            data={data}
            keyExtractor={(item) => item.$id}
            renderItem={(ele) => <TrendingItem item={ele.item}  activeItem={activeItem} />}
            className={styles}
            horizontal={horizontal ? horizontal : false}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold : 70}}
            contentOffset={{x : 150}}
            />
        </>
    )
}

export default Trending;