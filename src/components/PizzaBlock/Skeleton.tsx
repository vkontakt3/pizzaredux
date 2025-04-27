import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
	<ContentLoader
		speed={3}
        className="pizza-block"
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="215" cy="531" r="33" />
		<circle cx="116" cy="115" r="115" />
		<rect x="0" y="259" rx="22" ry="22" width="237" height="30" />
		<rect x="0" y="315" rx="12" ry="12" width="237" height="90" />
		<rect x="59" y="481" rx="0" ry="0" width="32" height="1" />
		<rect x="0" y="430" rx="14" ry="14" width="85" height="27" />
		<rect x="106" y="426" rx="11" ry="11" width="130" height="40" />
	</ContentLoader>
);

export default Skeleton;
