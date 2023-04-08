// FETCHING SANITY DATA FROM THIS FILE

export const userQuery = (userId) => {

    // try to get me a document of type equals to user and _id is equal to id
    const query = `*[_type == "user" && _id == '${userId}']`;

    return query;
}