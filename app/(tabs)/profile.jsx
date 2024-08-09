import React, {useState, useEffect} from 'react';
import { View, Text,FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '@/constants';
import { SearchInput, EmptyList , CustomButton, VideoCard} from '@/components';
import { router, useLocalSearchParams } from 'expo-router';
import {getLatestPosts} from '@/lib/appwrite';
import {useAppwrite} from '@/lib/useAppwrite';

const headerComponent = () => {
    return (<>
        <View className="px-4 mt-3 mb-10 space-y-2">
            <View className="justify-between items-start flex-row mb-6">
                <View>
                    <Text className="font-pmedium text-lg text-gray-100">Profile</Text>
                    <Text className="text-3xl font-psemibold text-white">Name</Text>
                </View>
                <View className="mt-1.5">
                    <Image
                    source={images.logoSmall}
                    className="w-9 h-9"
                    resizeMode='contain'
                    />
                </View>
            </View>
        </View>
    </>)

}

const emptyList = () => {
    return <>
        <View className="items-center justify-center pb-6">
            <EmptyList 
                text="No videos found for this search query"
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

const ProfileLayout = () => {
    const {data : posts, isLoading: latestLoading, refetch} = useAppwrite(getLatestPosts);
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
            ListHeaderComponent={() => headerComponent()}
            ListEmptyComponent={emptyList}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
        </SafeAreaView>
    </>
    );
};

export default ProfileLayout;
