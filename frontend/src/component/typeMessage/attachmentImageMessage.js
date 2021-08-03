import React, {useState, useEffect, useRef} from "react";

const ImageMessageComponent = ({data}) =>{

    return  <div className="message_container_image ">
                {
                    data && data.thumbnail_url &&
                    <div className="message_container_image_wrap">
                            <img src={data.thumbnail_url}></img>
                    </div>
                }

        </div>
}
export default ImageMessageComponent