import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '@/constants';
import { SearchInput, Trending, EmptyList , CustomButton, VideoCard} from '@/components';
import { router } from 'expo-router';
import {getPosts, getLatestPosts} from '@/lib/appwrite';
import {useAppwrite} from '@/lib/useAppwrite';

const headerComponent = (latestPosts) => {
    return (<>
        <View className="px-4 my-3 space-y-2">
            <View className="justify-between items-start flex-row mb-6">
                <View>
                    <Text className="font-pmedium text-lg text-gray-100">Welcome Back</Text>
                    <Text className="text-3xl font-psemibold text-white">JS Mastery</Text>
                </View>
                <View className="mt-1.5">
                    <Image
                    source={images.logoSmall}
                    className="w-9 h-9"
                    resizeMode='contain'
                    />
                </View>
            </View>
            <SearchInput
                placeholder="Search for a video topic"
            />
            <View className="w-full flex pt-4">
                <Text className="text-lg font-pregular text-gray-100">
                Trending Videos
                </Text>
            </View>
            <Trending
            data={latestPosts}
            horizontal={true}
            />
        </View>
    </>)

}

const emptyList = () => {
    return <>
        <View className="items-center justify-center pb-6">
            <EmptyList 
                text="No videos found"
                subtext="Be the first one to upload a video"
            />
            <CustomButton
            title="Upload Video"
            containerStyle="w-[90%]"
            textStyle="my-4"
            handlePress={() => router.push('/create')}
            />
        </View>
    </>
}

const Home = () => {
    const {data : posts, isLoading, refetch} = useAppwrite(getPosts);
    const {data : latestPosts, isLoading: latestLoading} = useAppwrite(getLatestPosts);
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = async () => {
        setRefreshing(true);
        // fetch data recall our posts -> if any new video appears
        await refetch();
        setRefreshing(false);
    }

    return (<>
        <SafeAreaView className="bg-primary h-full">
            <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={(ele) => <VideoCard item={ele.item} />}
            ListHeaderComponent={() => headerComponent(latestPosts) }
            ListEmptyComponent={emptyList}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
        </SafeAreaView>
    </>
    );
};

export default Home;
