import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {FormField} from '@/components';
import { Video, ResizeMode } from 'expo-av';
import {icons} from '@/constants';
import {CustomButton} from '@/components';
import * as DocumentPicker from 'expo-document-picker';

const Create = () => {
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt : ''
    })

    const handleChangeText = (key, value) => {
        if(value === ' ') return;
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleSubmit = async () => {
        if(!form.video || !form.thumbnail || !form.title || !form.prompt){
            return Alert.alert('Error', 'All fields are required')
        }

        setUploading(true);

        try{
            Alert.alert('Success', 'Your files have been uploaded successfully')
            router.push('/home')
        }catch(err){

            Alert.alert('Error in uploading your files', err.message)
        }finally{
            setUploading(false);
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt : ''
            })
        }
    }

    // document picker
    const picker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'image' ? ['image/png', 'image/jpg'] : ['video/mp4', 'video/gif'],
            copyToCacheDirectory: true
        });

        if(!result.canceled){
            if(selectType === 'image'){
                setForm({
                    ...form,
                    thumbnail: result.assets[0]
                })
            }
            if(selectType === 'video'){
                setForm({
                    ...form,
                    video: result.assets[0]
                })
            }
        }else{
            if(result.assets === null)return;
            setTimeout(() => {
                Alert.alert('Document picked', JSON.stringify(result, null, 2))
            }, 1000);
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="my-4 px-4">
            <Text className="text-xl font-psemibold text-white mb-4" >Upload Video</Text>
            <FormField 
            label="Video Title" 
            placeholder="Give your video a catchy title" 
            value={form.title} 
            handleChangeText={(e) => handleChangeText('title', e)} otherStyles="mb-6" />

            <View >
                <Text className="text-[14px] text-gray-100 font-pmedium mb-2">Upload Video</Text>
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => picker('video')}
                >
                    {form.video ? <Video
                    source={{uri: form.video.uri}}
                    className="w-full h-40 rounded-xl"
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    /> :( 
                    <View className="w-full h-40 rounded-xl bg-black-100 px-4 justify-center items-center">
                        <View className="h-14 w-14 border border-dashed border-secondary-100 justify-center items-center">
                            <Image
                            source={icons.upload}
                            resizeMode='contain'
                            className="w-1/2 h-1/2"
                            />
                        </View>
                        <Text className="text-xs text-gray-100 font-pmedium mt-4">Choose a video file</Text>
                    </View>)
                    }
                </TouchableOpacity>
            </View>

            <View className="mt-6 space-y-2">
            <Text className="text-[14px] text-gray-100 font-pmedium mb-2">Thumbnail Image</Text>
                <TouchableOpacity activeOpacity={0.8}
                onPress={() => picker('image')}>
                    {form.thumbnail ? <Image
                    source={{uri: form.thumbnail.uri}}
                    className="w-full h-40 rounded-xl"
                    resizeMode='contain'
                    /> :( 
                    <View className="w-full h-14 rounded-xl bg-black-100 justify-center items-center flex flex-row ">
                        <Image
                        source={icons.upload}
                        resizeMode='contain'
                        className="w-6 h-6"
                        />
                        <Text className="text-xs text-gray-100 font-pmedium ml-3">Choose an image file</Text>
                    </View>)
                    }
                </TouchableOpacity>
            </View>

            <FormField 
            label="AI Prompt" 
            placeholder="The prompt you used to create this video" 
            value={form.prompt} 
            handleChangeText={(e) => handleChangeText('prompt', e)} otherStyles=" mt-4" />
            <CustomButton
            title="Submit & Publish"
            handlePress={handleSubmit}   
            containerStyle="mt-6"
            />

            </ScrollView>

        </SafeAreaView>
    );
};

export default Create;
