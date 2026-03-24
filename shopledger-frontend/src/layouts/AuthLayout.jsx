import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-md">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
