import React, {useState, useEffect} from 'react';
import { View, Text,FlatList, Image, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {icons} from '@/constants';
import { SearchInput, EmptyList , CustomButton, VideoCard} from '@/components';
import { router, useLocalSearchParams } from 'expo-router';
import {getSearchedPosts} from '@/lib/appwrite';
import {useAppwrite} from '@/lib/useAppwrite';

const headerComponent = (query) => {
    return (<>
        <View className="px-4 mt-3 mb-10 space-y-2">
            <View className="justify-between items-start flex-row mb-6">
                <View>
                    <Text className="font-pmedium text-lg text-gray-100">Search Results</Text>
                    <Text className="text-3xl font-psemibold text-white">{query}</Text>
                </View>
                <View className="mt-2 px-2 items-center ">
                    <Pressable onPress={() => router.push('/home')}>
                        <Image
                        source={icons.leftArrow}
                        className="w-5 h-5"
                        resizeMode='contain'
                        />
                        <Text 
                        className="mt-1 text-gray-100 text-xs">Back</Text>
                    </Pressable>
                </View>
            </View>
            <SearchInput
                placeholder="Search for a video topic"
                initialQuery={query}
            />
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
            title="Create Video"
            containerStyle="w-[90%]"
            textStyle="my-4"
            handlePress={() => router.push('/create')}
            />
        </View>
    </>
}

const Query = () => {
    const {query} = useLocalSearchParams()

    const {data : posts, isLoading, refetch} = useAppwrite(() => getSearchedPosts(query));
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        refetch();
      }, [query]);

    const handleRefresh = async () => {
        // setRefreshing(true);
        // fetch data recall our posts -> if any new video appears
        // await refetch();
        // setRefreshing(false);
    }

    return (<>
        <SafeAreaView className="bg-primary h-full">
            <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={(ele) => <VideoCard item={ele.item} />}
            ListHeaderComponent={() => headerComponent(query)}
            ListEmptyComponent={emptyList}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
        </SafeAreaView>
    </>
    );
};

export default Query;
