import React, { useState, useContext } from 'react';
import {
  View,
  Button
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Post from './Post.js';
import { newMedia } from '../data/network_requests.js';
import { UsernameContext } from '../data/persistent_data.js';

const NewPostPage = (): Node => {
    const [filePath, setFilePath] = useState();

    const username = useContext(UsernameContext);

    const handleFileChoice = (file) => {
        console.log("Chosen file for upload: ", file);
        setFilePath(file.uri);
        const formData = [];
        formData.push({
           name : 'file_to_upload',
           filename : file.name,
           type: file.type,
           data: RNFetchBlob.wrap(file.uri)
        });
        let json_response = newMedia(username, formData);
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

    return (
        <View>
            <Button title="Choose file"
                onPress={() => {
                  DocumentPicker.pickSingle({
                    type: types.images,
                  })
                  .then(handleFileChoice)
                  .catch(handleError)
                }}
            />
            <Post image_uri={filePath}/>
        </View>);
};

export default NewPostPage;