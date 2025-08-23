import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: Props) => {
  return (
    <div className="feature-card p-6 bg-white rounded-lg shadow transition-all">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
