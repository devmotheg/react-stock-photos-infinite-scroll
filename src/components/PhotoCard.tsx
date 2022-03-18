/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import React from "react";

const PhotoCard = ({
	urls: { regular },
	alt_description,
	likes,
	user: {
		name,
		portfolio_url,
		profile_image: { medium },
	},
}: any) => {
	return (
		<div className="relative overflow-hidden rounded-sm shadow-lg max-h-80 group">
			<img
				className="object-cover w-full h-full"
				src={regular}
				alt={alt_description}
			/>
			<div className="absolute left-0 flex items-center justify-between w-full p-4 transition-all duration-200 -bottom-full group-hover:bottom-0 bg-black/40">
				<div className="space-y-4">
					<span className="block text-lg font-bold text-white capitalize">
						{name}
					</span>
					<span className="text-white">{likes} likes</span>
				</div>
				<a href={portfolio_url}>
					<img className="w-10 h-10 rounded-sm" src={medium} alt="user photo" />
				</a>
			</div>
		</div>
	);
};

export default PhotoCard;
