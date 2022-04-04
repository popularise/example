import React, { FunctionComponent } from "react";
import MainNav from "../MainNav";
import artificialIntelligence from "../../assets/artificial-intelligence.png";
import parrot from "../../assets/parrot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: FunctionComponent<IProps> = ({ children }) => {
  const mockNotifications = [
    "New campaign created",
    "Campaign deleted",
    "Campaign updated",
    "Campaign created",
  ];

  const mockReminders = [
    "You have a meeting today",
    "You have a meeting today",
    "You have a meeting today",
    "You have a meeting today",
  ];

  return (
    <div className="w-screen h-screen bg-gray-100 p-4 justify-center  flex">
      <div className="flex flex-row gap-4 bg-white rounded-md shadow-md w-full">
        <div className="w-1/6 flex flex-col p-4 justify-between">
          <div className="flex flex-col gap-8">
            <h1 className="text-orange-600 text-2xl font-bold uppercase">
              PopIt
            </h1>
            <MainNav />
          </div>

          <div className="p-4 rounded-md shadow-md bg-gray-200 flex flex-col justify-center">
            <img
              src={artificialIntelligence}
              alt="artificial-intelligence"
              className="w-1/3 mx-auto"
            />
            <h2 className="text-center text-lg font-light py-2 text-gray-700">
              It seems you are a super-admin and can control almost
              <span className="font-bold text-orange-500">everything.</span>
            </h2>
            <button className="px-4 cursor-pointer hover:bg-orange-800 py-2 text-center text-white bg-orange-500 mx-auto font-bold rounded-md shadow-md">
              Mock action
            </button>
          </div>
        </div>
        <div className="w-4/6 bg-gray-200 overflow-y-auto p-4">
          <div className="p-4 rounded-md shadow-md text-orange-700 bg-orange-300 font-bold mb-4">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
            Welcome back again! Nice to see you, how was your day? We are
            upgrading the system to its newest version so you could encounter
            some issues.
          </div>
          {children}
        </div>
        <div className="w-1/6  flex flex-col p-4 gap-8">
          <div className="font-bold text-orange-500 flex flex-row gap-2 justify-between  items-center">
            <span> Logout</span>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <div className="font-light text-gray-700">
            <figure className="p-4 rounded-full bg-orange-100 w-36 h-36 flex items-center mx-auto">
              <img src={parrot} alt="parrot" className="mx-auto" />
            </figure>
            <p className="text-center text-lg font-light py-2 text-gray-700">
              Welcome back,
              <span className="font-bold text-orange-500">Admin</span>
            </p>
            <div className="py-4 mt-8">
              <h2 className="font-bold text-orange-500 text-md mb-4">
                Latest updates
              </h2>
              <ul>
                {mockNotifications.map((notification, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 border-l-2 border-orange-200 rounded-sm mb-1"
                  >
                    {notification}
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-4 mt-8">
              <h2 className="font-bold text-orange-500 text-md mb-4">
                Reminders
              </h2>
              <ul>
                {mockReminders.map((reminder, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 border-l-2 border-orange-200 rounded-sm mb-1"
                  >
                    {reminder}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
