import React, { useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import ProfileUpdateForm from "../components/ProfileUpdateForm";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const [isUpdateForm, setIsUpdateForm] = useState(false);

  function toggleModal() {
    setIsUpdateForm((prev) => !prev);
  }

  return (
    <>
      <PageTitle title="Profile" />
      <section id="profile">
        <table className="table-auto border-spacing-4">
          <tbody>
            <tr>
              <th className="w-1/5 text-left pb-2">Surname</th>
              <td className="pl-4">{user.surname}</td>
            </tr>
            <tr>
              <th className="w-1/5 text-left pb-2">Othername</th>
              <td className="pl-4">{user.othername}</td>
            </tr>
            <tr>
              <th className="w-1/5 text-left pb-2">Phone</th>
              <td className="pl-4">0{user.phone}</td>
            </tr>
            <tr>
              <th className="w-1/5 text-left pb-2">Email</th>
              <td className="pl-4">{user.email}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={toggleModal}
          className="bg-blue-500 py-2 mt-4"
          type="submit"
        >
          Update
        </button>
      </section>

      {isUpdateForm ? (
        <ProfileUpdateForm userId={user.id} toggleModal={toggleModal} />
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
