import NextImage, { ImageProps } from "next/image";

const CustomImage = ({ priority, ...props }: ImageProps) => {
  return <NextImage {...props} priority={priority} draggable={false} />;
};

export default CustomImage;
