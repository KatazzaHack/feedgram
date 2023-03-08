import React, { useState, useContext } from 'react';
import {
  View,
  Button,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Post from './Post.js';
import { newPost } from '../data/network_requests.js';
import { UsernameContext } from '../data/persistent_data.js';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    input: {
        color: "#000000",
    },
    image: {
        height: '100%',
        width: '100%',
    },
    container: {
        width: deviceWidth,
        height: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const NewPostPage = (): Node => {
    const [title, onTitleChanged] = React.useState("");
    const [description, onDescriptionChanged] = React.useState("");
    const [file, setFile] = React.useState();
    const [imageToLoadUri, setImageToLoadUri] = React.useState();
    const [showSuccess, setShowSuccess] = React.useState(false);

    const username = useContext(UsernameContext);

    const handleFileChoice = (file) => {
        setFile(file);
        setImageToLoadUri(file.uri);
        setShowSuccess(false);
        console.log("Image to load: ", imageToLoadUri);
        console.log("Chosen file for upload: ", file);
    };

    const handleError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
          console.warn('cancelled')
          // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
          console.warn('multiple pickers were opened, only the last will be considered')
        } else {
          throw err
        }
    };

    const uploadPost = () => {
        // Do nothing in case file is not chosen.
        if (!imageToLoadUri) return;
        // Do nothing in case file is already uploaded.
        if (showSuccess) return;

        console.log("Uploading file: ", file);
        const formData = [];
        formData.push({
           name: 'file_to_upload',
           filename: file.name,
           type: file.type,
           data: RNFetchBlob.wrap(file.uri),
        });
        formData.push({
            name: 'title',
            data: title,
        });
        formData.push({
            name: 'description',
            data: description,
        });
        newPost(username, formData).then((response) => {
            if (response.respInfo.status === 200) {
                setShowSuccess(true);
            }
        });
    };

    const getImagePreview = () => {
        if (showSuccess) return <Image style={styles.image} source={require('../static_data/uploaded_photo.png')} />
        else if (file) return <Image style={styles.image} source={{uri: imageToLoadUri}} />
        else return <Image style={styles.image} source={require('../static_data/upload_photo.png')} />
    }

    return (
        <View>
            <TextInput multiline
                style={styles.input}
                onChangeText={onTitleChanged}
                value={title}
                placeholder="Enter title..."
            />
            <TextInput
                style={styles.input}
                onChangeText={onDescriptionChanged}
                value={description}
                placeholder="Enter your feedback..."
            />
            <View style={styles.container}>
                {getImagePreview()}
            </View>
            <Button title="Choose file"
                onPress={() => {
                  DocumentPicker.pickSingle({
                    type: types.images,
                  })
                  .then(handleFileChoice)
                  .catch(handleError)
                }}
            />
            <Button title="Upload Post"
                onPress={uploadPost}
            />
        </View>);
};

export default NewPostPage;