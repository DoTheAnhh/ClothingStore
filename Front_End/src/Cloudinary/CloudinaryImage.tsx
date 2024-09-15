import React from 'react';

const CloudinaryImage: React.FC<{ publicId: string; cloudName: string; format?: string; transformation?: string }> = ({ publicId, cloudName, format = 'jpg', transformation }) => {
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/${transformation ? transformation + '/' : ''}${publicId}.${format}`;

    return (
        <img src={url} alt="Cloudinary Image" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
    );
};

export default CloudinaryImage;
