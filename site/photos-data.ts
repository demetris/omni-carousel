export interface PhotoSize {
  width: number;
  height: number;
  filename: string;
}

export interface Photo {
  id: string;
  author: string;
  authorURL: string;
  alt: string;
  medium: PhotoSize[];
  large?: PhotoSize[];
}

export const photos: Record<string, Photo> = {
  "alex-padurariu-ZR48YvUpk04": {
    id: "alex-padurariu-ZR48YvUpk04",
    author: "Alex Padurariu",
    authorURL: "https://unsplash.com/@alexpadurariu",
    alt: "Closeup photo of yellow paper boat",
    medium: [{
      width: 1024,
      height: 651,
      filename: "alex-padurariu-ZR48YvUpk04-unsplash-1024-by-651.webp"
    }],
    large: [{
      width: 2048,
      height: 1302,
      filename: "alex-padurariu-ZR48YvUpk04-unsplash-2048-by-1302.webp"
    }]
  },
  "alex-padurariu-5rlktbEX5bY": {
    id: "alex-padurariu-5rlktbEX5bY",
    author: "Alex Padurariu",
    authorURL: "https://unsplash.com/@alexpadurariu",
    alt: "Closeup of a pink object against a blue sky",
    medium: [{
      width: 864,
      height: 504,
      filename: "alex-5rlktbEX5bY-unsplash-864-by-504.webp"
    }],
    large: [{
      width: 2048,
      height: 1195,
      filename: "alex-padurariu-5rlktbEX5bY-unsplash-2048-by-1195.webp"
    }]
  },
  "denise-bossarte-8rEJiVQk1Vw": {
    id: "denise-bossarte-8rEJiVQk1Vw",
    author: "Denise Bossarte",
    authorURL: "https://unsplash.com/@dbossarte",
    alt: "Closeup photo of a surfboard on a wall",
    medium: [{
      width: 1024,
      height: 768,
      filename: "denise-bossarte-8rEJiVQk1Vw-unsplash-1024-by-768.webp"
    }],
    large: [{
      width: 2048,
      height: 1536,
      filename: "denise-bossarte-8rEJiVQk1Vw-unsplash-2048-by-1536.webp"
    }]
  },
  "henry-co-_QVC2G_ehOM": {
    id: "henry-co-_QVC2G_ehOM",
    author: "Henry & Co.",
    authorURL: "https://unsplash.com/@hngstrm",
    alt: "Minimalist geometric design with blue and green areas divided by white and yellow lines",
    medium: [{
      width: 1024,
      height: 1024,
      filename: "henry-co-_QVC2G_ehOM-1024-by-1024.webp"
    }],
    large: [{
      width: 2048,
      height: 2048,
      filename: "henry-co-_QVC2G_ehOM-2048-by-2048.webp"
    }],

  },
  "n-n-BtbjCFUvBXs": {
    id: "n-n-BtbjCFUvBXs",
    author: "N N",
    authorURL: "https://unsplash.com/@nicolenessi",
    alt: "Man riding a snowboard down the side of a snow covered slope",
    medium: [{
      width: 1024,
      height: 683,
      filename: "n-n-BtbjCFUvBXs-unsplash-1024-by-683.webp"
    }],
    large: [{
      width: 2048,
      height: 1365,
      filename: "n-n-BtbjCFUvBXs-unsplash-2048-by-1365.webp"
    }]
  },
  "delila-ziebart-3P6E2y2lyus": {
    id: "delila-ziebart-3P6E2y2lyus",
    author: "Delila Ziebart",
    authorURL: "https://unsplash.com/@delilaziebart",
    alt: "Blue red pink and yellow abstract painting",
    medium: [{
      width: 864,
      height: 576,
      filename: "delila-ziebart-3P6E2y2lyus-unsplash-864-by-576.webp"
    }],
    large: [{
      width: 2048,
      height: 1365,
      filename: "delila-ziebart-3P6E2y2lyus-unsplash-2048-by-1365.webp"
    }]
  },
  "hamed-daram-776370": {
    id: "hamed-daram-776370",
    author: "Hamed Daram",
    authorURL: "https://unsplash.com/@hameddaram",
    alt: "Yellow black green and orange digital wallpaper",
    medium: [{
      width: 864,
      height: 576,
      filename: "hamed-daram-776370-unsplash-864-by-576.webp"
    }]
  },
  "clark-van-der-beken-chcyjyRQV74": {
    id: "clark-van-der-beken-chcyjyRQV74",
    author: "Clark Van Der Beken",
    authorURL: "https://unsplash.com/@snapsbyclark",
    alt: "Painting of a multicolored pattern with a white background",
    medium: [{
      width: 864,
      height: 648,
      filename: "clark-van-der-beken-chcyjyRQV74-unsplash-864-by-648.webp"
    }]
  },
  "william-daigneault-733670": {
    id: "william-daigneault-733670",
    author: "William Daigneault",
    authorURL: "https://unsplash.com/@williamdaigneault",
    alt: "Black and yellow door with a yellow stripe",
    medium: [{
      width: 864,
      height: 563,
      filename: "william-daigneault-733670-unsplash-864-by-563.webp"
    }]
  },
  "ferdinand-stohr-O2JbMiA6ias": {
    id: "ferdinand-stohr-O2JbMiA6ias",
    author: "Ferdinand Stöhr",
    authorURL: "https://unsplash.com/@fellowferdi",
    alt: "Low angle photography of concrete buildings under blue sky",
    medium: [{
      width: 864,
      height: 589,
      filename: "ferdinand-stohr-O2JbMiA6ias-unsplash-864-by-589.webp"
    }]
  },
  "dmitri-popov-71519": {
    id: "dmitri-popov-71519",
    author: "Dmitri Popov",
    authorURL: "https://unsplash.com/@dmitrypopov",
    alt: "Abstract geometric pattern in muted colors",
    medium: [{
      width: 1024,
      height: 680,
      filename: "dmitri-popov-71519-unsplash-1024-by-680.webp"
    }],
    large: [{
      width: 2048,
      height: 1361,
      filename: "dmitri-popov-71519-unsplash-2048-by-1361.webp"
    }]
  },
  "hendrik-kespohl-Stk2vfPWr0w": {
    id: "hendrik-kespohl-Stk2vfPWr0w",
    author: "Hendrik Kespohl",
    authorURL: "https://unsplash.com/@hendrikkay",
    alt: "Blue and pink sky",
    medium: [{
      width: 1024,
      height: 1024,
      filename: "hendrik-kespohl-Stk2vfPWr0w-unsplash-1024-by-1024.webp"
    }],
    large: [{
      width: 2407,
      height: 2407,
      filename: "hendrik-kespohl-Stk2vfPWr0w-unsplash-2407-by-2407.webp"
    }]
  },
  "janos-richter-111765": {
    id: "janos-richter-111765",
    author: "Janos Richter",
    authorURL: "https://unsplash.com/@janosrichter",
    alt: "Minimalist composition of white and deep red painted wall textures",
    medium: [{
      width: 1024,
      height: 683,
      filename: "janos-richter-111765-unsplash-1024-by-576.webp"
    }],
    large: [{
      width: 2048,
      height: 1365,
      filename: "janos-richter-111765-unsplash-2048-by-1152.webp"
    }]
  },
  "mateusz-derks-AREtip90zGM": {
    id: "mateusz-derks-AREtip90zGM",
    author: "Mateusz Derks",
    authorURL: "https://unsplash.com/@mateusz_derks",
    alt: "Close-up of colorful abstract pattern",
    medium: [{
      width: 1024,
      height: 768,
      filename: "mateusz-derks-AREtip90zGM-unsplash-1024-by-768.webp"
    }],
    large: [{
      width: 2048,
      height: 1536,
      filename: "mateusz-derks-AREtip90zGM-unsplash-2048-by-1536.webp"
    }]
  }
};

//
// Gets medium image for a photo
//
export function getMediumImage(photoID: string): PhotoSize | undefined {
  const photo = photos[photoID];

  if (!photo || !photo.medium.length) {
    return undefined;
  }

  return photo.medium[0];
}

//
// Gets large image for a photo
//
export function getLargeImage(photoID: string): PhotoSize | undefined {
  const photo = photos[photoID];

  if (!photo || !photo.large || !photo.large.length) {
    return undefined;
  }

  return photo.large[0];
}
