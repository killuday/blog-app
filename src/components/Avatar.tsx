import React from 'react';
type Props = {
    name: string;
    picture: string;
};
function Avatar({ name, picture }: Props) {
    return (
        <div className="flex items-center">
            <img src={picture} className="w-12 h-12 object-cover rounded-full mr-4" alt={name}/>
            <div className="text-xl font-bold">{name}</div>
        </div>
    );
}

export default Avatar;