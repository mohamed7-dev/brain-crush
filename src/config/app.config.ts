import { Metadata, Viewport } from "next";
import { getCldOgImageUrl } from "next-cloudinary";

export const APP_NAME = "Brain Crush";
export const APP_DEFAULT_TITLE = APP_NAME;
export const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
export const APP_DESCRIPTION = "Start your learning journey with one click.";
export const APP_CLOUDINARY_LOGO_PUBLIC_ID = "brain_crush_logo";

export const defaultMetadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
export const defaultViewport: Viewport = {
  themeColor: "#FFFFFF",
};

const headline = APP_NAME;
const body =
  "Start your learning journey today and don't wait until it's too late.";

export const getBrowseCoursesPageOgImageUrl = (publicId: string) =>
  getCldOgImageUrl({
    src: publicId,
    effects: [{ colorize: "100,co_white" }],
    overlays: [
      {
        publicId,
        position: {
          gravity: "north_east",
        },
        effects: [
          {
            crop: "fill",
            gravity: "auto",
            width: "0.33",
            height: "1.0",
          },
        ],
        flags: ["relative"],
      },
      {
        width: 625,
        crop: "fit",
        text: {
          color: "black",
          fontFamily: "Source Sans Pro",
          fontSize: 80,
          fontWeight: "bold",
          text: headline,
        },
        position: {
          x: 125,
          y: -50,
          gravity: "west",
        },
      },
      {
        width: 625,
        crop: "fit",
        text: {
          color: "black",
          fontFamily: "Source Sans Pro",
          fontSize: 37,
          text: body,
        },
        position: {
          x: 125,
          y: 50,
          gravity: "west",
        },
      },
    ],
  });

export const HOME_PAGE_METADATA = {
  title: "Browse courses",
  description: "Start your learning journey today.",
  openGraph: {
    images: [
      {
        width: 1200,
        height: 630,
        url: getBrowseCoursesPageOgImageUrl(APP_CLOUDINARY_LOGO_PUBLIC_ID),
      },
    ],
  },
};

export const getSearchPageMetadata = (q: string) =>
  ({
    title: `Search results of ${q}`,
    description: `list of courses that match the query ${q}`,
    openGraph: {
      images: [
        {
          width: 1200,
          height: 630,
          url: getBrowseCoursesPageOgImageUrl(APP_CLOUDINARY_LOGO_PUBLIC_ID),
        },
      ],
    },
  } satisfies Metadata);
