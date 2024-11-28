
import Link from "next/link";

const B2Home = () => {
  return (
     <div className="mt-2 flex justify-center font-light"> 
          <Link href="/">
          <button className="text-[#fc4747] flex justify-center items-center gap-1 hover:underline">
           <span>Back to home {"->"}</span>

            </button>
            </Link>
        </div>
  )
}

export default B2Home