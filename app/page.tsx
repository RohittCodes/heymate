import Navbar from "@/components/globals/navbar";
import { Button } from "@/components/ui/button";
import { Roboto } from "next/font/google";
import Link from "next/link";

const font = Roboto({ weight: "400", subsets: ["latin"] });

const Mainpage = () => {
  return (
    <div className={`${font.className} flex flex-col h-full gap-4`}>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh)] w-full px-10 py-2">
        <div className="flex flex-col h-full w-[96%] items-center space-y-4 py-8 rounded-3xl shadow-lg border-border border px-8">
          <div className="flex justify-between w-full items-center py-6 px-8 h-full">
            <div className="flex flex-col justify-between space-y-4 h-full">
              <div className="flex flex-col space-y-2">
                <span className="text-blue-500 text-5xl font-semibold">
                  Unleash the full potential
                </span>
                <span className="text-5xl font-semibold">
                  of an AI powered platform
                </span>
                <br />
                <div className="flex flex-col">
                  <span>
                    HeyMate is the best place to hangout with friends and
                    family.
                  </span>
                  <span>
                    It is a platform that is powered by MindsDB and is designed
                    to help you connect with your friends and family.
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <Link href="/app">
                  <Button className="rounded-full px-4 py-2 h-12 w-28 bg-blue-600 text-white hover:bg-blue-700">
                    Get started
                  </Button>
                </Link>
                <span>
                  <span className="font-semibold text-green-500">
                    Note:&nbsp;
                  </span>
                  In future, HeyMate will be integrated into HeyDev.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-12 px-10">
        <span className="text-lg text-gray-500">
          © 2022 HeyMate. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Mainpage;
