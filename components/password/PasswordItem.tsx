import { useState } from "react";
import Image from "next/image";
import { PasswordItem } from "@/types/password";
import { BiWorld, BiTimeFive } from "react-icons/bi";

interface Props {
  password: PasswordItem;
}

export default function PasswordItem({ password }: Props) {
  const [favicon, setFavicon] = useState(true);

  return (
    <div
      className="bg-[#272E3C] p-4 pl-5 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors overflow-hidden"
      key={password.id}
    >
      <div className="flex items-center mb-2">
        {favicon ? (
          <Image
            src={`https://www.google.com/s2/favicons?domain=${password.website}&sz=128`}
            alt="favicon"
            width={18}
            height={18}
            className="mr-2"
            onError={() => setFavicon(false)}
          />
        ) : (
          <BiWorld className="h-5 w-5 mr-2" />
        )}
        <p>{password.name}</p>
      </div>
      <p className="truncate mb-1">{password.username}</p>
      <p>{password.note}</p>
      <p className="text-blur flex items-center">
        <BiTimeFive className="h-5 w-5 mr-1" />
        Created at:{" "}
        {new Intl.DateTimeFormat("vi-VN").format(new Date(password.created_at))}
      </p>
    </div>
  );
}
