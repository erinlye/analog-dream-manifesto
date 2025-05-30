
import { supabase } from '@/integrations/supabase/client';
import { CommunityPost, CommunityComment } from './types';

// Get all posts for a specific community
export const getCommunityPosts = async (communityId: string): Promise<CommunityPost[]> => {
  try {
    const { data: posts, error: postsError } = await supabase
      .from('community_posts')
      .select('*')
      .eq('community_id', communityId)
      .order('timestamp', { ascending: false });

    if (postsError) throw postsError;

    // Get comments for each post
    const postsWithComments = await Promise.all(
      (posts || []).map(async (post) => {
        const { data: comments, error: commentsError } = await supabase
          .from('community_comments')
          .select('*')
          .eq('post_id', post.id)
          .order('timestamp', { ascending: true });

        if (commentsError) throw commentsError;

        return {
          ...post,
          communityId: post.community_id,
          imageUrl: post.image_url,
          comments: comments || []
        };
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return [];
  }
};

// Get a specific post by ID
export const getCommunityPostById = async (postId: string): Promise<CommunityPost | undefined> => {
  try {
    const { data: post, error: postError } = await supabase
      .from('community_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (postError) throw postError;

    const { data: comments, error: commentsError } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', postId)
      .order('timestamp', { ascending: true });

    if (commentsError) throw commentsError;

    return {
      ...post,
      communityId: post.community_id,
      imageUrl: post.image_url,
      comments: comments || []
    };
  } catch (error) {
    console.error('Error fetching community post:', error);
    return undefined;
  }
};

// Add a new post
export const addCommunityPost = async (post: Omit<CommunityPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): Promise<CommunityPost | null> => {
  try {
    const { data, error } = await supabase
      .from('community_posts')
      .insert([{
        community_id: post.communityId,
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
      communityId: data.community_id,
      imageUrl: data.image_url,
      comments: []
    };
  } catch (error) {
    console.error('Error adding community post:', error);
    throw error;
  }
};

// Delete a post
export const deleteCommunityPost = async (postId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting community post:', error);
    throw error;
  }
};

// Add a comment to a post
export const addCommunityComment = async (postId: string, comment: Omit<CommunityComment, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('community_comments')
      .insert([{
        post_id: postId,
        author: comment.author,
        content: comment.content,
        timestamp: Date.now()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error adding community comment:', error);
    throw error;
  }
};

// Toggle upvote on a post
export const toggleCommunityUpvote = async (postId: string): Promise<void> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('upvotes')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', postId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error toggling upvote:', error);
    throw error;
  }
};

// Toggle downvote on a post
export const toggleCommunityDownvote = async (postId: string): Promise<void> => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('downvotes')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ downvotes: (post.downvotes || 0) + 1 })
      .eq('id', postId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error toggling downvote:', error);
    throw error;
  }
};

// Get posts sorted by popularity (upvotes - downvotes)
export const getCommunityPostsByPopularity = async (communityId: string): Promise<CommunityPost[]> => {
  try {
    const posts = await getCommunityPosts(communityId);
    return posts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  } catch (error) {
    console.error('Error fetching posts by popularity:', error);
    return [];
  }
};
