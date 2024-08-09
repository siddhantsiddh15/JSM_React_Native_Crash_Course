import 'react-native-url-polyfill/auto'
import { Client , Account, ID, Avatars, Databases, Query, Storage} from 'react-native-appwrite';

export const config = {
    endpoint : '',
    platform : '', 
    projectId : '',
    databaseId : '',
    userCollectionId : '',
    videoCollectionId : '',
    storageId : ''
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

//make first request
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
// Register User
export const createUser = async (email, password, username) => {

    try{
        const newAccount = await account.create(ID.unique(),email, password, username)

        if(!newAccount)throw new Error('Error creating account');

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(),{
            accountId : newAccount.$id,
            email,
            password,
            avatar : avatarUrl
        })
        console.log('>>>>>>.newUser', newUser)
        return newUser

    }catch(err){
        throw new Error(err)
    }
    
}

export const signIn = async (email, password) => {
    try{
        const totalSessions = await account.listSessions();
        if(totalSessions.total > 0){
            return totalSessions.sessions[0];
        }
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    }catch(err){
        throw new Error(err)
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();

        if(!currentAccount){
            throw new Error('Current Account not found')
        }
        const currentUser = await databases.listDocuments(
            config.databaseId, 
            config.userCollectionId, 
            [Query.equal('accountId', currentAccount.$id)]
            );
            
        if(!currentUser){
            throw new Error('Current User not found')
        }
            
        // return currentUser.documents[0];
        return currentAccount
    }catch(err){
        throw new Error(err)
    }
}

// get all posts

export const getPosts = async () => {  
    try{
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId)
        ;
        return posts.documents;
    }catch(err){
        throw new Error(err, '>>>>>Error getting posts')
    }
}

// get latest posts

export const getLatestPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(5))])
        ;
        return posts.documents;
    }catch(err){
        throw new Error(err, '>>>>Error getting latest posts')
    }
}


// get searched post

export const getSearchedPosts = async (query) => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId,
            [Query.search("title", query)])
        ;
        return posts.documents;
    }catch(err){
        throw new Error(err, '>>>>Error getting queried posts')
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl = '';

    try{
        if(type=== 'video'){
            fileUrl = storage.getFilePreview(config.storageId, fieldId);
        }else if(type === 'image'){
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100);
        }else {
            throw new Error('Invalid file type')
        }

    if(!fileUrl){throw new Error('Error in getting file URL')}
    }catch(err){
        throw new Error('Error in getting file preview', err)
    }

    return fileUrl;
}

const uploadFile = async (file , type) => {
    if(!file)return;

    const [mimeType, ...rest] = file;
    const asset = {type : mimeType, ...rest} // we have taken mimeType and renamed it to type for appwrite to understand

    try{
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadFile.$id, type);

        return fileUrl;
    }catch(err){
        throw new Error('Error in uploading file', err)
    }
}

export const createVideo = async (form) => {

    try{
        const [thumnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
    }catch(err){
        throw new Error('Error in uploading videos',err)
    }

}