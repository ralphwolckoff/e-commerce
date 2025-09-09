import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs';
import { Typography } from '@/ui/design/typography/Typography';
import React from 'react';

interface PageHeaderProps {
  title: string;
}

const Header = ({ title }: PageHeaderProps) => {
  return (
    <div className="fixed bg-white rigth-4 left-full shadow-lg sticky top-0 z-50">
      <div className=" ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Typography variant="h5" component="h1" theme="gray">
            {title}
          </Typography>
          <div className="flex items-center space-x-4">
            <Typography
              variant="body-base"
              component="span"
              className="font-medium"
            >
              <Breadcrumbs />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;