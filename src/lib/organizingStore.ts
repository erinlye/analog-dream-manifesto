
import { supabase } from '@/integrations/supabase/client';
import { OrganizingPost, OrganizingComment } from "./types";

// Get all organizing posts from Supabase
export const getAllOrganizingPosts = async (): Promise<OrganizingPost[]> => {
  try {
    const { data: posts, error: postsError } = await supabase
      .from('organizing_posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (postsError) throw postsError;

    // Get comments for each post
    const postsWithComments = await Promise.all(
      (posts || []).map(async (post) => {
        const { data: comments, error: commentsError } = await supabase
          .from('organizing_comments')
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
    console.error('Error fetching organizing posts:', error);
    return [];
  }
};

// Get organizing posts sorted by popularity (upvotes - downvotes)
export const getOrganizingPostsByPopularity = async (): Promise<OrganizingPost[]> => {
  try {
    const posts = await getAllOrganizingPosts();
    return posts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  } catch (error) {
    console.error('Error fetching organizing posts by popularity:', error);
    return [];
  }
};

// Add a new organizing post
export const addOrganizingPost = async (post: Omit<OrganizingPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): Promise<OrganizingPost | null> => {
  try {
    const { data, error } = await supabase
      .from('organizing_posts')
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
    console.error('Error adding organizing post:', error);
    throw error;
  }
};

// Delete an organizing post
export const deleteOrganizingPost = async (postId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('organizing_posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting organizing post:', error);
    return false;
  }
};

// Add a comment to an organizing post
export const addOrganizingComment = async (postId: string, comment: Omit<OrganizingComment, 'id' | 'timestamp'>): Promise<OrganizingComment | null> => {
  try {
    const { data, error } = await supabase
      .from('organizing_comments')
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
    console.error('Error adding organizing comment:', error);
    return null;
  }
};

// Toggle upvote on an organizing post
export const toggleOrganizingUpvote = async (postId: string): Promise<OrganizingPost | null> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('organizing_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { data: updatedPost, error: updateError } = await supabase
      .from('organizing_posts')
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
    console.error('Error toggling organizing upvote:', error);
    return null;
  }
};

// Toggle downvote on an organizing post
export const toggleOrganizingDownvote = async (postId: string): Promise<OrganizingPost | null> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('organizing_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { data: updatedPost, error: updateError } = await supabase
      .from('organizing_posts')
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
    console.error('Error toggling organizing downvote:', error);
    return null;
  }
};
