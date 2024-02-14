import UserDashboardNavbar from "@/components/UserDashvboardNavbar";
import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function Report() {
  const [userDetails, setUserDetails] = useState([]);
  const [userName, setUserName] = useState("");

  const getUserDetails = async () => {
    try {
      await fetch("http://localhost:5000/deviceshow" + "/getallreport", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserDetails(data.data);
          console.log(data.data);
        });
    } catch (error) {
      console.log(error, "get user details error");
    }
  };
  const windows =
    typeof window !== "undefined" &&
    window.localStorage.getItem("userLogindetails");
  const fetchDetails = JSON.parse(windows);
  useEffect(() => {
    getUserDetails();
    const windows =
      typeof window !== "undefined" &&
      window.localStorage.getItem("userLogindetails");
    const fetchDetails = JSON.parse(windows);
    setUserName(fetchDetails.username);
  }, []);

  const filteredUserDetails = userDetails.filter(
    (report) => report.username === userName
  );

  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <UserDashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-row w-full px-5 py-3 justify-center text-xl font-semibold">
            Report Data
          </div>
          <div className="flex flex-col w-full h-[100vh]  text-xl">
            <div className="p-2 mb-5 flex flex-row gap-5">
              <input
                placeholder="Search Devicename "
                className="px-3 py-2 bg-gray-200"
              />
            </div>
            <div className="flex flex-row h-40">
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 ">Username</th>
                    <th className="px-4 py-2">Device Name</th>
                    <th className="px-4 py-2">Sump State</th>
                    <th className="px-4 py-2">Tank State</th>
                    <th className="px-4 py-2">Sump Duration</th>
                    <th className="px-4 py-2">Tank Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserDetails.map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border px-4 py-2">{report.username}</td>
                      <td className="border px-4 py-2">{report.devicename}</td>
                      <td className="border px-4 py-2 font-semibold">
                        {report.sump_state}
                      </td>
                      <td className="border px-4 py-2 font-semibold">
                        {report.tank_state}
                      </td>
                      <td className="border px-4 py-2">
                        {report.sump_duration}
                      </td>
                      <td className="border px-4 py-2">
                        {report.tank_duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
