import React, { useState } from 'react';
import {
  View,
  Button
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Post from './Post.js';

const NewPostPage = (): Node => {
    const [filePath, setFilePath] = useState();

    const handleFileChoice = (file) => {
        setFilePath(file[0].uri);
        console.log(file[0].uri);
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
                  DocumentPicker.pick({
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