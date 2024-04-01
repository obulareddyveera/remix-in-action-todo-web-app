import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

      <div className="flex flex-col justify-center items-center">
        <div className="container">
          <div className="card w-full bg-base-100 shadow-xl m-4 w-full">
            <div className="card-body h-[50vh] w-full">
              <div className="w-full flex flex-col items-center justify-center">
              <h1>Welcome VEERA ...!</h1>
              <Link to="/todos">
                <button className="m-4 btn btn-md w-full bg-[#E0475B] hover:border-none hover:bg-[#E1689B] text-white">Continue ...ToDO Web-App</button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
