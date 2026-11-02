"use client";
import Title from "./Title";
import Image from "next/image";
import Button from "./Button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="p-6 flex flex-col md:flex-row w-full items-center justify-center font-sans gap-8">
      <div className="w-full md:w-1/2">
        <h1 className="border-2 border-black px-2 py-1 bg-[#00ff66] uppercase w-fit font-semibold text-xs md:text-base">
          next-gen creator Intelligence
        </h1>
        <Title />
        <h1 className="text-2xl md:text-4xl font-bold mt-4">
          Navigate the Algorithm. Not your creativity.
        </h1>

        <p className="text-lg md:text-2xl mt-4 md:pr-32 pr-0">
          The first{" "}
          <span className="font-semibold bg-[#FFD700]">
            SEO & Content Intelligence tool
          </span>{" "}
          built for creators ready to scale. Stop guessing, let DescendUp find
          your growth.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="hidden md:block">
            <Button
              text={`Analyse my \n channel`}
              color="#ff0000"
              textStyle="text-white text-2xl"
              px={6}
              py={4}
              onClick={() => {
                router.push("/analyse");
              }}
            />
          </div>
          <div className="md:hidden block">
            <Button
              text={`Analyse my channel`}
              color="#ff0000"
              textStyle="text-white text-2xl"
              px={6}
              py={4}
              onClick={() => {
                router.push("/analyse");
              }}
            />
          </div>
          <div className="flex items-center justify-center p-4 font-medium border-dashed border-2 rounded-xl">
            <IoCheckmarkCircle className="text-[#00b212] text-3xl mr-2" />
            <p className="text-lg hidden md:block">
              Performance-Based <br />
              Pricing
            </p>
            <p className="text-base block md:hidden">
              Performance-Based Pricing
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/hero.png"
          alt="Hero Image"
          width={500}
          height={500}
          priority
          className="w-full h-auto max-w-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
