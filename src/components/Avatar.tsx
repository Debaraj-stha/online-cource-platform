import React from 'react'
import { getColorBasedOnName } from '../utils/colorBasedOnName'
interface Props {
  url?: string,
  username?: string
}
const Avatar = ({ url, username = "user profile" }: Props) => {
  return (
    <div>
      {
        url ?
          <img
            src={url}
            alt="profile avatar"
            className="size-14 sm:size-16 md:size-20 xl:size-24 rounded-full object-cover border"
          />
          ://if profile is not available show username as avatar
          <div className='size-14 sm:size-16 md:size-20 xl:size-24 rounded-full object-cover border flex items-center justify-center'
            style={{ background: getColorBasedOnName(username!) }} //generate random color based on username
          >
            {/* showing firstname first and second/last name first letter */}
            <p>{username?.split(" ").map((word) => word[0].toUpperCase()).slice(0, 2).join(" ")}</p>
          </div>

      }

    </div>
  )
}

export default Avatar
