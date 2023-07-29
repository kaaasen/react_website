import React, { useState, useEffect } from 'react';
import './Blog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';

function ImageCard({ imageSrc, alt, title, onClick, isActive }) {
  const cardClassName = isActive ? 'image-card active' : 'image-card';

  return (
    <div className={cardClassName} onClick={onClick}>
      <img src={imageSrc} alt={alt} className="image" />
      <div className="image-overlay">
        <h3 className="image-title">{title}</h3>
      </div>
    </div>
  );
}

function Blog() {
  const blogtopics = [
    {
      name: 'Empowering Women in Programming and Development',
      imageSrc: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
      contentFile: 'post-1.txt'
    },
    {
      name: 'Pros and Cons of Using Artificial Intelligence in Software Development',
      imageSrc: 'https://c0.wallpaperflare.com/preview/570/38/521/artificial-intelligence-technology-futuristic-science.jpg',
      contentFile: 'post-2.txt'
    },
    {
      name: 'Empowering Kids with Programming Skills for Future Careers',
      imageSrc: 'https://images.unsplash.com/photo-1568585219057-9206080e6c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      contentFile: 'post-3.txt'
    },
    {
      name: 'The Impact of Blockchain Technology on Industries',
      imageSrc: 'https://e0.pxfuel.com/wallpapers/877/568/desktop-wallpaper-coin-money-bitcoin.jpg',
      contentFile: 'post-4.txt'
    },
    {
      name: 'The Crucial Role of Information Security in Software Development',
      imageSrc: 'https://img1.wallspic.com/crops/0/4/7/9/29740/29740-information_technology-electronics-telecommunications_engineering-information_security-blue-1920x1080.jpg',
      contentFile: 'post-4.txt'
    }
  ];

  const [activeCard, setActiveCard] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);
  const [currentPostUrl, setCurrentPostUrl] = useState('');
  const [currentPostContent, setCurrentPostContent] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const promises = blogtopics.map(async (blogtopic) => {
        try {
          const response = await fetch(process.env.PUBLIC_URL + '/posts/' + blogtopic.contentFile);
          const content = await response.text();

          // Extract title and content from the text file
          const titleMatch = content.match(/Title:\s*([^\n]+)/);
          const title = titleMatch ? titleMatch[1] : '';

          const contentMatch = content.match(/Content:\s*([\s\S]+)/);
          const postContent = contentMatch ? contentMatch[1].trim() : '';

          return {
            title,
            content: postContent
          };
        } catch (error) {
          console.error(`Error fetching ${blogtopic.contentFile}:`, error);
          return {
            title: '',
            content: ''
          };
        }
      });

      try {
        const resolvedPosts = await Promise.all(promises);
        setBlogPosts(resolvedPosts);
      } catch (error) {
        console.error('Error resolving blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleCardClick = (index) => {
    const postUrl = `posts/post-${index + 1}.txt`;
    setCurrentPost({ index, postUrl });
  };

  const setCurrentPost = ({ index, postUrl }) => {
    setCurrentPostIndex(index);
    setCurrentPostUrl(postUrl);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/' + currentPostUrl);
        const text = await response.text();
        setCurrentPostContent(text);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    if (currentPostUrl) {
      fetchPost();
    }
  }, [currentPostUrl]);

  const showBlogtopicInfo = (blogtopic) => {
    setActiveCard(blogtopic);
    const index = blogtopics.indexOf(blogtopic);
    handleCardClick(index);
  };

  return (
    <div className="gallery">
      {blogtopics.map((blogtopic, index) => (
        <ImageCard
          key={index}
          imageSrc={blogtopic.imageSrc}
          alt={`Blogtopic ${index + 1}`}
          title={blogtopic.name}
          onClick={() => showBlogtopicInfo(blogtopic)}
          isActive={activeCard === blogtopic}
        />
      ))}

      {activeCard && (
        <div className="blog-info">
          <h2>{activeCard.name}</h2>
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: currentPostContent }} />
          </div>
          <div className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} className="action-icon" />
          </div>
          <div className="share-button">
            <FontAwesomeIcon icon={faShare} className="action-icon" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
