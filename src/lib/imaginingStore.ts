
import { supabase } from '@/integrations/supabase/client';
import { ImaginingPost, ImaginingComment } from "./types";

// Get all imagining posts from Supabase
export const getAllImaginingPosts = async (): Promise<ImaginingPost[]> => {
  try {
    const { data: posts, error: postsError } = await supabase
      .from('imagining_posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (postsError) throw postsError;

    // Get comments for each post
    const postsWithComments = await Promise.all(
      (posts || []).map(async (post) => {
        const { data: comments, error: commentsError } = await supabase
          .from('imagining_comments')
          .select('*')
          .eq('post_id', post.id)
          .order('timestamp', { ascending: true });

        if (commentsError) throw commentsError;

        return {
          ...post,
          imageUrl: post.image_url,
          comments: comments || []
        };
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error('Error fetching imagining posts:', error);
    return [];
  }
};

// Get imagining posts sorted by popularity (upvotes - downvotes)
export const getImaginingPostsByPopularity = async (): Promise<ImaginingPost[]> => {
  try {
    const posts = await getAllImaginingPosts();
    return posts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  } catch (error) {
    console.error('Error fetching imagining posts by popularity:', error);
    return [];
  }
};

// Add a new imagining post
export const addImaginingPost = async (post: Omit<ImaginingPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): Promise<ImaginingPost | null> => {
  try {
    const { data, error } = await supabase
      .from('imagining_posts')
      .insert([{
        title: post.title,
        description: post.description,
        author: post.author,
        timestamp: post.timestamp,
        image_url: post.imageUrl
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      imageUrl: data.image_url,
      comments: []
    };
  } catch (error) {
    console.error('Error adding imagining post:', error);
    throw error;
  }
};

// Delete an imagining post
export const deleteImaginingPost = async (postId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('imagining_posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting imagining post:', error);
    return false;
  }
};

// Add a comment to an imagining post
export const addImaginingComment = async (postId: string, comment: Omit<ImaginingComment, 'id' | 'timestamp'>): Promise<ImaginingComment | null> => {
  try {
    const { data, error } = await supabase
      .from('imagining_comments')
      .insert([{
        post_id: postId,
        author: comment.author,
        content: comment.content,
        timestamp: Date.now()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding imagining comment:', error);
    return null;
  }
};

// Toggle upvote on an imagining post
export const toggleImaginingUpvote = async (postId: string): Promise<ImaginingPost | null> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('imagining_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { data: updatedPost, error: updateError } = await supabase
      .from('imagining_posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', postId)
      .select()
      .single();

    if (updateError) throw updateError;

    return {
      ...updatedPost,
      imageUrl: updatedPost.image_url,
      comments: []
    };
  } catch (error) {
    console.error('Error toggling imagining upvote:', error);
    return null;
  }
};

// Toggle downvote on an imagining post
export const toggleImaginingDownvote = async (postId: string): Promise<ImaginingPost | null> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('imagining_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { data: updatedPost, error: updateError } = await supabase
      .from('imagining_posts')
      .update({ downvotes: (post.downvotes || 0) + 1 })
      .eq('id', postId)
      .select()
      .single();

    if (updateError) throw updateError;

    return {
      ...updatedPost,
      imageUrl: updatedPost.image_url,
      comments: []
    };
  } catch (error) {
    console.error('Error toggling imagining downvote:', error);
    return null;
  }
};
