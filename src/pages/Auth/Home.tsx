import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/context";
import { userLogout } from "@/api/auth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userLogout();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const roles = auth.state.currentUser.roles;
  const parentRoles = roles.filter((role) => role.parent === "" && role.status);

  return (
    <>
      <div className="flex flex-col items-end w-full p-6 absolute z-10">
        <button className="btn btn-mid btn-error" onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-start p-6 space-y-8 overflow-y-auto">
        {parentRoles.map((parent) => (
          <div key={parent.role} className="flex flex-col space-y-4">
            <h2 className="card-title text-3xl">{parent.name}</h2>
            <div className="grid gap-4">
              {parent.role === "customer" ? (
                <div className="flex flex-col overflow-y-auto space-y-4">
                  {roles.map((role) =>
                    role.parent?.includes("customer") && role.path.match(/\//g)?.length === 2 && role.status ? (
                      <div key={role.role} className="grid grid-cols-4 gap-4">
                        <h2 className="card-title text-xl whitespace-nowrap pl-8">{role.name}</h2>
                        {roles.map((customer) =>
                          customer.parent === role.role && customer.status ? (
                            <div
                              key={customer.role}
                              className="card bg-base-300 shadow hover:bg-slate-600 hover:shadow-xl cursor-pointer"
                              onClick={() => navigate(customer.path)}
                            >
                              <div className="card-body items-center">
                                <h2 className="card-title">{customer.name}</h2>
                              </div>
                            </div>
                          ) : null
                        )}
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {roles.map((role) =>
                    role.path.includes(parent.role) && role.parent !== "" && role.status ? (
                      <div
                        key={role.role}
                        className="card bg-base-300 shadow hover:bg-slate-600 hover:shadow-xl cursor-pointer"
                        onClick={() => navigate(role.path)}
                      >
                        <div className="card-body items-center">
                          <h2 className="card-title">{role.name}</h2>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
