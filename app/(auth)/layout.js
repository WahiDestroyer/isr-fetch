import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import "../globals.css"

export default async function RootLayout({ children }) {
    const token = await cookies()
    const myToken = token.get("accessToken")?.value;


    if(myToken){
        return redirect("/")
    }

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
