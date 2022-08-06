import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import axios from "axios";
import React, { useRef, useState } from "react";

const styles = {
  option: "flex items-center mr-[15px] cursor-pointer",
  optionIcon: "text-[18px] mr-[3px]",
  optionType: "text-[14px] font-[500]",
};

export const NewPost = () => {
  const publicFolder = process.env.PUBLIC_URL;
  const content = useRef<HTMLInputElement | null>(null); // fix type error
  const [img, setImg] = useState(null);
  const user = {
    username: "John",
    _id: 123,
  };

  const handleSumbit = async (e: any) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      content: content!.current!.value,
    };

    try {
      await axios.post("/api/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full rounded-lg bg-white shadow-sm shadow-gray-300">
      <div className="p-[10px]">
        <div className="flex items-center">
          <img
            src={publicFolder + "/assets/person/noAvatar.png"}
            alt="User avatar"
            className="w-[50px] h-[50px] rounded-full object-cover mr-[10px]"
          />
          <input
            type="text"
            ref={content}
            placeholder={`What's on your mind ${user.username}`}
            className="focus:outline-none border-none w-[80%]"
          />
        </div>
        <hr className="m-[20px]" />
        {img && (
          <div className="pt-0 px-[20px] pb-[10px] relative">
            <img
              src={URL.createObjectURL(img)}
              alt=""
              className="w-full bg-cover"
            />
            <Cancel
              className="absolute top-0 right-[20px] cursor-pointer opacity-[0.7]"
              onClick={() => setImg(null)}
            />
          </div>
        )}
        <form className="flex items-center justify-between">
          <div className="flex ml-[20px]">
            <label htmlFor="file" className={styles.option}>
              <PermMedia htmlColor="tomato" className={styles.optionIcon} />
              <span className={styles.optionType}>Photo</span>
            </label>
            <div className={styles.option}>
              <Label htmlColor="blue" className={styles.optionIcon} />
              <span className={styles.optionType}>Tag</span>
            </div>
            <div className={styles.option}>
              <Room htmlColor="green" className={styles.optionIcon} />
              <span className={styles.optionType}>Location</span>
            </div>
            <div className={styles.option}>
              <EmojiEmotions
                htmlColor="goldenrod"
                className={styles.optionIcon}
              />
              <span className={styles.optionType}>Feelings</span>
            </div>
          </div>
          <button className="border-none p-[7px] rounded-md bg-green-500 text-white">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
