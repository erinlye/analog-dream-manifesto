
import { supabase } from '@/integrations/supabase/client';
import { LearningPost, LearningComment } from "./types";

// Get all learning posts from Supabase
export const getAllLearningPosts = async (): Promise<LearningPost[]> => {
  try {
    const { data: posts, error: postsError } = await supabase
      .from('learning_posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (postsError) throw postsError;

    // Get comments for each post
    const postsWithComments = await Promise.all(
      (posts || []).map(async (post) => {
        const { data: comments, error: commentsError } = await supabase
          .from('learning_comments')
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
    console.error('Error fetching learning posts:', error);
    return [];
  }
};

// Get learning posts sorted by popularity (upvotes - downvotes)
export const getLearningPostsByPopularity = async (): Promise<LearningPost[]> => {
  try {
    const posts = await getAllLearningPosts();
    return posts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  } catch (error) {
    console.error('Error fetching learning posts by popularity:', error);
    return [];
  }
};

// Add a new learning post
export const addLearningPost = async (post: Omit<LearningPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): Promise<LearningPost> => {
  try {
    const { data, error } = await supabase
      .from('learning_posts')
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
    console.error('Error adding learning post:', error);
    throw error;
  }
};

// Delete a learning post
export const deleteLearningPost = async (postId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('learning_posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting learning post:', error);
    return false;
  }
};

// Add a comment to a learning post
export const addLearningComment = async (postId: string, comment: Omit<LearningComment, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('learning_comments')
      .insert([{
        post_id: postId,
        author: comment.author,
        content: comment.content,
        timestamp: Date.now()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error adding learning comment:', error);
    throw error;
  }
};

// Toggle upvote on a learning post
export const toggleLearningUpvote = async (postId: string): Promise<void> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('learning_posts')
      .select('upvotes')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('learning_posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', postId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error toggling learning upvote:', error);
    throw error;
  }
};

// Toggle downvote on a learning post
export const toggleLearningDownvote = async (postId: string): Promise<void> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('learning_posts')
      .select('downvotes')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('learning_posts')
      .update({ downvotes: (post.downvotes || 0) + 1 })
      .eq('id', postId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error toggling learning downvote:', error);
    throw error;
  }
};
