export interface ITag {
  name: string;
  description: string;
}

const tags: ITag[] = [
  {
    description: "Wether this image is pixel art or not.",
    name: "pixelart",
  },
  {
    description: "Wether to process all the pages of the gif",
    name: "fullgif",
  },
];

export const tagMap = new Map() as Map<string, ITag>;

tags.forEach((tag, i) => tagMap.set(tag.name, tags[i]));
