import Image from "next/image";
import {useAuth} from "@/context/AuthProvider";
import axios from "axios";
import {useRouter} from "next/router";


interface HeaderProps {
  role?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ role }) => {

  const router = useRouter();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
        await axios.get("/api/auth/logout");
        logout();
        router.push("/login");
      } catch (err) {
          console.log(err);
      }
  };

  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          height={25}
          width={25}
        />
        <span className="font-semibold text-lg">Taski</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{role}</span>
        <button onClick={handleLogout}>
          {role === "admin" ? (
              <Image
                src="/assets/images/profileAdmin.svg"
                alt="logo"
                height={30}
                width={30}
              />
          ): (
            <Image
              src="/assets/images/profileUser.svg"
              alt="logo"
              height={30}
              width={30}
            />
          )}
        </button>
      </div>
    </section>
  );
};