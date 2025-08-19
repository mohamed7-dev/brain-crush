import { Metadata } from "next";
import { getCldOgImageUrl } from "next-cloudinary";

export const getStudentCoursePageOgImageUrl = (
  publicId: string,
  title: string,
  description: string
) =>
  getCldOgImageUrl({
    src: publicId,
    effects: [{ colorize: "100,co_black" }],
    overlays: [
      {
        publicId,
        width: 1200,
        height: 630,
        crop: "fill",
        effects: [
          {
            opacity: 60,
          },
        ],
      },
      {
        width: 700,
        crop: "fit",
        text: {
          alignment: "center",
          color: "white",
          fontFamily: "Source Sans Pro",
          fontSize: 80,
          fontWeight: "bold",
          text: title,
        },
        position: {
          y: -50,
        },
      },
      {
        width: 700,
        crop: "fit",
        text: {
          alignment: "center",
          color: "white",
          fontFamily: "Source Sans Pro",
          fontSize: 37,
          text: description,
        },
        position: {
          y: 50,
        },
      },
    ],
  });

export const getStudentCoursePageMetadata = (
  publicId: string,
  title: string,
  description: string
) =>
  ({
    title: title,
    description: description,
    openGraph: {
      title,
      description,
      images: [
        {
          width: 1200,
          height: 630,
          url: getStudentCoursePageOgImageUrl(publicId, title, description!),
        },
      ],
    },
  } satisfies Metadata);
