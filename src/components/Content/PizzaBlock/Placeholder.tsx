//react
import React from 'react'
import ContentLoader from "react-content-loader"

const Placeholder: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="120" r="120" />
    <rect x="0" y="273" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
    <rect x="81" y="393" rx="0" ry="0" width="2" height="1" />
    <rect x="0" y="415" rx="10" ry="10" width="115" height="27" />
    <rect x="128" y="415" rx="10" ry="10" width="151" height="27" />
  </ContentLoader>
)

export default Placeholder

