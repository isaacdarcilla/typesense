import Lottie from "react-lottie-player";
import lottieJson from "../public/animation/movie.json";
import { Kbd } from "@nextui-org/react";

export const Intro = ({
  onSearch,
  movie,
}: {
  onSearch: (movie: string) => void;
  movie: string;
}) => {
  return (
    <>
      <Lottie
        loop
        animationData={lottieJson}
        play
        className="mx-auto mb-6"
        style={{ width: 250, height: 250 }}
      />
      <p className="-mt-3 text-center mx-auto text-md text-gray-500">
        Search movies in an instant. Try{" "}
        <Kbd
          onClick={() => {
            onSearch(movie);
          }}
          className="text-blue-600 cursor-pointer"
        >
          Inception
        </Kbd>
        .
      </p>
    </>
  );
};
