// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Select Camera Stream</h1>
      <ul>
        <li>
          <Link href="/9999">Camera 1</Link>
        </li>
        <li>
          <Link href="/10000">Camera 2</Link>
        </li>
        <li>
          <Link href="/1100">Camera 3</Link>
        </li>
        <li>
          <Link href="/1200">Camera 4</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
