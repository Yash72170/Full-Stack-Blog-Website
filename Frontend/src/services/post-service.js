import { privateAxios } from "./helper";

// Create a post
export const createPost = (postData) => {
  return privateAxios
    .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
    .then((res) => res.data);
};

// Load all posts (paginated)
export const loadAllPosts = (pageNumber, pageSize) => {
  return privateAxios
    .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    .then((res) => res.data);
};

// Load single post by ID
export const loadPost = (postId) => {
  return privateAxios.get(`/posts/${postId}`).then((res) => res.data);
};

// Create a comment
export const createComment = (comment, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, comment).then((res) => res.data);
};

// Upload post image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

// Load category-wise posts
export const loadPostCategoryWise = (categoryId) => {
  return privateAxios.get(`/category/${categoryId}/posts`).then((res) => res.data);
};

// Load user-wise posts
export const loadPostUserWise = (userId) => {
  return privateAxios.get(`/user/${userId}/posts`).then((res) => res.data);
};

// Delete a post
export const deletePostService = (postId) => {
  return privateAxios.delete(`/posts/${postId}`).then((res) => res.data);
};

// Update a post
export const updatePost = (post, postId) => {
  return privateAxios.put(`/posts/${postId}`, post).then((res) => res.data);
};
