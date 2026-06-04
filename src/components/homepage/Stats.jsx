import {
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Star,
  Users,
} from "lucide-react";
import globe from "@/assets/glove-vector.png"
import Image from "next/image";

const Stats = () => {
  return (
    <div className="relative mt-24 flex flex-col items-center">
      {/* Stars */}
      <div className="absolute top-0 h-55 w-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />

      {/* Purple Glow */}
      <div className="absolute top-8 h-65 w-175 rounded-full bg-violet-700/40 blur-3xl" />

      {/* Globe */}
      <div className="relative z-10 overflow-hidden">
        <Image
          src={globe}
          alt="Globe"
          priority
          className="w-full max-w-225 object-contain"
        />

        {/* Text */}
        <div className="absolute left-1/2 top-[32%] z-20 -translate-x-1/2 text-center">
          <h2 className="text-2xl font-medium leading-tight text-white md:text-[38px]">
            Assisting over 15,000 job seekers
            <br />
            find their dream positions.
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-30 -mt-14 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            icon: <BriefcaseBusiness size={14} />,
            value: "50K",
            label: "Active Jobs",
          },
          {
            icon: <ChartNoAxesColumn size={14} />,
            value: "12K",
            label: "Companies",
          },
          {
            icon: <Users size={14} />,
            value: "2M",
            label: "Job Seekers",
          },
          {
            icon: <Star size={14} />,
            value: "97%",
            label: "Satisfaction Rate",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-2xl"
          >
            <div className="mb-10 text-gray-400">{item.icon}</div>

            <h3 className="text-4xl font-semibold tracking-tight">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
