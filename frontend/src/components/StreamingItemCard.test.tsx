import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StreamingItemCard from './StreamingItemCard';

// Mock Next.js modules
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className }) => {
    return <img src={src} alt={alt} className={className} data-testid="next-image" />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, legacyBehavior }) => {
    if (legacyBehavior) {
      return children;
    }
    return <a href={href}>{children}</a>;
  },
}));

describe('StreamingItemCard Component', () => {
  const mockItem = {
    id: 1,
    title: 'Test Video Title',
    description: 'Test video description for testing purposes',
    thumbnail_url: '/test-thumbnail.jpg',
    video_url: '/test-video.mp4',
    created_at: '2023-07-22T12:34:56Z',
  };

  it('renders the component correctly', () => {
    render(<StreamingItemCard item={mockItem} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('Test video description for testing purposes')).toBeInTheDocument();
    
    // Check if thumbnail is rendered
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-thumbnail.jpg');
    expect(image).toHaveAttribute('alt', 'Test Video Title');
    
    // Check if "Watch Now" text is present
    expect(screen.getByText('Watch Now')).toBeInTheDocument();
    
    // Check if link points to the correct detail page
    const link = screen.getByText('Test Video Title').closest('a');
    expect(link).toHaveAttribute('href', '/streaming/1');
  });
});
