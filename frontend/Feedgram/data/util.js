const anton = "http://feedgram-backend.feedgram-333720.ew.r.appspot.com";
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

export const getMediaIdsForUser = async (user_name) => {
  try {
    const response = await fetch(
    `${anton}/${user_name}`,
    {method: 'GET',
     headers: headers,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const newUser = async (user_name) => {
  try {
    const response = await fetch(
    `${anton}/login/new_user/`,
    {method: 'POST',
     headers: headers,
     body: JSON.stringify({
       user_name: `${user_name}`,
     })
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getMediaById = async (media_id) => {
  try {
    const response = await fetch(
    `${anton}/media/${media_id}`,
    {method: 'GET',
     headers: headers,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

//TODO(maffina): how to get FormFile?
export const newMedia = async (user_name, media_id) => {
  try {
    const response = await fetch(
    `${anton}/${user_name}/media/`,
    {method: 'POST',
     headers: headers,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};