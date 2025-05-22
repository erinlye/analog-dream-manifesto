
import { Link } from 'react-router-dom';
import { Community } from '../lib/types';

interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  return (
    <Link to={`/communities/${community.slug}`} className="block">
      <div className="analog-paper hover:border-ink-300 transition-colors">
        <h3 className="font-serif text-xl mb-2">{community.name}</h3>
        <p className="text-ink-400 mb-4">{community.description}</p>
        <div className="text-sm text-ink-300">
          {community.member_count || 0} members
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
