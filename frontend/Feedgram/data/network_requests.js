import RNFetchBlob from 'rn-fetch-blob';

const feedgram_backend = "http://feedgram-backend.feedgram-333720.ew.r.appspot.com";

// TODO(maffina,antonhulikau): get rid of the unused headers
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers':  '*',
    'Access-Control-Allow-Headers':  '*',
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

export const getMediaIdsForUser = async (user_name) => {
  try {
    const response = await fetch(
    `${feedgram_backend}/${user_name}`,
    {method: 'GET',
     headers: headers,
    });
    if (response.ok) {
        const json = await response.json();
        return json['ids'];
    } else {
        return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const newUser = async (user_name) => {
  try {
    const response = await fetch(
    `${feedgram_backend}/login/new_user/`, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify({
       user_name: `${user_name}`
     })
    });
    console.log(response);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getMediaById = async (media_id) => {
  try {
    const response = await fetch(
    `${feedgram_backend}/media/${media_id}`,
    {method: 'GET',
     headers: headers,
    });
    const json = await response.json();
    console.log('Json: ', json);
    return json["id"];
  } catch (error) {
    console.error(error);
  }
};

//TODO(maffina): how to get FormFile?
export const newMedia = async (username, rnfb_uri) => {
  console.log("trying to send a post request to send a new media.");
  try {
    const response = await RNFetchBlob.fetch('POST',
        `${feedgram_backend}/${username}/new_media` , {
       'Content-Type' : 'multipart/form-data',
       'Accept': 'application/json',
       'Access-Control-Request-Headers':  '*',
       'Access-Control-Allow-Headers':  '*',
       'Access-Control-Allow-Origin':  '*',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }, rnfb_uri);
    console.log('Response: ', response);
    const json = await response.json();
    return json["id"];
  } catch(error) {
    console.error(error);
  }
};