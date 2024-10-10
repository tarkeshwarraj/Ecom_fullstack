import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            assumenda minima facere, impedit aliquam incidunt.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            necessitatibus et ipsum vero minus reprehenderit minima alias quis
            soluta vel!
          </p>
          <b className="text-gray-500">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            praesentium provident qui velit! Dignissimos quod hic excepturi
            architecto earum ratione iusto enim. Magnam, aut sunt deserunt sint
            assumenda voluptate doloribus?
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            doloremque eum neque doloribus, fugit eius.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            doloremque eum neque doloribus, fugit eius.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exveptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            doloremque eum neque doloribus, fugit eius.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
