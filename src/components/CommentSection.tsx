import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  timestamp: number;
}

interface CommentSectionProps {
  articleUrl: string;
}

export function CommentSection({ articleUrl }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const { comments, addComment } = useStore((state) => ({
    comments: state.comments[articleUrl] || [],
    addComment: state.addComment,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(articleUrl, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare size={20} />
        Comments ({comments.length})
      </h3>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
            <span className="text-sm text-gray-500">
              {new Date(comment.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}